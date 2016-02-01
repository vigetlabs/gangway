var ajax      = require('./ajax')
var assign    = require('./assign')
var prepare   = require('./prepare')
var resource  = require('./resource')
var route     = require('./route')
var url       = require('./url')
var segmentize = require('./segmentize')

function API (config, routes) {
  if (this instanceof API === false) {
    return new API(config, routes)
  }

  this.config   = prepare(config)
  this.segments = []

  this.route(routes)
}

API.prototype = {
  ajax: ajax,

  namespace: function (key) {
    var child = Object.create(this, {
      segments: { value: this.segments.concat(key) }
    })

    this[key] = key in this ? assign(child, this[key]) : child

    return child
  },

  toString: function () {
    return url.resolve(this.config.baseURL, segmentize(this.segments))
  },

  resolve: function (path, params) {
    return url(this.toString(), path, params)
  },

  route: function (routes) {
    return route(this, routes)
  },

  resource: function (routes, options, nest) {
    return resource(this, routes, options, nest)
  }
}

module.exports = API
