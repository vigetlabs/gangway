# Gangway Documentation

1. [Guides](#guides)
2. [API](#api)

## Guides

1. [Hello, Gangway](guides/hello-gangway.md)
2. [Working with Promises](guides/promises.md)

## Recipes

1. [Aborting requests](recipes/aborting-requests.md)
2. [Progress](recipes/progress.md)

## API

### Available options

```
baseURL    : The base URL prepended to all requests
body       : The request body
headers    : Request headers.
method     : Request method (GET, POST, PUT, PATCH, DELETE, etc...)
beforeSend : Configure an instance of superagent before the request is sent
onResponse : Run before resolving a request for preprocessing data
params     : Populate bindings in paths and are sent as request bodies. Defaults to body.
path       : The path fragment of the endpoint, appended to baseURL
type       : Content type, defaults to JSON
query      : An object of query parameters. Gangway will automatically stringify this into the URL.
```

### `.route(routes)`

New endpoints can be added to Gangway via `.route`:

```javascript
var Gangway = require('gangway')

var API = Gangway()

API.route({
    getUsers: {
        path: '/users/{:id?}'
    },
    getComments: {
        path: '/comments/{:id?}'
    }
})
```

This will create functions to read users and comments at
`API.users.read` and `API.comments.read`.

### `.resource(name, options, nest)`

`.resource` is used to create endpoints in bulk. For example:

```javascript
var Gangway = require('gangway')

var API = Gangway()

API.resource('users')
```

This is equivalent to executing `route` to create a `create`, `read`,
`update`, and `delete` route under `users`.

#### Extending default options

Any options you provide as the second argument will extend the default
values resource pumps in as options for these routes. For example:

```javascript
var Gangway = require('gangway')

var API = Gangway()

API.resource('users', {
    query: {
        comments: true
    }
})
```

Would add a `?comments=true` query string to the end of every route's
URL.

#### Working under a namespace

Finally, the last argument of `resource` is a function. Gangway will
invoke this function with a version of the API that operates under the
given namespace:

```javascript
var Gangway = require('gangway')

var API = Gangway()

API.resource('users', {}, function (users) {
    users.resource('articles')
})
```

In the example above, the API will contain standard CRUD routes for
users _and_ articles under `/users/{user_id}/articles`.

### `.namespace(resourceName)`

Namespace is used by `.resource` to create a version of the API that
operates at a given path:

```javascript
var Gangway = require('gangway')

var API = Gangway()

var users = API.namespace('users')
```

All invocations under users will operate within the users
namespace. This means `users.route({})` will set all URL paths to
`/users/{user_id}/{providedPath}`.
