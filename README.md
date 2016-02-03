# Gangway

A client-side API abstraction layer.

Gangway is our general purpose tool for working with APIs on the
client-side. It is a thin layer on top of `superagent` with specific
opinions related to how we work.

[![Circle CI](https://circleci.com/gh/vigetlabs/gangway.svg?style=svg&circle-token=d7c29c3bd61f3c3d671d1ba02841eb0c174d311a)](https://circleci.com/gh/vigetlabs/gangway)

## Usage

Gangway is a factory function that progressively layers configuration
options for building an AJAX request with `superagent`.

### Create an instance of Gangway

```javascript
var Gangway = require('gangway')

var API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'your-token-for-every-request'
  }
})
```

### Add routes

```javascript
API.route({
  users: {
    read: {
      method : 'GET',
      path   : '/users/{id?}' // ? indicates that the parameter is optional
    }
  }
})
```

`API.users.read()` will now perform a GET request to
`/users/{id}`. The `?` in the path option specifies that it is
optional. This is useful when using the same route for index and show
endpoints for resources.

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
path       : The path fragment of the endpoint, appended to baseURL
type       : Content type, defaults to JSON
query      : An object of query parameters. Gangway will automatically stringify this into the URL.
```

***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
