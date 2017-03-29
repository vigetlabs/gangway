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

So what is an endpoint? An endpoint describes a request to an API for
information. In Gangway, they are created with `route`:

```javascript
API.route({
  readUsers: {
    method : 'GET',
    path   : 'users/{id?}'
  }
})
```

In the code above, `route` will assign a `readUser` method to `API`
that performs a GET request to `/users/{id}`. The `?` in the path
indicates that the id parameter is optional.

### Namespaces

In the previous example, we created an endpoint directly on
`API`. However RESTful APIs are organized into discrete resources. In
order to help you stay organized, Gangway provides a `namespace`
method that will make all subsequent method calls operate within a
given path:

```javascript
var users = API.namespace('users')

users.route({
  read: {
    method : 'GET',
    path   : '{id?}'
  }
})
```

This is _nearly_ the same as using `API.route`, however there are a
couple of differences. First, we don't need to include `users` in the
path, because the route is already working from the `users`
namespace. Second, the endpoint is added at `API.users` instead of
simply being available at `API`.

## Individual requests

The examples in the previous sections had a path property of
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

`route` and `namespace` reduce a lot of boilerplate, however even this
can get tedious when mapping actions for every resource of a RESTful
API. To account for this, Gangway provides a `resource` method. This
method helps you to quickly building endpoints for RESTful resources:

```javascript
API.resource('users')
```

This is functionally equivalent to:

```javascript
API.namespace('users').route({
  create: {
    method: 'POST',
    path: '{id}'
  },

  read: {
    method: 'GET',
    path: '{id?}'
  },

  update: {
    method: 'PATCH',
    path: '{id}'
  },

  destroy: {
    method: 'DELETE',
    path: '{id}'
  }
})
```

## Wrapping up

This guide focused entirely on the act of configuring Gangway. From
here, you could learn about how to work with requests sent by Gangway
using Promises. Checkout [Working with Promises](./promises.md) to
learn more about the particulars of Promises in Gangway.
