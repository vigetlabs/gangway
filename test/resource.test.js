var API = require('../src/api')
var route = require('../src/route')
var assert = require('assert')

describe('resource', function() {

  context('when API.resource is invoked', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    api.resource('users')

    it ('generates a create route', function() {
      assert.equal(api.users.create.config.path, 'users/{id}')
      assert.equal(api.users.create.config.method, 'POST')
    })

    it ('generates a read route', function() {
      assert.equal(api.users.read.config.path, 'users/{id}')
      assert.equal(api.users.read.config.method, 'GET')
    })

    it ('generates a update route', function() {
      assert.equal(api.users.update.config.path, 'users/{id}')
      assert.equal(api.users.update.config.method, 'PATCH')
    })

    it ('generates a destroy route', function() {
      assert.equal(api.users.destroy.config.path, 'users/{id}')
      assert.equal(api.users.destroy.config.method, 'DELETE')
    })

    context('and options are provided', function() {
      api.resource('candy', { query: { sweet: true }})

      it ('assigns those options to routes', function() {
        assert.equal(api.candy.create.config.query.sweet, true)
        assert.equal(api.candy.read.config.query.sweet, true)
        assert.equal(api.candy.update.config.query.sweet, true)
        assert.equal(api.candy.destroy.config.query.sweet, true)
      })
    })
  })
})
