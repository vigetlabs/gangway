var Mock    = require('./mock')
var Promise = require('promise')
var Request = require('superagent')
var prepare = require('./prepare')
var url     = require('./url')
var assign  = require('./assign')

module.exports = function AJAX (options) {
  options = prepare(options)

  if ('mock' in options) {
    return Mock(options)
  }

  var location = url(options.baseURL, options.path, assign(options.body, options.params))
  var message  = Request(options.method, location)

  message.type(options.type)
         .send(options.body)
         .query(options.query)
         .set(options.headers)

  options.beforeSend(message)

  return new Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(options.onError(err)) : resolve(options.onResponse(response))
    })
  })
}
