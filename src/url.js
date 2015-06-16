let parameterizeRoute  = require('./parameterizeRoute')
let trimRight = /\/$/
let trimLeft  = /^\//

module.exports = function (base, path, params) {
  base = base.replace(trimRight, '')
  path = path.replace(trimLeft, '')

  return parameterizeRoute(base + '/' + path, params).replace(trimRight, '')
}
