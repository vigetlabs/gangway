var Promise = require('promise')
var Request = require('superagent')
var result = require('../../result')
var url = require('./url')
var configure = require('../../configure')

module.exports = function(apiConfig, overrides) {
  let options = configure(apiConfig, overrides)

  if ('mock' in options) {
    return Promise.resolve(result(options.mock, options))
  }

  let location = url(options.baseURL, options.path, options.params || options.body)
  let message  = Request(options.method, location)

  message.send({ ...apiConfig.body, ...options.body })
         .query({ ...apiConfig.query, ...options.query })
         .set({ ...apiConfig.headers, ...options.headers })
         .type(options.type)

  result(options.beforeSend, message)

  return new Promise(function(resolve, reject) {
    message.end(function(err, response) {
      return err ? reject(options.onError(err)) : resolve(options.onResponse(response))
    })
  })
}
