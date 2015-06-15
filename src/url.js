module.exports = function (base, path) {
  base = base.replace(/\/$/, '')
  path = path.replace(/^\//, '')

  return base + '/' + path
}
