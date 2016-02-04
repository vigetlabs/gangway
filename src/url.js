var parameterizeRoute  = require('./parameterizeRoute')
var trimRight = /\/$/
var trimLeft  = /^\//

function resolve (base, path) {
  base = (base || '').toString().replace(trimRight, '')
  path = (path || '').toString().replace(trimLeft, '')

  return (base + '/' + path).replace(trimRight, '')
}

function url (base, path, params) {
  return resolve(parameterizeRoute(resolve(base, path), params))
}

module.exports = url

module.exports.resolve = resolve
