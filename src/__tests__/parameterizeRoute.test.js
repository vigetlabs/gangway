let parameterizeRoute = require('../parameterizeRoute')

describe('parameterizeRoute', function() {

  it ('replaces parameters', function() {
    parameterizeRoute('{foo}', { foo: 'bar' }).should.equal('bar')
  })

  it ('throws an error if a parameter is not defined', function() {
    try {
      parameterizeRoute('user/{foo}')
    } catch(error) {
      error.message.should.include('foo')
      error.message.should.include('user/')
    }
  })

  it ('throws an error if an unsupported option is given', function() {
    try {
      parameterizeRoute('user/{foo*}')
    } catch(error) {
      error.message.should.include('*')
      error.message.should.include('user/{foo*}')
    }
  })

  it ('does not throw an error on optional bindings', function() {
    parameterizeRoute('path/{foo?}').should.equal('path/')
  })

})
