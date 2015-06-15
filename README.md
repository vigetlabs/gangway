# gangway

A client-side API abstraction layer

Gangway is our general purpose tool for working with APIs on the
client-side. It is a thin layer on top of `superagent` with specific
opinions related to how we work.

[![Circle CI](https://circleci.com/gh/vigetlabs/gangway.svg?style=svg&circle-token=d7c29c3bd61f3c3d671d1ba02841eb0c174d311a)](https://circleci.com/gh/vigetlabs/gangway)

## Overview

Gangway is a factory function that progressively layers configuration
options for building an AJAX request with `superagent`:

```
let Gangway = require('../src')

let API = Gangway({
  baseURL: 'http://example.com',
  headers: {
    'x-api-key': 'your-token-for-every-request'
  }
})

API.route({
  users: {
    get: {
      method : 'GET',
      path   : '/users/{id}'
    }
  }
})

// this will send a request to GET http://example.com/users/10
API.users.read({ params: { id: '10' } })
```

Now go into further detail. But not too much implementation, there is
a learning section.

## Learning

Are there tutorials? Use this section to guide the reader to where there
hand can be held

## Documentation

### Available options

```
baseURL    : The base URL prepended to all requests
method     : Request method (GET, POST, PUT, PATCH, DELETE, etc...)
onResponse : Run before resolving a request for preprocessing data
params     : Populate bindings in paths and are sent as request bodies
path       : The path fragment of the endpoint, appended to baseURL
type       : Content type, defaults to JSON
```

## Final words

Add a final section that might include any important prior art or
inspiration. If this isn't your thing, maybe a link to Viget Open
Source.
