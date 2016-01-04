var url = require('../src/url')
var assert = require('assert')

describe('url', function() {

  it ('trims base url right-hand slashes', function() {
    assert.equal(url('http://foobar.com/', 'path'), 'http://foobar.com/path')
  })

  it ('trims path url left-handslashes', function() {
    assert.equal(url('http://foobar.com', '/path'), 'http://foobar.com/path')
  })

  it ('handles both base and path urls with slashes', function() {
    assert.equal(url('http://foobar.com', 'path'), 'http://foobar.com/path')
  })

  it ('replaces templated url params', function() {
    var location = url('http://foobar.com', '/user/{id}', { id: 10 })
    assert.equal(location, 'http://foobar.com/user/10')
  })

  it ('cleans up optional templated url params', function() {
    var location = url('http://foobar.com', '/user/{id?}')
    assert.equal(location, 'http://foobar.com/user')
  })
})
