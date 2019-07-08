const merge = require('webpack-merge');

const configs = [
  require('./webpack.config.base'),
  require('./webpack.config.react')
];

const isEnvProduction = process.env.NODE_ENV === 'production';

if (isEnvProduction) {
  configs.push(require('./webpack.config.prod'));
}

module.exports = merge(configs);
