const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');

module.exports = {
  mode: 'none',
  entry: {
    library: ['react', 'react-dom']
  },
  output: {
    path: paths.library,
    filename: '[name]_[hash].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]', //必须和library一致
      path: path.join(__dirname, '../library/[name].json')
    })
  ]
};
