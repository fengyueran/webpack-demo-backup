# webpack-demo

webpack practice demo - v4.x

### 概念

- chunk

  正常情况下，以 entry 指定的文件为入口，将入口文件及其依赖打包成一个 bundle 文件，然而有些情况下，部分功能是在使用时才会用到的，出于性能优化的需要，我们将需要按需加载的内容打包到独立的文件当中，这些文件就叫做 chunk。

- hash

  由编译的所有文件决定的 hash 指纹。

- chunkhash

  由 chunk 文件块决定的 hash 指纹。通常，css 会在 js 当中被引用，最终打包成一个 chunk 块，chunkhash 由 js 和 css 公共决定，也就说即使 css 没有更改，其 chunkhash 也会改变。

- contenthash

  由文件内容决定的 hash 指纹。
