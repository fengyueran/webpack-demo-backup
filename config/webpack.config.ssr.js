const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const paths = require('./paths');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  entry: {
    food: paths.serverIndexJs
  },
  output: {
    path: paths.appBuild,
    libraryTarget: 'umd',
    filename: '[name]-server.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          // https://babeljs.io/docs/en/options
          compact: true
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.foodHtml,
      filename: 'food.html',
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  stats: 'errors-only'
};
