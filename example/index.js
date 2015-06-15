let Gangway = require('../src')

module.exports = Gangway({
  users: {
    read: {
      description : 'The main endpoint',
      method      : 'GET',
      path        : '/',
      headers     : {
        'x-user-token': 'asdfasdf'
      }
    },
    mock: { foo: 'bar' }
  }
])
