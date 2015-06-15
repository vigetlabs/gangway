let API = require('../api')

describe('API', function() {
  let base = 'http://foo.com'

  it ('stringifies to a given base URL', function() {
    API(base).toString().should.equal(base)
  })

  it ('maps over a list of endpoints', function() {
    let endpoints = API(base, {
      foo: {
        bar: {
          get: '/bip'
        }
      }
    })

    endpoints.foo.should.have.property('bar')
  })

})
