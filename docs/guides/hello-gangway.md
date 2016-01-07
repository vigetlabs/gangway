# Hello Gangway

In this guide we'll go over the basic usage of Gangway. Fortunately
there isn't _too_ much to cover, so hopefully we can get you on your
way quickly.

## Creating a Gangway

It is important to think of Gangway as a cascade of configuration
options. This begins when you call Gangway:

```javascript
var API = Gangway({
  baseURL : 'http://example.com'
})
```

This produces the first layer of configuration: the API config. This
step provides an opportunity to provide default configuration settings
for all endpoints.

Speaking of which, endpoints may be created using the `route` method:

```javascript
API.route({
  users: {
    read: {
      method : 'GET',
      path   : 'users/{id?}'
    }
  }
})
```

Executing this code will produce namespaces on `API` for the `users`
resource. This is the second layer of configuration options: the route
layer. Options given to routes will override the general options
specified to the API.

You can now perform a `GET` request to `http://example.com/users`
with:

```javascript
API.users.read().then(function(data) {
  console.log(data)
})
```

In the code above, a request is sent out to fetch information. Gangway
returns a [Promise](https://www.promisejs.org/) to represent the
request. When this promise resolves, it will pass the body of the
request to `.then`.

## Individual requests

The example in the previous section had a path property of
`users/{id?}`. Gangway uses the
[route pattern matching from HapiJS](http://hapijs.com/tutorials/routing)
to parse paths. Whenever a `params` option is provided, it will use
that object to fill in "templated" bindings such as `{id?}`

To complete these paths, include a `params` option when you make an API call:

```javascript
API.users.read({ params: { id: '10' }})
// request will be sent to http://example.com/users/10
```

This demonstrates the final configuration layer: an individual
request. Before the request to `users` is sent, it will
layer configuration options in the following order: `API`, `route`,
`request`.

As a final note, the `?` in `{id?}` indicates that the parameter is
optional. If params are not provided, it will set the path to
`/users`.

## The resource method.

For RESTful API endpoints, manually producing a route for every action
is tedious. In light of this, Gangway provides an additional
`resource` method for quickly building routes for RESTful resources:

```javascript
API.resource('users')
```

This is functionally equivalent to:

```javascript
API.route({

  users: {
    create: {
      method: 'POST',
      path: 'users/{id}'
    },

    read: {
      method: 'GET',
      path: 'users/{id?}'
    },

    update: {
      method: 'PATCH',
      path: 'users/{id}'
    },

    destroy: {
      method: 'DELETE',
      path: 'users/{id}'
    }

  }
})
```

## Wrapping up

This guide focused entirely on the act of configuring Gangway. From
here, you could learn about how to work with requests sent by Gangway
using Promises. Checkout [Working with Promises](./promises.md) to
learn more about the particulars of Promises in Gangway.
