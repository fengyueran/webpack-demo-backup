module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,

        use: [
          { loader: require.resolve('url-loader'), options: { limit: 10240 } } // 字节
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,

        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[name]_[hash:8][ext]'
            }
          } // 字节
        ]
      }
    ]
  }
};
