/**
 * User Endpoints
 */

export default {
  create: {
    method : 'post',
    path   : 'org/users/new'
  },

  read: {
    method : 'get',
    path   : 'org/users'
  },

  update: {
    method : 'post',
    path   : 'org/users/edit'
  },

  enable: {
    method : 'post',
    path   : 'org/users/enabled'
  }
}
