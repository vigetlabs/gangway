var remap = require('../src/remap')
var assert = require('assert')

describe('remap()', function() {

  it ('maps over an object, transforming values', function() {
    var transformed = remap({ foo: 'bar' }, function(value) {
      return value.toUpperCase()
    })

    assert.equal(transformed.foo, 'BAR')
  })

  it ('can map over an existing object', function() {
    var target = {}

    var transformed = remap({ eggs: 12 }, function addByOne (value) {
      return value + 1
    }, target)

    assert.equal(target.eggs, 13)
  })

  it ('does not modify the original object', function() {
    var products = { widgets: 10 }

    remap(products, function addByOne (value) {
      return value + 1
    })

    assert.equal(products.widgets, 10)
  })

})
