let defaults = {
  adapter    : require('./adapters/ajax'),
  body       : undefined,
  params     : undefined,
  headers    : {},
  method     : 'GET',
  path       : '',
  type       : 'application/json',
  beforeSend : adapter => adapter,
  onResponse : response => response.body,
  onError    : error => error
}

module.exports = function(...options) {
  return Object.assign({}, defaults, ...options)
}
