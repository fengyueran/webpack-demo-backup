module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader')
      }
    ]
  }
};
