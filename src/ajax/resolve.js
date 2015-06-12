/**
 * Resolve
 * Format urls for the API
 */

import qs from 'querystring'

export default function resolve (path, query) {
  let querystring = qs.stringify(query)

  return querystring ? `${path}?${querystring}` : path
}
