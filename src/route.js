var remap   = require('./remap')
var prepare = require('./prepare')
var url     = require('./url')

module.exports = function route (namespace, methods) {
  // For each endpoint (create, read, update, delete...)
  return remap(methods, function (options) {
    var config = prepare(namespace.config, options)

    var request = function (overrides) {
      return namespace.ajax(prepare(config, overrides))
    }

    request.toString = function () {
      return url.resolve(namespace.toString(), config.path)
    }

    // Make the config for this route available under 'config'
    request.config = config

    return request
  }, namespace)
}
