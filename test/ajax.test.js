var ajax = require('../src/ajax')
var superagent = require('superagent')
var fauxJax = require('faux-jax')
var assert = require('assert')

describe('ajax', function() {
  var baseURL = 'http://localhost:4000/'

  before(function() {
    fauxJax.install()
    fauxJax.on('request', function(request) {
      if (request.requestURL.match(/response\.json/)) {
        request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ "name" : "Gangway" }))
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
    }).done(function(body) {
      assert.equal(body.name, 'Gangway')
      done()
    })
  })

  it ('automatically adds an Accept JSON header', function (done) {
    ajax({
      beforeSend(ajax) {
        assert.equal(ajax.header.accept, 'application/json')
        done()
      }
    })
  })

  it ('can be mocked out', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).done(function(body) {
      assert.equal(body, 'fiz')
      done()
    })
  })

  it ('the mocked value can be a function', function(done) {
    var options = {
      baseURL : 'http://fizbuzz',
      mock : function(config) {
        assert.equal(config.baseURL, options.baseURL)
        return 'yes'
      }
    }

    ajax(options).done(function(data) {
      assert.equal(data, 'yes')
      done()
    })
  })

  it ('can override config', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).done(function(body) {
      assert.equal(body, 'fiz')
      done()
    })
  })

  it ('can handle errors', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/asdf'
    }).done(null, function(error) {
      assert.equal(error.status, 404)
      done()
    })
  })

  it ('can operate as a promise a response', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).done(function(data) {
      assert.equal(data.name, 'Gangway')
      done()
    })
  })

  it ('can convert bindings using params', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/{path}.json',
      params  : { path: 'response'}
    }).nodeify(done)
  })

  it ('falls back on the `body` param if no params are given', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/{path}.json',
      params  : { path: 'response' }
    }).nodeify(done)
  })

  it ('can be converted into a node callback', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).nodeify(done)
  })

  it ('can parse a response', function(done) {
    ajax({
      baseURL: baseURL,
      path: '/base/test/response.json',
      onResponse: function (response) {
        assert(response instanceof superagent.Response)
      }
    }).nodeify(done)
  })

  it ('can parse an error', function(done) {
    ajax({
      baseURL: baseURL,
      path: '/base/test/bad.json',
      onError: function (error) {
        assert(error instanceof Error)
        assert.equal(error.status, 404)
      }
    }).nodeify(done)
  })

  it ('can preprocess a request', function(done) {
    ajax({
      mock: {},
      beforeSend: function (message) {
        assert(message instanceof superagent.Request)
      }
    }).nodeify(done)
  })
})
