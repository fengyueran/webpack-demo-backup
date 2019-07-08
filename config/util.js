const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const getStyleLoaders = cssOptions => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    {
      // "css" loader resolves paths in CSS and adds assets as dependencies, support import grammar.
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
