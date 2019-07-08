const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appHtml: resolveApp('public/index.html'),
  appBuild: resolveApp('build'),
  appIndexJs: resolveApp('src/index.jsx')
};
