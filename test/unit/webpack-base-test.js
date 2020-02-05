const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../config/webpack.config.base.js');

  it('entry', () => {
    assert.equal(
      baseConfig.entry.main.includes('webpack-demo/src/index.jsx'),
      true
    );
    assert.equal(
      baseConfig.entry.search.includes('webpack-demo/src/search.jsx'),
      true
    );
  });
});
