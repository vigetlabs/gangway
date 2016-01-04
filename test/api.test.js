var API = require('../src/api')

describe('API', function() {
  var baseURL = 'http://foo.com'

  it ('throws an error if not given a config', function(done) {
    try {
      API()
    } catch(error) {
      error.should.be.instanceOf(TypeError)
      done()
    }
  })

  it ('throws an error if not given a baseURL', function(done) {
    try {
      API({})
    } catch(error) {
      error.should.be.instanceOf(TypeError)
      done()
    }
  })

  it ('stringifies to a given baseURL', function() {
    API({ baseURL: baseURL }).toString().should.equal(baseURL)
  })

  it ('maps over a list of endpoints', function() {
    var endpoints = API({ baseURL: baseURL }, {
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    endpoints.foo.should.have.property('bar')
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

    endpoints.foo.should.have.property('bar')
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

    endpoints.foo.bar.config.headers.should.have.property('one', 1)
    endpoints.foo.bar.config.headers.should.have.property('two', 2)
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

    endpoints.foo.bar.config.query.should.have.property('one', 1)
    endpoints.foo.bar.config.query.should.have.property('two', 2)
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

    endpoints.foo.bar.config.body.should.have.property('one', 1)
    endpoints.foo.bar.config.body.should.have.property('two', 2)
  })

})
