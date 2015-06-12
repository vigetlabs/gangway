/**
 * Current User Session Endpoints
 */

export default {
  read: {
    method : 'get',
    path   : 'org/me'
  },

  update: {
    method : 'post',
    path   : 'org/me/edit'
  },

  login: {
    method : 'post',
    path   : 'org/me/signin'
  },

  logout: {
    method : 'delete',
    path   : 'org/me/signout'
  },

  forgot: {
    method : 'post',
    path   : 'org/me/forgot'
  },

  validate: {
    method : 'get',
    path   : 'org/me/validate'
  },

  forgotPassword: {
    method : 'post',
    path   : 'org/me/forgot'
  },

  readPermissions: {
    method : 'post',
    path   : 'user/token'
  }
}
