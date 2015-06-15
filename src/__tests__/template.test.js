let template = require('../template')

describe('template', function() {

  it ('replaces parameters', function() {
    template('{ foo }', { foo: 'bar' }).should.equal('bar')
  })

  it ('throws an error if a parameter is not defined', function() {
    try {
      template('{ foo }')
    } catch(error) {
      error.message.should.include('foo')
    }
  })

  it ('does not throw an error on optional bindings', function() {
    template('path/{foo*}').should.equal('path/')
  })

})
