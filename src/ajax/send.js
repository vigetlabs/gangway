/*
 * Send
 * A generalized AJAX request function
 */

import axios   from 'axios'
import resolve from './resolve'

export default function (method, path, params, query={}) {
  const url = resolve(path, query)

  return axios[method](url, params)
}
