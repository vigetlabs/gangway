# Changelog

## 3.0.0
- Removes `body` from the default configuration object, and always directly 
  sends whatever body is sent. Previously, body was expected to always be 
  an object, and could be merged with a default. This was problematic since
  body can be other things, such as `FormData`.
- Removes `type` from the default configuration object. This allows
  superagent to intelligently determine a default type when none provided

## 2.2.0

- Gangway will not send a body unless it is specified. Before this
  version, it would default to an empty object.

## 2.1.0

- Upgrade superagent to 1.8.x
- Add `buildQuery` option to define custom query string behavior

## 2.0.0

- Endpoint invocations now return a promise-like interface with
  `then`, `catch`, and `done` methods. `then` and `catch` return true
  promises. The intention is to allow for access to the underlying
  superagent request while still exposing promise functionality.
- Promises are not included by default. If not polyfilled,
  use the `Promise` option to provide the Promise implementation to
  use for Gangway.
- `route` now operates one step shallower. See README for usage.
- routes now respect relative URLs. Absolute urls will operate from the
  base path.
- Added a request timeout option. This option defaults to 15 seconds.

### Upgrading

If you are upgrading from 1.0, there are a couple of necessary
changes:

#### Promises

If a global Promise object is not found, Gangway will throw an
error. To eliminate this error, provide a Promise library to Gangway:

```javascript
var Promise = require('promise')

Gangway({
  Promise: Promise
})
```

#### Routes

The two-level approach to declaring routes has been removed. The
following patterns should be switched out:

```javascript
// OLD
API.route({
    users: {
        get: {
            path: '/users'
        }
    }
})

// NEW (correct)
API.namespace('users').route{
    get: {
        path:'/users'
    }
}}
```

#### Relative routes

Routes without a `/` at the beginning will resolve to their
namespace. Check to ensure that your paths are resolving correctly for
your endpoints if you use absolute paths.

## 1.4.0

- Added `Accept: "application/json" default header
- Internal change: remove dependency on inflection library.

## 1.3.1

- Fixed critical issue with nested resources where their paths failed
  to properly construct.

## 1.3.0 (Deprecated, see 1.3.1)

### What's new

- The `baseURL` configuration option now defaults to `/`.
- The `baseURL` configuration option is no longer a required option.
- `::resource` returns a namespaced version of the API.
- `::resource` accepts function as a third argument. This function is
  invoked with a namespaced version of the Gangway instance that
  operates under the provided key.

This version adds namespacing to Gangway. The following is now
possible:

```javascript
var API = Gangway()

// This will create CRUD routes for `/users` and `/users/{user_id}/articles`
API.resource('users', {}, function (users) {
    users.resource('articles')
})
```

### Upgrading

Those chaining off of `::resource` should update their code to reflect
the change in the returned value. This returned value is a namespaced
version of the Gangway instance that operates on the key given as the
first argument.

#### Old

```javascript
var API = Gangway()

API.resource('users')
   .resource('posts')
```

#### New

```javascript
var API = Gangway()

API.resource('users')
API.resource('posts')
```

## 1.2.0

- Upgraded superagent to ~1.7.

## 1.1.2

- Resource CREATE operation should post to resource root path

## 1.1.1

- Resource READ operation should use optional id parameter

## 1.1.0

- Add resource API as shorthand for RESTful resources

## 1.0.1

- Fix bug where undefined config would throw off options preparation

## 1.0.0

- `headers`, `query`, `body`, and `params` options are now merged
  together.

## 0.13.0

- Internal change to eliminate the dependency of `Function.prototype.bind`.

## 0.12.0

- Add `onError` preprocessor option

## 0.11.0

- Use `body` option for request body, not `params`

## 0.10.0

- `mock` can now be a function

## 0.9.0

- Individual routes now contain configuration settings under `config`,
  similar to API.config.

## 0.8.0

- Path template parsing now uses same logic as Hapi (sans wildcard routes)

## 0.7.0

### Breaking Changes

- Optional path parameters were improperly implemented with `*`. This is been corrected to `?`. For example: `users/{id*}` is now `users/{id?`.

## 0.6.0

### New Features

- Added `beforeSend` option

### Bug Fixes

- Properly set the configuration layering order to `route`, `api`, then `request`

## 0.5.0

### New Features

- Added optional parameters. For example: '/users/{id*}'

## 0.4.0

### Breaking Changes

- `params` option no longer represents body, however defaults to it

## 0.3.0

### Breaking Changes

- Renamed `body` option to `params`

## 0.2.0

### New Features

- added onResponse configuration setting to parse results

## 0.1.0

### New Features

- Added parameter injection to urls similar to how Hapi matches routes
- Added Promise library that includes nodeify
