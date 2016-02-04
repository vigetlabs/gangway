var assign   = require('./assign')
var endpoint = require('./endpoint')

module.exports = function resource (API, name, options, nest) {
  var child = API.namespace(name)

  endpoint(child, {

    create: assign({}, options, {
      method: 'POST'
    }),

    read: assign({}, options, {
      method: 'GET',
      path: '{id?}'
    }),

    update: assign({}, options, {
      method: 'PATCH',
      path: '{id}'
    }),

    destroy: assign({}, options, {
      method: 'DELETE',
      path: '{id}'
    })

  })

  if (nest) {
    nest(child)
  }

  return child
}
