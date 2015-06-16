let remap = require('./remap')

module.exports = function route(API, routes={}) {

  return remap(routes, function(resource) {

    // For each endpoint (create, read, update, delete...)
    return remap(resource, function(options) {
      let config = Object.assign({}, API.config, options)

      return Object.assign(API.ajax.bind(null, config), { config })
    })
  }, API)
}
