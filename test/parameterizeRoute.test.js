var parameterizeRoute = require('../src/parameterizeRoute')
var assert = require('assert')

describe('parameterizeRoute', function() {

  it ('replaces parameters', function() {
    assert.equal(parameterizeRoute('{foo}', { foo: 'bar' }), 'bar')
  })

  it ('throws an error if a parameter is not defined', function() {
    try {
      parameterizeRoute('user/{foo}')
    } catch (error) {
      assert(error.message.search('foo') >= 0)
      assert(error.message.search('user/') >= 0)
    }
  })

  it ('throws an error if an unsupported option is given', function() {
    try {
      parameterizeRoute('user/{foo*}')
    } catch (error) {
      assert(error.message.match('foo*'))
    }
  })

  it ('does not throw an error on optional bindings', function() {
    assert.equal(parameterizeRoute('path/{foo?}'), 'path/')
  })

})
