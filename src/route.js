let remap = require('./remap')

module.exports = function route(API, routes={}) {

  return remap(routes, function(resource) {

    // For each endpoint (create, read, update, delete...)
    return remap(resource, function(options) {
      return API.ajax.bind(null, API.config, options)
    })
  }, API)
}
