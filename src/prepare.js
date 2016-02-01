/**
 * Prepare request configuration, deeply merging some specific keys
 */

var assign   = require('./assign')
var toArray  = require('./toArray')

var DEFAULTS = {
  baseURL    : '/',
  body       : undefined,
  params     : undefined,
  headers    : {},
  method     : 'GET',
  path       : '',
  query      : {},
  type       : 'application/json',
  beforeSend : function(ajax) { return ajax },
  onResponse : function(response) { return response.body },
  onError    : function(error) { return error }
}

module.exports = function prepare (/* options list */) {
  var options = [ DEFAULTS ].concat(toArray(arguments))

  return options.reduce(function (memo, next) {

    return next ? assign(memo, next, {
      body    : assign(memo.body, next.body),
      params  : assign(memo.params, next.params),
      query   : assign(memo.query, next.query),
      headers : assign(memo.headers, next.headers)
    }) : memo

  }, {})
}
