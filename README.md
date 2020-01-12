# webpack-demo

webpack practice demo - v4.x

### 概念

- chunk

  正常情况下，以 entry 指定的文件为入口，将入口文件及其依赖打包成一个 bundle 文件，然而有些情况下，部分功能是在使用时才会用到的，出于性能优化的需要，我们将需要按需加载的内容打包到独立的文件当中，这些文件就叫做 chunk。

- hash

  由编译的所有文件决定的 hash 指纹，只要编译的项目文件有变化这个 hash 值就会有变化。

- chunkhash

  由 chunk 文件块决定的 hash 指纹，不同的入口会生成不同的 chunk，对应着不同的 hash 值。通常，我们在生产环境中把一些公共库和程序入口文件分开，单独打包构建，如果不更改公共库，hash 值就不会改变，也就达到了缓存的目的。如果主项目采用 chunkhash，项目主入口文件 main.js 及其对应的依赖文件由于被打包在同一个模块，所以共用相同的 chunkhash，这就存在一个问题，只要 css 或 js 改变了，其对应的 chunkhash 就改变了，浏览器就会重新下载 css 和 js，没有达到缓存的目的。

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

### 热更新原理

- Webpack Compile
  将 js 编译成 bundle

- HMR Server
  文件更新后，webpack 编译，将热更新的文件输出给 HMR Runtime

- Bundle server
  提供文件在浏览器的访问

- HMR Runtime

  会被注入到浏览器，通常是一个 websocket，可以更新文件的变化

- bundle.js

  构建输出的文件

<img style="display:block; margin: auto;border: 1px solid；" src="http://blog-bed.oss-cn-beijing.aliyuncs.com/webpack-demo/%E7%83%AD%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86.png" />

  <center>热更新原理</center>

### 资源压缩

- js 文件的压缩

webpack4 内置了 uglifyjs-webpack-plugin 插件进行压缩，

- css 文件的压缩

通过 optimize-css-assets-webpack-plugin 进行压缩

- html 文件的压缩

通过 html-webpack-plugin 进行压缩

### css 后处理

由于不同浏览器标准并没有完全统一，我们需要在 css3 的属性加上浏览器前缀，主要有下面四种内核：

- Trident(-ms)
- Gecko(-moz)
- Webkit(-webkit)
- Presto(-o)

```
.rec {
 -ms-border-radius: 5px;
 -moz-border-radius: 5px;
 -webkit-border-radius: 5px;
 -o-border-radius: 5px;
 border-radius: 5px;
}
```

### HTML 和 JS 内联

- raw-loader
  raw-loader 读取一个文件为 string，然后插入到相应位置。
  内联 html:

  如果有 es6 的语法需要用 babel 进行转换。

  ```
  <script>${require('raw-loader!babel-loader!./meta.html')}</script>
  ```

  内联 js

  ```
  <script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
  ```

### css 内联

- style-loader

  ```
  module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          loader: "style-loader",
          options: {
            insertAt: 'top',// 将样式插入到<head>,
            singleton: true,//将所有的style标签合并成一个
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
  };

  ```

- html-inline-css-webpack-plugin
  默认模板引擎为 ejs 引擎。
