var inspect = require('util').inspect

var messages = {
  input: "\u2190",
  output: "\u2192"
};

module.exports = function (type, stream, item) {
  var message = messages[type];
  if (!message) return stream;
  if (!stream) {
    return console.log(message, inspect(item, {colors:true}));
  }
  return { read: traceRead, abort: stream.abort };
  function traceRead(callback) {
    stream.read(function (err, item) {
      if (err) return callback(err);
      console.log(message, inspect(item, {colors:true}));
      callback(null, item);
    });
  }
}
