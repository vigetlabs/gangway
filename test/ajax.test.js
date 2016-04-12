var ajax = require('../src/ajax')
var superagent = require('superagent')
var fauxJax = require('faux-jax')
var assert = require('assert')

describe('ajax', function() {
  var baseURL = 'http://localhost:4000/'

  before(function() {
    fauxJax.install()
    fauxJax.on('request', function (request) {
      if (request.requestURL.match(/response\.json/)) {
        setTimeout(function() {
          request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ "name" : "Gangway" }))
        }, 10)
      } else {
        request.respond(404, { 'Content-Type': 'text/plain' }, "Not found")
      }
    })
  })

  after(function() {
    fauxJax.restore()
  })

  it ('can send requests', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).then(function(body) {
      assert.equal(body.name, 'Gangway')
      done()
    }).catch(done)
  })

  it ('automatically adds an Accept JSON header', function (done) {
    ajax({
      beforeSend: function (ajax) {
        // NOTE: The browser sets this header with a capital "a", however it
        // is lower case within Node
        assert.equal(ajax.header.Accept || ajax.header.accept, 'application/json')
        done()
      }
    })
  })

  it ('can be mocked out', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).then(function(body) {
      assert.equal(body, 'fiz')
      done()
    }).catch(done)
  })

  it ('the mocked value can be a function', function(done) {
    var options = {
      baseURL : 'http://fizbuzz',
      mock : function(config) {
        assert.equal(config.baseURL, options.baseURL)
        return 'yes'
      }
    }

    ajax(options).then(function(data) {
      assert.equal(data, 'yes')
      done()
    }).catch(done)
  })

  it ('can override config', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).then(function(body) {
      assert.equal(body, 'fiz')
      done()
    }).catch(done)
  })

  it ('can handle errors', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/asdf'
    }).then(null, function(error) {
      assert.equal(error.status, 404)
      done()
    }).catch(done)
  })

  it ('can operate as a promise a response', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).then(function(data) {
      assert.equal(data.name, 'Gangway')
      done()
    }).catch(done)
  })

  it ('can convert bindings using params', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/{path}.json',
      params  : { path: 'response'}
    }).then(function () { done() }, done)
  })

  it ('falls back on the `body` param if no params are given', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/{path}.json',
      params  : { path: 'response' }
    }).then(function () { done() }, done)
  })

  it ('can be converted into a node callback', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).then(function () { done() }, done)
  })

  it ('can parse a response', function(done) {
    ajax({
      baseURL: baseURL,
      path: '/base/test/response.json',
      onResponse: function (response) {
        assert(response instanceof superagent.Response)
      }
    }).then(function () { done() }, done)
  })

  it ('can parse an error', function(done) {
    ajax({
      baseURL: baseURL,
      path: '/base/test/bad.json',
      onError: function (error) {
        assert(error instanceof Error)
        assert.equal(error.status, 404)
      }
    }).then(function () { done() }, done)
  })

  it ('can preprocess a request', function(done) {
    ajax({
      mock: {},
      beforeSend: function (message) {
        assert(message instanceof superagent.Request)
      }
    }).then(function () { done() }, done)
  })

  it ('accepts a custom Promise implimentation option', function(done) {
    ajax({
      Promise: {
        resolve: function (value) {
          assert.equal(value, 'test')
          done()
        }
      },
      mock: 'test'
    })
  })

  it ('throws an error when promise is not defined', function () {
    assert.throws(function () {
      return ajax({ Promise: undefined })
    }, /Please include a Promise polyfill/)
  })

  it ('can cancel requests', function (done) {
    var message = ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    })

    function errorOut (error, callback) {
      done(new Error('Request should not have completed'))
    }

    message.then(errorOut, errorOut).catch(errorOut)

    message.request.abort()

    setTimeout(function() {
      done()
    }, 500)
  })
})
