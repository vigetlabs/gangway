var ajax  = require('./ajax')
var route = require('./route')
var resource = require('./resource')

module.exports = function (config, routes) {

  if (!config) {
    throw new TypeError('Please provide a configuration object as the first argument.')
  }

  if ('baseURL' in config === false) {
    throw new TypeError('baseURL configuration option is required')
  }

  var API = {
    config: config,
    ajax: ajax,

    toString: function () {
      return config.baseURL
    },

    route: function (routes) {
      return route(API, routes)
    },

    resource: function (routes, options) {
      return resource(API, routes, options)
    }

  }

  return API.route(routes)
}
