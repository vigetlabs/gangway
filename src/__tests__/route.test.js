let API   = require('../api')
let route = require('../route')

describe('route', function() {
  it ('can handle empty routes', function() {
    route(API({ baseURL: '' }))
  })
})
