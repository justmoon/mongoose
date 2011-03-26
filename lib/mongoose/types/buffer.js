
/**
 * Module dependencies.
 */

/**
 * MongooseBuffer constructor.
 *
 * @param {Object} value to pass to Buffer
 * @param {Document} parent document
 * @api private
 */

function MongooseBuffer (value, path, doc) {
  var buffer = new Buffer(value);
  buffer.__proto__ = MongooseBuffer.prototype;
  buffer._atomics = {};
  buffer._path = path;
  buffer._parent = doc;
  return buffer;
};

/**
 * Inherits from Buffer.
 */

MongooseBuffer.prototype = new Buffer([]);


/**
 * Returns a binary String
 *
 * @return {String}
 * @api public
 */

MongooseBuffer.prototype.toObject = function () {
  return this.toString('base64');
};

/**
 * Module exports
 */

module.exports = MongooseBuffer;
