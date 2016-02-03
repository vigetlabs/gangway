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

    api.route({
      users: {
        read: {}
      }
    })

    var users = api.namespace('users')

    assert('read' in api.users)
  })

  it ('toString reflects namespace segments', function() {
    var api = new API()
    var foo = api.namespace('foo')
    var bar = foo.namespace('bar')

    assert.equal(bar.toString(), '/foo/{foo_id}/bar')
  })

  it ('toString singularizes parameters segments', function() {
    var api = new API()
    var users = api.namespace('users')
    var posts = users.namespace('posts')

    assert.equal(posts.toString(), '/users/{user_id}/posts')
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
