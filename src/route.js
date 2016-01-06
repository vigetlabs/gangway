var remap   = require('./remap')
var prepare = require('./prepare')

module.exports = function route (API, routes) {

  return remap(routes || {}, function(resource) {
    // For each endpoint (create, read, update, delete...)
    return remap(resource, function(options) {
      var config = prepare(API.config, options)

      var request = function (overrides) {
        return API.ajax(prepare(config, overrides))
      }

      // Make the config for this route available under 'config'
      request.config = config

      return request
    })
  }, API)
}
