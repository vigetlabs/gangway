var Promise = require('promise')
var Request = require('superagent')
var url     = require('./url')
var result  = require('./result')

let defaults = {
  body       : undefined,
  params     : undefined,
  headers    : {},
  method     : 'GET',
  path       : '',
  type       : 'application/json',
  beforeSend : ajax => ajax,
  onResponse : response => response.body
}

module.exports = function(routeConfig, requestConfig) {
  let options = Object.assign({}, defaults, routeConfig, requestConfig)

  if ('mock' in options) {
    return Promise.resolve(result(options.mock, options))
  }

  let location = url(options.baseURL, options.path, options.params || options.body)
  var message  = Request(options.method, location)

  message.send(options.body)  // body parameters
         .query(options.query)  // query parameters
         .set(options.headers)  // headers
         .type(options.type)    // content type

  options.beforeSend(message)

  return new Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(err) : resolve(response)
    })
  }).then(options.onResponse)
}
