let resolve = require('../resolve')

describe('AJAX resolve', function() {

  it ('does not add an empty query string', function() {
    resolve('/path').should.equal('/path')
    resolve('/path', {}).should.equal('/path')
  })

  it ('adds a query string', function() {
    resolve('/path', { key: 'value' }).should.equal('/path?key=value')
  })
})
