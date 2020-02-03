const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');
const { getPublicPath, isEnvDevelopment } = require('./util');
const { isEnvProduction, shouldInlineRuntimeChunk } = require('./util');

const publicPath = getPublicPath();
const publicUrl = isEnvProduction
  ? publicPath.slice(0, -1)
  : isEnvDevelopment && '';

module.exports = {
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    // 一个页面对应一个

    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
          filename: 'index.html',
          chunks: ['vendors', 'commons', 'main']
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'search.html',
      chunks: ['vendors', 'search'],
      template: paths.searchHtml
    }),
    // Inlines the webpack runtime script. This script is too small to warrant
    // a network request.
    isEnvProduction &&
      shouldInlineRuntimeChunk &&
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: publicUrl
    })
  ].filter(Boolean)
};
