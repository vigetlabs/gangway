var remap    = require('./remap')
var endpoint = require('./endpoint')

module.exports = function route (API, routes) {
  return remap(routes || {}, endpoint.bind(null, API), API)
}
