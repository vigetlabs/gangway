let Gangway = require('../src')

let API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'asdf'
  }
})

API.route({
  users: {
    read: {
      method : 'GET',
      path   : '/users/{user_id}'
    },
    mock: { foo: 'bar' }
  }
})

module.exports = API
