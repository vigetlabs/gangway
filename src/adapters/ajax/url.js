let parameterize  = require('./parameterize')
let trimRight = /\/$/
let trimLeft  = /^\//

module.exports = function (base, path, params) {
  base = base.replace(trimRight, '')
  path = path.replace(trimLeft, '')

  return parameterize(base + '/' + path, params).replace(trimRight, '')
}
