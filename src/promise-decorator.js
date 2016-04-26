/**
 * Decorate a request with a promise-like API that allows
 * for interaction with the original request without losing the
 * promise API.
 */

module.exports = function (request, options) {

  var promise = new options.Promise(function (resolve, reject) {

    request.end(function (error, response) {
      if (error) {
        reject(options.onError(error))
      } else {
        resolve(options.onResponse(response))
      }
    })
  })

  request.then = function (resolve, reject) {
    return promise.then(resolve, reject)
  }

  request.catch = function (reject) {
    return promise.catch(reject)
  }

  request.done = function (resolve, reject) {
    var self = arguments.length ? promise.then.apply(promise, arguments) : promise

    self.then(null, function (err) {
      setTimeout(function () {
        throw err;
      }, 0)
    })
  }

  return request
}
