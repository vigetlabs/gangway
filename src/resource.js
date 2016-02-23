var route  = require('./route')

module.exports = function resource (API, name, options, nest) {
  var child = API.namespace(name, options).route({

    create: {
      method: 'POST'
    },

    read: {
      method: 'GET',
      path: '{id?}'
    },

    update: {
      method: 'PATCH',
      path: '{id}'
    },

    destroy: {
      method: 'DELETE',
      path: '{id}'
    }

  })

  if (nest) {
    nest(child)
  }

  return child
}
