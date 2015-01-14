var assert = require('assert'),
    Readable = require('stream').Readable,
    concatStreamCallback = require('../');

describe('Options', function() {

  describe('opts object', function() {

    beforeEach('setup stream', function() {
      this.stream = new Readable();
      this.stream._read = (function() {
        this.push('hello');
        this.push(null);
      }).bind(this.stream)
    });

    it('are optional', function(done) {

      concatStreamCallback(this.stream, function(err, result) {
        assert(err == null);
        assert(result == 'hello');
        done();
      });

    });

    it('are passed through to concat-stream', function(done) {

      var callCount = 0;

      concatStreamCallback(this.stream, {encoding: 'buffer'}, function(err, result) {
        assert(err == null);
        assert(Buffer.isBuffer(result));
        done();
      });

    });

  });

});
