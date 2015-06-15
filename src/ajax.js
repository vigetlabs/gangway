var Promise = require('promise')
var Request = require('superagent')
var url     = require('./url')

let defaults = {
  body    : {},
  headers : {},
  method  : 'GET',
  path    : '',
  type    : 'application/json'
}

module.exports = function(config, overrides) {
  let options = Object.assign({}, defaults, config, overrides)

  if ('mock' in options) {
    return Promise.resolve(options.mock)
  }

  var message = Request(options.method, url(options.baseURL, options.path))

  message.send(options.body)    // body parameters
         .query(options.query)  // query parameters
         .set(options.headers)  // headers
         .type(options.type)    // content type

  return new Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(err) : resolve(response.body)
    })
  })
}
