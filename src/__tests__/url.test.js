let url = require('../url')

describe('url', function() {

  it ('trims base url right-hand slashes', function() {
    url('http://foobar.com/', 'path').should.equal('http://foobar.com/path')
  })

  it ('trims path url left-handslashes', function() {
    url('http://foobar.com', '/path').should.equal('http://foobar.com/path')
  })

  it ('handles both base and path urls with slashes', function() {
    url('http://foobar.com', 'path').should.equal('http://foobar.com/path')
  })
})
