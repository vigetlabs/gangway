var API = require('../src/api')
var assert = require('assert')

describe('Namespace', function() {

  it ('can namespace a route', function() {
    var api    = new API()
    var parent = api.namespace('parent')
    var child  = parent.namespace('child')

    assert.deepEqual(child.segments, [ 'parent', 'child' ])
  })

  it ('does not clobber namespaces', function() {
    var api = new API()

    var read = api.namespace('users').route({
      read: {}
    })

    var users = api.resource('users')

    assert.equal(api.users.read, users.read, read)
  })

  it ('toString reflects namespace segments', function() {
    var api = new API()
    var foo = api.namespace('foo')
    var bar = foo.namespace('bar')

    assert.equal(bar.toString(), '/foo/{foo_id}/bar')
  })

  it ('respects baseURLs with paths', function() {
    var api = new API({
      baseURL: 'http://example.com/api'
    })
    var foo = api.namespace('foo')
    var bar = foo.namespace('bar')

    assert.equal(bar.toString(), 'http://example.com/api/foo/{foo_id}/bar')
  })

  it ('toString singularizes parameters segments', function() {
    var api = new API()
    var users = api.namespace('users')
    var posts = users.namespace('posts')

    assert.equal(posts.toString(), '/users/{user_id}/posts')
  })

  context('when a namespace is created with options', function() {
    var api = new API()
    var users = api.namespace('users', { query: { test: true }})

    it ('sends those default options to child namespaces', function() {
      var posts = users.namespace('posts')
      assert.equal(posts.config.query.test, true)
    })

    it ('sends those default options to routes', function() {
      var posts = users.namespace('posts').route({
        create: {
          method: 'POST'
        }
      })
      assert.equal(posts.create.config.query.test, true)
    })

    it ('the basePath option is overrideable', function() {
      var posts = users.namespace('posts', { basePath: 'test' }).route({
        create: {
          method: 'POST'
        }
      })
      assert.equal(posts.create.toString(), '/test')
    })
  })

  context('when a resource is created', function() {
    var api   = new API()
    var users = api.resource('users')

    context('and a resource is generated', function() {
      var notes = users.resource('notes')

      it ('adds the resource to the parent namespace', function() {
        assert.equal(api.users.notes.read, users.notes.read)
      })
    })
  })

})
