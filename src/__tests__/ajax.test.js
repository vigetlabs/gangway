let ajax = require('../ajax')

describe('ajax', function() {

  it ('can send requests', function(done) {
    ajax(window.location.origin, {
      path: '/base/test/response.json'
    }).then(function(body) {
      body.name.should.equal('Gangway')
      done()
    }, done)
  })

  it ('can be mocked out', function(done) {
    ajax('http://fizbuzz', { mock: 'fiz' }).then(function(body) {
      body.should.equal('fiz')
      done()
    }).catch(done)
  })

  it ('can override config', function(done) {
    ajax('http://fizbuzz', {}, { mock: 'fiz' }).then(function(body) {
      body.should.equal('fiz')
      done()
    }).catch(done)
  })

  it ('can handle errors', function(done) {
    ajax(window.location.origin, { path: '/asdf' }).catch(function(error) {
      error.status.should.equal(404)
      done()
    }).catch(done)
  })

  it ('can be converted into a node callback', function(done) {
    ajax(window.location.origin, {
      path: '/base/test/response.json'
    }).nodeify(done)
  })
})
