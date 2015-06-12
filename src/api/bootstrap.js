/**
 * API Bootstrap
 * Translates an object of resources into callable AJAX functions
 */

import ajax  from '../ajax'
import remap from '../remap'

export default function(resources, API) {
  // For each resource (user, audience...)
  return remap(resources, function(resource) {

    // For each endpoint (create, read, update, delete...)
    return remap(resource, function({ method, path }) {
      let resolved = API.resolve(path)
      let request  = ajax[method].bind(null, resolved)

      // Add some meta data helpers
      request.method = method
      request.path   = resolved

      return request
    })
  })
}
