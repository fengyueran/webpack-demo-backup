const webpack = require('webpack');
const paths = require('./paths');
const { isEnvProduction, isEnvDevelopment, getPublicPath } = require('./util');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // 生成source-map
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  entry: {
    // string | object | array, // 默认为 'src/index'
    main: paths.appIndexJs,
    search: paths.searchJs
  },
  output: {
    // string, 必须是绝对路径
    path: paths.appBuild,

    publicPath: getPublicPath(),

    // There per asynchronous chunk.
    // In development, it does not produce real files.
    // string，entry为对象时，[name]为entry的key，此时为main
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js',

    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js'
  },
  resolve: {
    // 查找自动添加扩展
    extensions: ['.js', '.jsx']
  },
  plugins: [
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean)
};
