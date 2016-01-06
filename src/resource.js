var assign = require('./assign')

module.exports = function resource (API, name, options) {
  var route = {}

  route[name] = {
    create: assign({
      method: 'POST',
      path: name + '/{id}'
    }, options),

    read: assign({
      path: name + '/{id}'
    }, options),

    update: assign({
      method: 'PATCH',
      path: name + '/{id}'
    }, options),

    destroy: assign({
      method: 'DELETE',
      path: name + '/{id}'
    }, options)
  }

  return API.route(route)
}
