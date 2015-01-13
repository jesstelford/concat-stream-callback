var assert = require('assert'),
    Readable = require('stream').Readable,
    concatStreamCallback = require('../');

describe('Stream Error', function() {

  beforeEach('setup erroring stream', function() {
    this.stream = new Readable();
    this.stream._read = function() {
      this.emit('error', new Error('an error'));
    }
  });

  it('gets passed to the callback', function(done) {

    concatStreamCallback(this.stream, function(err, result) {
      assert(err instanceof Error);
      assert(err.message == 'an error');
      done();
    });

  });

  it('only calls callback once', function(done) {

    var callCount = 0;

    concatStreamCallback(this.stream, function(err, result) {
      callCount++;
    });

    // TODO: How do we test this without a timeout?
    setTimeout(function() {
      assert(callCount == 1);
      done()
    }, 200);

  });

});
