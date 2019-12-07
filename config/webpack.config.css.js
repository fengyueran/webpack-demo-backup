const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
  getStyleLoaders,
  isEnvProduction,
  shouldUseSourceMap
} = require('./util');

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
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      // This is only used in production mode，压缩css
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true
              }
            : false
        }
      })
    ]
  },
  plugins: [
    // 提取css到一个文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    // 集成critical的插件，用于提取关键资源
    new HtmlCriticalWebpackPlugin({
      base: 'build',
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      penthouse: {
        blockJSRequests: false
      }
    })
  ]
};
