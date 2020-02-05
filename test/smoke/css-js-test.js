const glob = require('glob-all');

describe('Checking generated css js files', () => {
  it('should generate css js files', done => {
    const files = glob.sync([
      './build/static/js/main*.js',
      './build/static/css/main*.css',
      './build/static/js/search*.js',
      './build/static/css/search*.css'
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});
