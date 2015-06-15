let template = require('./template')

module.exports = function (base, path, body) {
  base = base.replace(/\/$/, '')
  path = path.replace(/^\//, '')

  return template(base + '/' + path, body)
}
