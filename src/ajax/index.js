/**
 * AJAX
 * A simple abstraction around our AJAX library to decouple its
 * interface from the implimentation details.
 */

import axios from 'axios'
import parse from './parse'
import send  from './send'

// Configure axios for our API:
axios.interceptors.response.use(parse.success, parse.failure)

export default {
  get(path, query) {
    return send('get', path, null, query)
  },
  post   : send.bind(null, 'post'),
  put    : send.bind(null, 'put'),
  patch  : send.bind(null, 'patch'),
  delete : send.bind(null, 'delete')
}
