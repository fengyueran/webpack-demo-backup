// enable to detect env with BABEL_ENV or NODE_ENV
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
// eslint-disable-next-line
const colors = require('colors');
const config = require('../config');

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const messages = stats.toJson({ all: false, warnings: true, errors: true });
  const hasErrors = messages.errors.length;
  if (hasErrors) {
    console.log('Errors: '.bold.red);
    return messages.errors.map(error => console.log(error.red));
  }
  const hasWarnings = messages.warnings.length;
  if (hasWarnings) {
    console.log('Warnings: '.bold.yellow);
    return messages.warnings.map(warning => console.log(warning.yellow));
  }
  console.log('Compiled successfully.');

  return 0;
});
