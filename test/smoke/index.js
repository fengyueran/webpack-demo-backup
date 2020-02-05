// enable to detect env with BABEL_ENV or NODE_ENV
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const fs = require('fs-extra');
const Mocha = require('mocha');
const chalk = require('react-dev-utils/chalk');
const config = require('../../config');
const paths = require('../../config/paths');

const mocha = new Mocha({
  timeout: '10000ms'
});

const compiler = webpack(config);

console.log('Creating an optimized production build...');

fs.emptyDirSync(paths.appBuild);
compiler.run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const messages = stats.toJson({ all: false, warnings: true, errors: true });
  const hasErrors = messages.errors.length;
  if (hasErrors) {
    console.log(chalk.red('Errors: '));
    return messages.errors.map(error => console.log(chalk.red(error)));
  }
  console.log(chalk.green('Compiled successfully.'));
  mocha.addFile(path.join(__dirname, 'html-test.js'));
  mocha.addFile(path.join(__dirname, 'css-js-test.js'));
  mocha.run();

  return 0;
});
