var assign = require('./assign')

module.exports = function resource (API, name, options) {
  var route = {}

  route[name] = {
    create: assign(options, {
      method: 'POST',
      path: name + '/{id}'
    }),

    read: assign(options, {
      method: 'GET',
      path: name + '/{id?}'
    }),

    update: assign(options, {
      method: 'PATCH',
      path: name + '/{id}'
    }),

    destroy: assign(options, {
      method: 'DELETE',
      path: name + '/{id}'
    })
  }

  return API.route(route)
}
