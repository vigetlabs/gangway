# Working with Promises in Gangway

1. [Overview](#overview)
2. [Promises in Gangway](#promises-in-gangway)

## Overview

> The core idea behind promises is that a promise represents the
> result of an asynchronous operation. A promise is one of three
> different states: pending, fulfilled, or rejected.
>
> [What is a promise?](https://www.promisejs.org#definition)

For all endpoints created by Gangway, promises are returned to
represent the request.

The examples for this guide will assume the following setup code:

```javascript
var API = Gangway({ baseURL: 'http://example.com' })

API.namespace('users').route({
  read: {
    path: '{id?}'
  }
})
```

## Promises in Gangway

```javascript
API.users.read().then(handleSuccess, handleRejection).catch(handleError)
```

Gangway does not include a Promise implementation, it is up to you to
provide one. We recommended using the [then/promise](https://github.com/then/promise)
implementation of Promises.

Let's go into some reasons why.

### Using done() instead of then() to prevent uncaught errors

Promises are chainable. `then` can be called multiple times, layering
on behaviors after a promise is resolved:

```javascript
API.users.read()
         .then(doSomething)
         .then(doSomethingElse)
         .catch(handleError)
```

In the code above, `read` will resolve and execute `doSomething`. Then
the result of `doSomething` will be passed into `doSomethingElse`. If
any of these steps produces an error, `.catch(handleError)`

`then` is a great tool for consecutively processing data, however it
tends to trap errors or hide them if `.catch` is not properly
utilized. For this reason, we recommend using `done` whenever you are
finished processing a response. `done` is different than `then` in
that it ends a chain and all future errors will not be caught.

This is particularly useful when testing:

```javascript
// Assuming the mocha API
it ('can read a user', function(done) {
  API.users.read().done(function(data) {
    assert(data.name === 'Steve')
    done()
  })
})
```

In the example above, if the `name` property of the returned body is
not `'Steve'`, the assertion will throw an error and the testing
framework associated with this code will properly identify that the
test failed.

In contrast, without `done` this might have looked like:

```javascript
it ('can read a user', function(done) {
  API.users.read().then(function(data) {
    assert(data.name === 'Steve')
  }).catch(done)
})
```

In a simple example, using `then` is typically fine. However the
owness is on you to properly catch errors. `done` takes care of a lot
of this work for you.

### Using nodeify for error-first callbacks

[`then/promise`](https://github.com/then/promise) supports an
additional set of methods: `nodeify` and `denodeify`. These methods
are designed to improve interoperability with the NodeJS async
convention of error-first continuation-passing style.

The [Mocha](http://mochajs.org) testing framework uses this style when
notifying that an asynchronous test is completed:

```javascript
it ('can read a user', function(done) {
  API.users.read().then(function(data) {
    assert(data.name === 'Steve')
  }).nodeify(done)
})
```
