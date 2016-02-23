var API = require('../src/api')
var route = require('../src/route')
var assert = require('assert')

describe('route', function() {

  it ('can handle empty routes', function() {
    route(API({ baseURL: '' }))
  })

  context('when a route is created', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    var read = { path: 'users' }

    route(api, { read: read })

    it ('extends each route with configuration settings', function() {
      assert.equal(api.read.config.path, read.path)
      assert.equal(api.read.config.description, api.config.description)
    })
  })
})
