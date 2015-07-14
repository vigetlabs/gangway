let ajax = require('../index')
let superagent = require('superagent')

describe('ajax', function() {
  let baseURL = window.location.origin

  it ('can send requests', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).done(function(body) {
      body.name.should.equal('Gangway')
      done()
    })
  })

  it ('can be mocked out', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).done(function(body) {
      body.should.equal('fiz')
      done()
    })
  })

  it ('the mocked value can be a function', function(done) {
    let options = {
      baseURL : 'http://fizbuzz',
      mock : function(config) {
        config.should.include(options)
        return 'yes'
      }
    }

    ajax(options).done(function(data) {
      data.should.equal('yes')
      done()
    })
  })

  it ('can override config', function(done) {
    ajax({
      baseURL : 'http://fizbuzz',
      mock    : 'fiz'
    }).done(function(body) {
      body.should.equal('fiz')
      done()
    })
  })

  it ('can handle errors', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/asdf'
    }).done(null, function(error) {
      error.status.should.equal(404)
      done()
    })
  })

  it ('can operate as a promise a response', function(done) {
    ajax({
      baseURL : baseURL,
      path    : '/base/test/response.json'
    }).done(function(data) {
      data.name.should.equal('Gangway')
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
      onResponse(response) {
        response.should.be.instanceOf(superagent.Response)
      }
    }).nodeify(done)
  })

  it ('can parse an error', function(done) {
    ajax({
      baseURL: baseURL,
      path: '/base/test/bad.json',
      onError(error) {
        error.should.be.instanceOf(Error)
        error.status.should.equal(404)
      }
    }).nodeify(done)
  })

  it ('can preprocess a request', function(done) {
    ajax({
      mock: {},
      beforeSend(message) {
        message.should.be.instanceOf(superagent.Request)
      }
    }).nodeify(done)
  })
})
