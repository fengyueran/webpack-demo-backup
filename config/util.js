const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const getStyleLoaders = cssOptions => {
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use MiniCSSExtractPlugin to extract that CSS
  // to a file, but in development "style" loader enables hot editing
  // of CSS.
  // By default we support CSS Modules with the extension .module.css
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        ...cssOptions,
        sourceMap: isEnvProduction && shouldUseSourceMap
      }
    }
  ].filter(Boolean);

  return loaders;
};

module.exports = {
  isEnvDevelopment,
  isEnvProduction,
  getStyleLoaders
};
