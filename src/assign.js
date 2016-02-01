var toArray = require('./toArray')

module.exports = function assign (initial/*... objects list */) {
  var toMerge = toArray(arguments)

  return toMerge.reduce(function(memo, next) {
    if (next) {
      for (var key in next) {
        memo[key] = next[key]
      }
    }

    return memo
  }, initial || {})
}
