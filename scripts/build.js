// enable to detect env with BABEL_ENV or NODE_ENV
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const config = require('../config');
const paths = require('../config/paths');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

const compiler = webpack(config);

console.log('Creating an optimized production build...');

measureFileSizesBeforeBuild(paths.appBuild).then(previousFileSizes => {
  fs.emptyDirSync(paths.appBuild);
  copyPublicFolder();
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
      return messages.warnings.map(warning =>
        console.log(chalk.yellow(warning))
      );
    }
    console.log(chalk.green('Compiled successfully.'));

    console.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(
      stats,
      previousFileSizes,
      paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    );

    return 0; // 0表示成功完成
  });
});
