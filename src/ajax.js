var Promise = require('promise')
var Request = require('superagent')
var url     = require('./url')

let defaults = {
  body       : undefined,
  params     : undefined,
  headers    : {},
  method     : 'GET',
  path       : '',
  type       : 'application/json',
  onResponse : data => data
}

module.exports = function(routeConfig, apiConfig, requestConfig) {
  let options = Object.assign({}, defaults, routeConfig, apiConfig, requestConfig)

  if ('mock' in options) {
    return Promise.resolve(options.mock)
  }

  let location = url(options.baseURL, options.path, options.params || options.body)
  var message  = Request(options.method, location)

  message.send(options.params)  // body parameters
         .query(options.query)  // query parameters
         .set(options.headers)  // headers
         .type(options.type)    // content type

  return new Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(err) : resolve(response.body)
    })
  }).then(options.onResponse)
}
