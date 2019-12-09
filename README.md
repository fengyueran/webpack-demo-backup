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

### loader

由于 webpack 原生只支持 js 和 JSON 两种类型的文件，通过 loaders 去转换其他文件类型。loader 链式调用，从右到左的顺序调用。

- less-loader
  用于将 less 转换为 css。

- css-loader
  用于加载.css 文件，并且转换成 commonjs 对象。
- style-loader
  将样式通过\<style\>标签插入到 head 中。

- url-loader
  可以处理图片和字体，并可以设置较小资源自动 base64。内部用的 file-loader。

### plugin

作用于整个构建过程
