let Bootstrap = require('./bootstrap')

function API(baseURL, resources) {
  this.baseURL = baseURL
  Object.assign(this, Bootstrap(resources, this))
}

API.prototype = {
  toString() {
    return this.baseURL
  },

  /**
   * Resolves a partial API path with the specified base url in CLIENT_DATA_API
   */
  resolve(...path) {
    return [ API ].concat(path).join('/')
  }
}

module.exports = API
