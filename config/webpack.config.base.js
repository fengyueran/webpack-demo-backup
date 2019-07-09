const paths = require('./paths');

module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: 'bundle.js'
  },
  resolve: {
    // 查找自动添加扩展
    extensions: ['.js', '.jsx']
  }
};
