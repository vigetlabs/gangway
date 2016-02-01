/**
 * Prepare request configuration, deeply merging some specific keys
 */

var DEFAULTS = require('./defaults')
var assign   = require('./assign')
var toArray  = require('./toArray')

module.exports = function prepare (/* options list */) {
  var options = [ DEFAULTS ].concat(toArray(arguments)).filter(i => i != undefined)

  return options.reduce(function (memo, next) {

    return assign(memo, next, {
      body    : assign(memo.body, next.body),
      params  : assign(memo.params, next.params),
      query   : assign(memo.query, next.query),
      headers : assign(memo.headers, next.headers)
    })
  }, {})
}
