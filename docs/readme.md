# Gangway Documentation

## Guides

1. [Hello, Gangway](guides/hello-gangway.md)
2. [Working with Promises](guides/promises.md)

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
