const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');

module.exports = {
  mode: 'none',
  entry: {
    add: paths.addIndexJs,
    'add.min': paths.addIndexJs
  },
  output: {
    path: paths.appBuild,
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: '[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};
