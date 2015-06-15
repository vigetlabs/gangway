var ajax  = require('./ajax')
var remap = require('./remap')

module.exports = function (baseURL, resources={}) {
  var API = {
    ajax : ajax,
    toString() {
      return baseURL
    }
  }

  // For each resource (users, posts...)
  return remap(resources, function(resource) {
    // For each endpoint (create, read, update, delete...)
    return remap(resource, function(options) {
      return API.ajax.bind(API, baseURL, options)
    })
  }, API)
}
