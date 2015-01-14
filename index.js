var concatStream = require('concat-stream');

/**
 * @param readStream Readable stream to read from
 * @param options Object The options object to pass to concat-stream
 * @param callback Function The callback function (err <Error>, result <*>)
 * @return Writable stream to write to
 */
module.exports = function(readStream, options, callback) {

  var concatStreamWritable;

  // optional readStream
  if (typeof readStream._read !== 'function') {
    callback = options;
    options = readStream;
    readStream = undefined;
  }

  // optional `options`
  if (typeof options === 'function') {
    callback = options
    options = undefined;
  }

  // default `options`
  if (!options) {
    options = {}
  }

  // pipe to concatStream (where the magic happens)
  concatStreamWritable = concatStream(options, function(result) {
    // then call the callback on success
    callback(null, result);
  });

  if (readStream) {
    // register the error handler
    readStream.on('error', callback);
    // the data needs to be sent into the concat-stream
    readStream.pipe(concatStreamWritable);
  }

  // Maintain the behaviour of concat-stream and return the result
  return concatStreamWritable;

}
