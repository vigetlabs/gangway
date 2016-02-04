var API = require('../src/api')
var assert = require('assert')
var url = require('../src/url')

describe('Resource()', function() {

  context('when API.resource is invoked', function() {
    var api = API({
      baseURL: 'http://example.com'
    })
    var users = api.resource('users')

    it ('generates a create route', function() {
      assert.equal(users.create, 'http://example.com/users')
      assert.equal(users.create.config.method, 'POST')
    })

    it ('generates a read route', function() {
      assert.equal(users.read, 'http://example.com/users/{id?}')
      assert.equal(api.users.read.config.method, 'GET')
    })

    it ('uses an optional parameter for the ID of a resource for the read route', function() {
      assert.equal(url(users.read), 'http://example.com/users')

      assert.equal(url(users.read, '', { id: 1 }), 'http://example.com/users/1')
    })

    it ('generates a update route', function() {
      assert.equal(users.update.toString(), 'http://example.com/users/{id}')
      assert.equal(users.update.config.method, 'PATCH')
    })

    it ('generates a destroy route', function() {
      assert.equal(users.destroy.toString(), 'http://example.com/users/{id}')
      assert.equal(api.users.destroy.config.method, 'DELETE')
    })

    context('and options are provided', function() {
      api.resource('candy', {
        method: 'POST',
        path: 'overwritten',
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
        assert.notEqual(api.candy.read.config.path, 'overwritten')
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

  it('returns a namespaced API object', function() {
    var api = API()
    var users = api.resource('users')

    assert.equal(users, api.users)
  })
})
