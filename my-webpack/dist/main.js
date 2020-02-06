
    (function(modules) {
        function require(filename) {
            const fn = modules[filename];
            const module = {exports: {}};
            fn(require, module, module.exports);
            return module.exports;
        }
        require('/Users/snow/MyHouse/webpack-demo/my-webpack/src/index.js');
    })({'/Users/snow/MyHouse/webpack-demo/my-webpack/src/index.js': function (require, module, exports) {"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('snow'));},'./greeting.js': function (require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello ' + name;
}},})
    