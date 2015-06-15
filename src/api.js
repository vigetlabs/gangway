let ajax  = require('./ajax')
let route = require('./route')

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

    route(routes) {
      return route(API, routes)
    }

  }

  return API.route(routes)
}
