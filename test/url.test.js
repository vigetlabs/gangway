var url = require('../src/url')
var assert = require('assert')

describe('url', function() {

  it ('trims base url right-hand slashes', function() {
    assert.equal(url('http://foobar.com/', 'path'), 'http://foobar.com/path')
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

  it ('properly falsy handles numbers', function() {
    var location = url('http://foobar.com', '/user/{id}', { id: 0 })
    assert.equal(location, 'http://foobar.com/user/0')
  })

  context('when resolving URL segments', function () {
    var samples = [
      { base: '//foobar.com', path: '/path', expected: '//foobar.com/path' },
      { base: 'http://foobar.com/fiz', path: '/path', expected: 'http://foobar.com/path' },
      { base: 'http://foobar.biz.co/fiz', path: '/path', expected: 'http://foobar.biz.co/path' },
      { base: 'http://foobar.biz.co/users', path: 'posts', expected: 'http://foobar.biz.co/users/posts' },
      { base: '/fiz', path: '/path', expected: '/path' },
      { base: '/foo', path: 'bar', expected: '/foo/bar' }
    ]

    samples.forEach(function (sample) {

      context('for: ' + sample.base + ' + ' + sample.path, function () {
        it ('correctly resolves the url', function() {
          assert.equal(url(sample.base, sample.path), sample.expected)
        })
      })
    })
  })

})
