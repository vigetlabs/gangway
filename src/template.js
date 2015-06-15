module.exports = function (string, params={}) {
  return string.replace(/\{(.+?)\}/, function(whole, match) {
    match = match.trim()

    if (match in params === false) {
      throw TypeError(`Parameter ${ match } was not provided in body option`)
    }
    return params[match]
  })
}
