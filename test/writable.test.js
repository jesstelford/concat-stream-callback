var assert = require('assert'),
    Writable = require('stream').Writable,
    concatStreamCallback = require('../');

describe('Writable', function() {

  it('is returned', function() {
    var writable = concatStreamCallback(function(err, result) {});
    assert(typeof writable._write === 'function');
  });

  it('is writes correct result', function(done) {

    var writable = concatStreamCallback(function(err, result) {
      assert(err == null);
      assert(result == 'hello');
      done();
    });

    writable.write('hello');
    writable.end();
  });

});
