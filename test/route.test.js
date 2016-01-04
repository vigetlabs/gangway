var API = require('../src/api')
var route = require('../src/route')
var assert = require('assert')

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

    assert.equal(api.users.read.config.path, read.path)
    assert.equal(api.users.read.config.description, api.config.description)
  })
})
