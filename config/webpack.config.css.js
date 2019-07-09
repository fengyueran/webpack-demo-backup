const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getStyleLoaders } = require('./util');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders({
          importLoaders: 1
        }),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true // 防止被错误的tree shaking
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    })
  ]
};
