let API   = require('../api')
let route = require('../route')

describe('route', function() {
  it ('can handle empty routes', function() {
    route(API({ baseURL: '' }))
  })

  it ('extends each route with configuration settings', function() {
    let api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    route(api, { users: { read: { path: 'users' } } })

    api.users.read.config.should.have.property('path', 'users')

    for (var i in api.config) {
      api.users.read.config.should.have.property(i, api.config[i])
    }
  })
})
