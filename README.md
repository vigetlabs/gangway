# Gangway

A client-side API abstraction layer

Gangway is our general purpose tool for working with APIs on the
client-side. It is a thin layer on top of `superagent` with specific
opinions related to how we work.

[![Circle CI](https://circleci.com/gh/vigetlabs/gangway.svg?style=svg&circle-token=d7c29c3bd61f3c3d671d1ba02841eb0c174d311a)](https://circleci.com/gh/vigetlabs/gangway)

## Overview

Gangway is a factory function that progressively layers configuration
options for building an AJAX request with `superagent`:

```javascript
let Gangway = require('../src')

let API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'your-token-for-every-request'
  }
})

API.route({
  users: {
    read: {
      method : 'GET',
      path   : '/users/{id?}' // ? indicates that the parameter is optional
    }
  }
})

// this will send a request to GET http://example.com/users
API.users.read()

// this will send a request to GET http://example.com/users/10
API.users.read({ params: { id: '10' } })
```

## Documentation

Documentation is a work in progress, however checkout the ./docs
folder for guides and information about the API (as it is completed).

### Available options

```
baseURL    : The base URL prepended to all requests
body       : The request body
method     : Request method (GET, POST, PUT, PATCH, DELETE, etc...)
beforeSend : Configure an instance of superagent before the request is sent
onResponse : Run before resolving a request to preprocessing data
onError    : Run before rejecting a request to preprocessing errors
params     : Populate bindings in paths and are sent as request bodies. Defaults to body.
path       : The path fragment of the endpoint, appended to baseURL
type       : Content type, defaults to JSON
```
