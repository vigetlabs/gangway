# Progress Events

All requests generated by Gangway are done through the
[superagent library](https://github.com/visionmedia/superagent). Superagent
exposes a `progress` event that emits whenever the underlying
XMLHttpRequest triggers progress.

For example:

```javascript
var Gangway = require('gangway')

var API = Gangway()

API.resource('posts')

// Let's pretend this is really big:
var request = posts.read()

request.on('progress', function (event) {
  console.log(event.percent)   // 10 (of 100)
  console.log(event.direction) // 'download'
})
```

An important final note here is that `.on('event')` is not available after
chaining from a request using `then()`. At this point, the request has
been converted into a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).