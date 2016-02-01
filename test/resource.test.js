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
      assert.equal(api.users.create.config.path, 'users')
      assert.equal(api.users.create.config.method, 'POST')
    })

    it ('generates a read route', function() {
      assert.equal(api.users.read.config.path, 'users/{id?}')
      assert.equal(api.users.read.config.method, 'GET')
    })

    it ('uses an optional parameter for the ID of a resource for the read route', function() {
      assert.equal(api.resolve(api.users.read.config.path),
                  'http://example.com/users')

      assert.equal(api.resolve(api.users.read.config.path, { id: 1 }),
                   'http://example.com/users/1')
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
      api.resource('candy', {
        method: 'POST',
        path: 'bad',
        query: { sweet: true }
      })

      it ('assigns those options to routes', function() {
        assert.equal(api.candy.create.config.query.sweet, true)
        assert.equal(api.candy.read.config.query.sweet, true)
        assert.equal(api.candy.update.config.query.sweet, true)
        assert.equal(api.candy.destroy.config.query.sweet, true)
      })

      it ('never assigns options over the method attribute', function() {
        assert.equal(api.candy.read.config.method, 'GET')
      })

      it ('never assigns options over the path attribute', function() {
        assert.equal(api.candy.read.config.path, 'candy/{id?}')
      })
    })
  })

  context('when a namespace function is provided', function() {
    var api = API()

    it ('can create namespaced routes', function(done) {
      api.resource('users', {}, function (users) {
        assert.equal(users.create, api.users.create)
        done()
      })
    })
  })
})
