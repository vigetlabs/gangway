var parameterizeRoute  = require('./parameterizeRoute')
var trimRight = /\/$/
var trimLeft  = /^\//

function isAbsolute (path) {
  return (path || '').toString()[0] === '/'
}

function urlRoot (url) {
  return url = url.replace(/\/\w+$/, '')
}

function resolve (base, path) {
  base = (base || '').toString()
  path = (path || '').toString()

  if (isAbsolute(path)) {
    base = urlRoot(base)
  }

  base = base.replace(trimRight, '')
  path = path.replace(trimLeft, '')

  return (base + '/' + path).replace(trimRight, '')
}

function url (base, path, params) {
  return resolve(parameterizeRoute(resolve(base, path), params))
}

module.exports = url
module.exports.resolve = resolve
