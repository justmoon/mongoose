
/**
 * Module dependencies.
 */

var SchemaType = require('../schematype')
  , CastError = SchemaType.CastError
  , MongooseBuffer = require('../types/buffer');

/**
 * Buffer SchemaType constructor.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */


function SchemaBuffer (path, options) {
  SchemaType.call(this, path, options);
};

/**
 * Inherits from SchemaType.
 */
SchemaBuffer.prototype.__proto__ = SchemaType.prototype;

/**
 * Required validator for buffer type
 *
 * @api private
 */

SchemaBuffer.prototype.checkRequired = function (value) {
  return value instanceof Buffer;
};

/**
 * Casting buffer.
 *
 * @param {Object} value to cast
 * @api private
 */

SchemaBuffer.prototype.cast = function (value, doc) {
  if (value instanceof MongooseBuffer) return value;

  if (value === null) return value;

  if ("string" === typeof value) {
    value = new Buffer(value, 'binary');
  }

  if (value instanceof Buffer) {
    return new MongooseBuffer(value, this.path, doc);
  }

  throw new CastError('Buffer', value);
};

function handleSingle (val) {
  return this.cast(val);
}

function handleArray (val) {
  var self = this;
  return val.map( function (m) {
    return self.cast(m);
  });
}

SchemaBuffer.prototype.$conditionalHandlers = {
    '$lt': handleSingle
  , '$lte': handleSingle
  , '$gt': handleSingle
  , '$gte': handleSingle
  , '$ne': handleSingle
  , '$in': handleArray
  , '$nin': handleArray
  , '$mod': handleArray
};

SchemaBuffer.prototype.castForQuery = function ($conditional, val) {
  var handler;
  if (arguments.length === 2) {
    handler = this.$conditionalHandlers[$conditional];
    if (!handler)
      throw new Error("Can't use " + $conditional + " with Number.");
    return handler.call(this, val);
  } else {
    val = $conditional;
    return this.cast(val);
  }
};

/**
 * Module exports.
 */

module.exports = SchemaBuffer;
