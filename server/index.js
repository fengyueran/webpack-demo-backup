if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../build/food-server');

const template = fs.readFileSync(
  path.join(__dirname, '../build/food.html'),
  'utf-8'
);
const data = require('./data.json');

const renderMarkup = str => {
  const dataStr = JSON.stringify(data);
  return template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace(
      '<!--INITIAL_DATA_PLACEHOLDER-->',
      `<script>window.__initial_data=${dataStr}</script>`
    );
};

const server = port => {
  const app = express();

  app.use(express.static('build'));
  app.get('/', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('Server is running on port: 3000');
  });
};

server(3000);
