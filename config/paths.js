const path = require('path');
const fs = require('fs');
const url = require('url');

const envPublicUrl = process.env.PUBLIC_URL;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

const ensureSlash = (inputPath, needsSlash) => {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  }
  return inputPath;
};

const getServedPath = appPackageJson => {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
};

module.exports = {
  appPath: resolveApp('.'),
  appHtml: resolveApp('public/index.html'),
  searchHtml: resolveApp('public/search.html'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  searchJs: resolveApp('src/search.jsx'),
  appIndexJs: resolveApp('src/index.jsx'),
  addIndexJs: resolveApp('src/add/index.js')
};
