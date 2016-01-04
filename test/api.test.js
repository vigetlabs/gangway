var API = require('../src/api')
var assert = require('assert')

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

})
