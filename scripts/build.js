// enable to detect env with BABEL_ENV or NODE_ENV
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('react-dev-utils/chalk');
const config = require('../config');

const compiler = webpack(config);

console.log('Creating an optimized production build...');
compiler.run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }
  const messages = stats.toJson({ all: false, warnings: true, errors: true });
  const hasErrors = messages.errors.length;
  if (hasErrors) {
    console.log(chalk.red('Errors: '));
    return messages.errors.map(error => console.log(chalk.red(error)));
  }
  const hasWarnings = messages.warnings.length;
  if (hasWarnings) {
    console.log(chalk.yellow('Warnings: '));
    return messages.warnings.map(warning => console.log(chalk.yellow(warning)));
  }
  console.log(chalk.green('Compiled successfully.'));

  return 0;
});
