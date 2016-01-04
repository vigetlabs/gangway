var API   = require('../src/api')
var route = require('../src/route')

describe('route', function() {
  it ('can handle empty routes', function() {
    route(API({ baseURL: '' }))
  })

  it ('extends each route with configuration settings', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })
    var read = { path: 'users' }

    route(api, { users: { read: read } })

    api.users.read.config.should.include(read)
    api.users.read.config.should.include(api.config)
  })
})
