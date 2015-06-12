/**
 * Response middleware
 * Converts API responses into data we can use
 */

import resolveMessage from './resolveMessage'

// On success, extract the data parameter of the request body
let success = function (response) {
  // Note: axios uses the 'data' key for the request body
  return response.data.data
}

let failure = function ({ status, data }) {
  throw {
    status,
    message : resolveMessage(status, data)
  }
}

export default { success, failure }
