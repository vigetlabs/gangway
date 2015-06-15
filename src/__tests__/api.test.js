let API = require('../api')

describe('API', function() {
  let baseURL = 'http://foo.com'

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
    API({ baseURL }).toString().should.equal(baseURL)
  })

  it ('maps over a list of endpoints', function() {
    let endpoints = API({ baseURL }, {
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    endpoints.foo.should.have.property('bar')
  })

  it ('can add new endpoints', function() {
    let endpoints = API({ baseURL })

    endpoints.route({
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    endpoints.foo.should.have.property('bar')
  })

})
