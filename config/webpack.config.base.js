const paths = require('./paths');
const { isEnvProduction } = require('./util');

module.exports = {
  entry: {
    // string | object | array, // 默认为 'src/index'
    main: paths.appIndexJs
  },
  output: {
    // string, 必须是绝对路径
    path: paths.appBuild,

    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    // string，entry为对象时，[name]为entry的key，此时为main
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/bundle.js'
  },
  resolve: {
    // 查找自动添加扩展
    extensions: ['.js', '.jsx']
  }
};
