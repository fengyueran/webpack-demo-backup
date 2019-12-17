process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// eslint-disable-next-line
const colors = require('colors');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const config = require('../config');
const paths = require('../config/paths');
const createDevServerConfig = require('../config/webpack.config.dev');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 1989;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

const compiler = webpack(config);
const serverConfig = createDevServerConfig();
const devServer = new WebpackDevServer(compiler, serverConfig);

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (!port) return;

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      //   clearConsole();
      openBrowser(urls.localUrlForBrowser);
      return 0;
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
