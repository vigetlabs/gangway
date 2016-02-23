var API = require('../src/api')
var assert = require('assert')
var fauxJax = require('faux-jax')

describe('API()', function() {
  var baseURL = 'http://foo.com'

  it ('stringifies to a given baseURL', function() {
    assert.equal(API({ baseURL: baseURL }).toString(), baseURL)
  })

  it ('can resolve a url', function() {
    assert.equal('http://example.com/path',
                 API({ baseURL: 'http://example.com' }).resolve('path'))
  })

  it ('maps over a list of endpoints when instantiated', function() {
    var endpoints = API({ baseURL: baseURL }, {
      foo: {
        get: '/bip'
      }
    })

    assert('foo' in endpoints)
  })

  it ('can add new endpoints', function() {
    var endpoints = API({ baseURL: baseURL })

    endpoints.route({
      bar: {
        get: '/bip'
      }
    })

    assert('bar' in endpoints)
  })

  it ('folds together headers', function() {
    var endpoints = API({
      baseURL: baseURL,
      headers: {
        'one': 1
      }
    })

    endpoints.route({
      foo: {
        get: '/bip',
        headers: {
          'two': 2
        }
      }
    })

    assert.equal(endpoints.foo.config.headers.one, 1)
    assert.equal(endpoints.foo.config.headers.two, 2)
  })

  it ('folds together query params', function() {
    var endpoints = API({
      baseURL: baseURL,
      query: {
        'one': 1
      }
    })

    endpoints.route({
      foo: {
        get: '/bip',
        query: {
          'two': 2
        }
      }
    })

    assert.equal(endpoints.foo.config.query.one, 1)
    assert.equal(endpoints.foo.config.query.two, 2)
  })

  it ('folds together body params', function() {
    var endpoints = API({
      baseURL: baseURL,
      body: {
        'one': 1
      }
    })

    endpoints.route({
      foo: {
        body: {
          'two': 2
        }
      }
    })

    assert.equal(endpoints.foo.config.body.one, 1)
    assert.equal(endpoints.foo.config.body.two, 2)
  })

  it ('folds together params', function() {
    var endpoints = API({
      baseURL: baseURL,
      params: {
        'one': 1
      }
    })

    endpoints.route({
      foo: {
        get: '/bip',
        params: {
          'two': 2
        }
      }
    })

    assert.equal(endpoints.foo.config.params.one, 1)
    assert.equal(endpoints.foo.config.params.two, 2)
  })

  context('when a route is executed', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    api.namespace('users').route({
      read: {
        path: '/'
      }
    })

    it ('folds together configuration', function(done) {
      fauxJax.install()

      fauxJax.on('request', function(request) {
        assert.equal(request.requestURL, 'http://another.com/users')
        fauxJax.restore()
        done()
      })

      api.users.read({ baseURL: 'http://another.com' })
    })

  })

  context('when a namespaced route is executed', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    api.resource('users').resource('posts')

    beforeEach(function() {
      fauxJax.install()
    })

    afterEach(function() {
      fauxJax.restore()
    })

    it ('properly builds URLs for namespaces', function(done) {
      fauxJax.on('request', function(request) {
        assert.equal(request.requestURL, 'http://example.com/users/1')
        done()
      })

      api.users.read({ params: { id: 1 }})
    })

    it ('properly builds URLs for deeply nested namespaces', function(done) {
      fauxJax.on('request', function(request) {
        assert.equal(request.requestURL, 'http://example.com/users/1/posts/2')
        done()
      })

      api.users.posts.read({ params: { user_id: 1, id: 2 }})
    })

    it ('does not add additional post parameters', function(done) {
      var api = API({
        baseURL: 'http://example.com'
      })

      var users = api.resource('users')
      var notes = users.resource('notes')

      fauxJax.on('request', function(request) {
        assert.equal('note' in JSON.parse(request.requestBody), false)
        done()
      })

      notes.create({ body: { description: 'hi' }, params: { user_id: 1 }})
    })

  })

})
