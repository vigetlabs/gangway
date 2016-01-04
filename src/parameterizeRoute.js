// This is taken from Call, hapi's routing logic:
// https://github.com/hapijs/call/blob/master/lib/regex.js
let pattern = new RegExp('(?:\\{(\\w+)(?:(\\*)(\\d+)?)?(\\?)?\\})', 'g')

module.exports = function (string, params={}) {
  return string.replace(pattern, function (match, key, isWildcard, _, isOptional) {
    if (isWildcard) {
      throw TypeError(`Gangway does not support Hapi wildcard routes within ${string}`)
    }

    if (key in params === false && !isOptional) {
      throw TypeError(`"${key}" was not provided in the given params for ${string}`)
    }

    return params[key] !== undefined ? params[key] : ''
  })
}
