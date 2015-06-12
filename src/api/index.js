/**
 * API
 *
 * Abstracts away API endpoint specifics into a JavaScript DSL.
 * - Keys correlate to objects defined in ./endpoints.
 * - Values correspond to XHR request building functions using superagent
 */

import bootstrap from './bootstrap'
import resources from './resources'

/**
 * Create a utility for resolving data API endpoints.
 */
const API = {
  toString() {
    return process.env.CLIENT_API
  },

  /**
   * Resolves a partial API path with the specified base url in CLIENT_DATA_API
   */
  resolve(...path) {
    return [ API ].concat(path).join('/')
  }
}

export default bootstrap(resources, API)
