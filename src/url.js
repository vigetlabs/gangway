let template  = require('./template')
let trimRight = /\/$/
let trimLeft  = /^\//

module.exports = function (base, path, params) {
  base = base.replace(trimRight, '')
  path = path.replace(trimLeft, '')

  return template(base + '/' + path, params).replace(trimRight, '')
}
