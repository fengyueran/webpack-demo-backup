const paths = require('./paths');

module.exports = function() {
  return {
    contentBase: paths.appPublic,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
    quiet: true
  };
};
