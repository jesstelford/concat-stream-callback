var concatStream = require('concat-stream');

module.exports = function(readStream, options, callback) {

  // optional `options`
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  // default `options`
  if (!options) options = {}

  // register the error handler
  readStream.on('error', callback);

  // pipe to concatStream (where the magic happens)
  readStream.pipe(concatStream(options, function(result) {
    // then call the callback on success
    callback(null, result);
  }));
}
