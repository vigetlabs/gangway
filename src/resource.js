var assign = require('./assign')

module.exports = function resource (API, name, options) {
  var route = {}
  var path = name + '/{id}'

  route[name] = {
    create: assign(options, {
      method: 'POST',
      path: path
    }),

    read: assign(options, {
      method: 'GET',
      path: path
    }),

    update: assign(options, {
      method: 'PATCH',
      path: path
    }),

    destroy: assign(options, {
      method: 'DELETE',
      path: path
    })
  }

  return API.route(route)
}
