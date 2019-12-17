const paths = require('./paths');
const { isEnvProduction, isEnvDevelopment } = require('./util');

module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  entry: {
    // string | object | array, // 默认为 'src/index'
    main: paths.appIndexJs
  },
  output: {
    // string, 必须是绝对路径
    path: paths.appBuild,

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
  }
};
