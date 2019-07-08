const merge = require('webpack-merge');

const configs = [require('./webpack.config.base')];

module.exports = merge(configs);
