const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../config/webpack.config.base.js');

  it('entry', () => {
    assert.equal(
      baseConfig.entry.main,
      '/Users/snow/MyHouse/webpack-demo/src/index.jsx'
    );
    assert.equal(
      baseConfig.entry.search,
      '/Users/snow/MyHouse/webpack-demo/src/search.jsx'
    );
  });
});
