# concat-stream-callback

Callback wrapper for concat-stream providing errors. Simplifies converting a
Readable stream into a node-style callback.

## Example

### Writable

```javascript
var concatStreamCallback = require('concat-stream-callback')

var write = concatStreamCallback(function(err, data) {

  if (err) return console.error(err);
  
  // data will be [1,2,3,4,5,6]
  console.log(data);
})

write.write([1,2,3])
write.write([4,5,6])
write.end()
```

### Stream

```javascript
var fs = require('fs')
var concatStreamCallback = require('concat-stream-callback')

var readStream = fs.createReadStream('cat.png')

var writeStream = concatStreamCallback(readStream, function(err, imageBuffer) {
  // handle your error appropriately here, e.g.:
  if (err) return console.error(err)

  // imageBuffer is all of `cat.png` as a node.js Buffer
  console.log(imageBuffer);
}

readStream.pipe(writeStream)
```

## Wraps [concat-stream](https://github.com/maxogden/concat-stream)

This module leverages the power provided by Max Ogden's
[`concat-stream`](https://github.com/maxogden/concat-stream). All of
`concat-stream`'s functionality is available (except instantiation with `new` -
it is recommended to avoid this).

## Usage

```javascript
var concatStreamCallback = require('concat-stream-callback');
```

See `/test` and [`concat-stream`](https://github.com/maxogden/concat-stream) for
more example usage.

### var writable = concatStreamCallback(readable, opts, cb)

#### `readable`

An optional Readable instance to attach error handlers to.

#### `opts`

Optional options passed through to `concat-stream`. See
[here](https://github.com/maxogden/concat-stream#var-writable--concatopts-cb)
for details.

#### `cb`

```javascript
function (err, result) {}
```

Required callback which executes if `readable` emits an `'error'`, or once after
the stream has been completely read.
