const { isEnvProduction } = require('./util');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          // https://babeljs.io/docs/en/options
          compact: isEnvProduction
        }
      }
    ]
  }
};
