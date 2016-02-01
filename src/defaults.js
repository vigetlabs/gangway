var ajax = require('./ajax')

module.exports = {
  ajax       : ajax,
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
