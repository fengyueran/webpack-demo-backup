const { isEnvProduction } = require('./util');
const paths = require('./paths');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve('thread-loader'),
            options: {
              workers: 4
            }
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              compact: isEnvProduction,
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
};
