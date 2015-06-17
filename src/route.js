let remap = require('./remap')

module.exports = function route(API, routes={}) {

  return remap(routes, function(resource) {

    // For each endpoint (create, read, update, delete...)
    return remap(resource, function(options) {
      let config  = Object.assign({}, API.config, options)
      let request = API.ajax.bind(null, config)

      // Make the config for this route available under 'config'
      request.config = config

      return request
    })
  }, API)
}
