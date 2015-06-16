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
    let read = { path: 'users' }

    route(api, { users: { read } })

    api.users.read.config.should.include(read)
    api.users.read.config.should.include(api.config)
  })
})
