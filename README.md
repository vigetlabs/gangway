# Gangway

A client-side API abstraction layer.

Gangway is our general purpose tool for working with APIs on the
client-side. It is a thin layer on top of `superagent` with specific
opinions related to how we work.

[![Circle CI](https://circleci.com/gh/vigetlabs/gangway.svg?style=svg&circle-token=d7c29c3bd61f3c3d671d1ba02841eb0c174d311a)](https://circleci.com/gh/vigetlabs/gangway)

## Getting started

Gangway is a factory function that progressively layers configuration
options for building an AJAX request with `superagent`.

The returned value of all endpoints follow the Promise
interface. Invocations of that interface return real Promises. This
means you'll need to include your own polyfill for Promise (depending
on your environment). We recommend
[`then/promise`](https://github.com/then/promise) as it includes
additional methods like `.done()` and `.nodeify()` that improve
interoperability and debugging:

```
require('promise/polyfill')
// Continue with the rest of your code
```

Alternatively, provide `Promise` as a configuration option (see below):

### Create an instance of Gangway

```javascript
var Gangway = require('gangway')

var API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'your-token-for-every-request'
  },
  Promise: require('promise') // Optional, if Promise is not polyfilled
})
```

### Add routes

```javascript
API.route({
    getUser: {
      method : 'GET',
      path   : '/users/{id?}' // ? indicates that the parameter is optional
    }
  }
})
```

`API.getUser()` will now perform a GET request to
`/users/{id}`. The `?` in the path option specifies that it is
optional. This is useful when using the same route for index and show
endpoints for resources.

### Add namespaces

Most APIs break down endpoints into discrete resources. Gangway
provides a `namespace` method for this purpose. All routes will be
prefixed with a provided URL segment:

```javascript
API.namespace('users').route({
    read: {
      method : 'GET',
      path   : '{id?}' // ? indicates that the parameter is optional
    }
  }
})
```

`API.users.read({ params: { id: 2 }})` will perform a GET request to `/users/2`.

### Add routes in bulk with `.resource`

For RESTful resources, adding routes this way can become
tedious. Gangway provides another method for quickly building routes
for RESTful resources:

```javascript
// This is equivalent to creating a create, read, update, and destroy
// route. Options are folded into every route.
API.resource("comments", {})
```

### Sending requests

Assuming the previous steps have been followed, Gangway is ready for use!

```javascript
// This will send a request to GET http://example.com/users
API.users.read()

// This will send a request to GET http://example.com/users/10
API.users.read({ params: { id: '10' } })

// The same is true for routes added via API.resource
API.comments.read({ params: { id: '2' }})
```

### Accessing the original request object

It is some times useful to access the unwrapped superagent request
object. The value returned from endpoints contains a `request`
property that grants access to this instance:

```javascript
let fetch = API.users.read({ params: { id: '10' } })

fetch.request.abort()
```

## Documentation

Checkout the [./docs](./docs) folder and the available options
below. Or consider working through the
[Hello Gangway](./docs/guides/hello-gangway.md) guide.

### Available options

```
baseURL    : The base URL prepended to all requests
body       : The request body
headers    : Request headers,
method     : Request method (GET, POST, PUT, PATCH, DELETE, etc...)
beforeSend : Configure an instance of superagent before the request is sent
onResponse : Run before resolving a request to preprocessing data
onError    : Run before rejecting a request to preprocessing errors
params     : Populate bindings in paths and are sent as request bodies. Defaults to body.
Promise    : The Promise implementation. Defaults to global.Promise.
path       : The path fragment of the endpoint, appended to baseURL
type       : Content type, defaults to JSON
query      : An object of query parameters. Gangway will automatically stringify this into the URL.
timeout    : Request timeout in milliseconds. Defaults to 15 seconds.
```

***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
