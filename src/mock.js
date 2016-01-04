var Promise = require('promise')

module.exports = function (options) {
  var reply = typeof options.mock === 'function' ? options.mock(options) : options.mock

  return Promise.resolve(reply)
}
