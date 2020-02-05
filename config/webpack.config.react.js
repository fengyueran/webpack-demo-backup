const { isEnvProduction } = require('./util');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
              compact: isEnvProduction
            }
          }
        ]
      }
    ]
  }
};
