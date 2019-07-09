const merge = require('webpack-merge');
const { isEnvProduction } = require('./util');

const configs = [
  require('./webpack.config.base'),
  require('./webpack.config.react'),
  require('./webpack.config.css')
];

if (isEnvProduction) {
  configs.push(require('./webpack.config.prod'));
}

module.exports = merge(configs);
