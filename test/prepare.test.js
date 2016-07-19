var prepare = require('../src/prepare')
var assert  = require('assert')

describe('Prepare', function() {

  it ('handles undefined values', function() {
    var answer = prepare({}, undefined, { fiz: 'buzz'})
    assert.equal(answer.fiz, 'buzz')
  })

  it ('does not set the body to an object if not given one', function() {
    var answer = prepare({}, undefined, { fiz: 'buzz'})
    assert.equal(answer.body, undefined)
  })

})
