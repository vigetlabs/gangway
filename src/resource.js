var assign = require('./assign')

module.exports = function resource (API, name, options, nest) {
  var route = {}

  route[name] = {
    create: assign({}, options, {
      method: 'POST',
      path: name
    }),

    read: assign({}, options, {
      method: 'GET',
      path: name + '/{id?}'
    }),

    update: assign({}, options, {
      method: 'PATCH',
      path: name + '/{id}'
    }),

    destroy: assign({}, options, {
      method: 'DELETE',
      path: name + '/{id}'
    })
  }

  API.route(route)

  if (nest) {
    nest(API.namespace(name))
  }

  return API
}
