var prepare = require('../src/prepare')
var assert  = require('assert')

describe('Prepare', function() {

  it ('handles undefined values', function() {
    var answer = prepare({}, undefined, { fiz: 'buzz'})
    assert.equal(answer.fiz, 'buzz')
  })

})
