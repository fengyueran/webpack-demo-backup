const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production', // "production" | "development" | "none"
  optimization: {
    // 定制压缩工具，压缩js
    minimizer: [
      new TerserPlugin({
        // https://github.com/terser-js/terser#minify-options
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            // Specify ECMAScript release: 5, 6, 7 or 8.
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
        // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
        parallel: !isWsl,
        cache: true,
        sourceMap: true
      })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // runtimeChunk是用来管理模块执行的代码，包含在最新生成的chunk中，
    // 当某个chunk发生变化时，runtimeChunk就会发生变化，包含runtimeChunk代码的chunk就会发生变化
    // runtimeChunk为true，就可以将runtimeChunk提取出来，而不影响包含runtimeChunk代码的chunk
    runtimeChunk: true
  },
  plugins: [
    new CompressionPlugin({
      // gzip 压缩
      algorithm: 'gzip',
      compressionOptions: { level: 9 },
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
      )
    })
  ]
};
