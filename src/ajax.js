var Mock = require('./mock')
var Request = require('superagent')
var prepare = require('./prepare')
var promiseDecorator = require('./promise-decorator')
var url = require('./url')

module.exports = function AJAX (options) {
  options = prepare(options)

  if (!options.Promise) {
    throw TypeError('Gangway uses Promises. The current environment does not support them. Please include a Promise polyfill.')
  }

  if ('mock' in options) {
    return Mock(options)
  }

  var location = url(options.baseURL, url.resolve(options.basePath, options.path), options.params)
  var message  = Request(options.method, location)

  message.type(options.type)
         .send(options.body)
         .query(options.query)
         .set(options.headers)
         .timeout(options.timeout)

  options.beforeSend(message)

  return promiseDecorator(message, options)
}
