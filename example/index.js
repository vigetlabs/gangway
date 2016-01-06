var Gangway = require('../src')

var API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'asdf'
  }
})

API.resource("users")

API.route({
  comments: {
    method: "GET",
    path: "/comments"
  }
})

module.exports = API
