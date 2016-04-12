var Mock    = require('./mock')
var Request = require('superagent')
var prepare = require('./prepare')
var url     = require('./url')

module.exports = function AJAX (options) {
  options = prepare(options)

  if (!options.Promise) {
    throw TypeError('Gangway uses Promises. The current environment does not support them. Please include a Promise polyfill.')
  }

  if ('mock' in options) {
    return options.Promise.resolve(Mock(options))
  }

  var location = url(options.baseURL, url.resolve(options.basePath, options.path), options.params)
  var message  = Request(options.method, location)

  message.type(options.type)
         .send(options.body)
         .query(options.query)
         .set(options.headers)

  options.beforeSend(message)

  var promise = new options.Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(options.onError(err)) : resolve(options.onResponse(response))
    })
  })

  promise.request = message

  return promise
}
