let ajax  = require('./ajax')
let remap = require('./remap')

module.exports = function (config, routes) {

  if (!config) {
    throw new TypeError('Please provide a configuration object as the first argument.')
  }

  if ('baseURL' in config === false) {
    throw new TypeError('baseURL configuration option is required')
  }

  let API = {
    config,
    ajax,

    toString() {
      return config.baseURL
    },

    route(routes={}) {
      return remap(routes, function(resource) {
        // For each endpoint (create, read, update, delete...)
        return remap(resource, function(options) {
          return API.ajax.bind(API, options)
        })
      }, API)
    }

  }

  return API.route(routes)
}
