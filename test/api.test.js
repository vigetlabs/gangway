var API = require('../src/api')
var assert = require('assert')
var fauxJax = require('faux-jax')

describe('API', function() {
  var baseURL = 'http://foo.com'

  it ('throws an error if not given a config', function(done) {
    try {
      API()
    } catch(error) {
      assert(error instanceof TypeError)
      done()
    }
  })

  it ('throws an error if not given a baseURL', function(done) {
    try {
      API({})
    } catch(error) {
      assert(error instanceof TypeError)
      done()
    }
  })

  it ('stringifies to a given baseURL', function() {
    assert.equal(API({ baseURL: baseURL }).toString(), baseURL)
  })

  it ('maps over a list of endpoints', function() {
    var endpoints = API({ baseURL: baseURL }, {
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    assert('bar' in endpoints.foo)
  })

  it ('can add new endpoints', function() {
    var endpoints = API({ baseURL: baseURL })

    endpoints.route({
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    assert('bar' in endpoints.foo)
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
        bar: {
          get: '/bip',
          headers: {
            'two': 2
          }
        }
      }
    })

    assert.equal(endpoints.foo.bar.config.headers.one, 1)
    assert.equal(endpoints.foo.bar.config.headers.two, 2)
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
        bar: {
          get: '/bip',
          query: {
            'two': 2
          }
        }
      }
    })

    assert.equal(endpoints.foo.bar.config.query.one, 1)
    assert.equal(endpoints.foo.bar.config.query.two, 2)
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
        bar: {
          get: '/bip',
          body: {
            'two': 2
          }
        }
      }
    })

    assert.equal(endpoints.foo.bar.config.body.one, 1)
    assert.equal(endpoints.foo.bar.config.body.two, 2)
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
        bar: {
          get: '/bip',
          params: {
            'two': 2
          }
        }
      }
    })

    assert.equal(endpoints.foo.bar.config.params.one, 1)
    assert.equal(endpoints.foo.bar.config.params.two, 2)
  })

  context('when a route is executed', function() {
    var api = API({
      description: 'My API',
      baseURL: 'http://example.com'
    })

    api.route({
      users: {
        read: {
          path: 'users'
        }
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
})
