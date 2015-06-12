/**
 * Application Endpoints
 */

export default {
  create: {
    method : 'post',
    path   : 'org/users/apps/new'
  },

  readAll: {
    method : 'get',
    path   : 'org/users/apps'
  },

  readOne: {
    method : 'get',
    path   : 'org/users/apps/getone'
  },

  update: {
    method : 'post',
    path   : 'org/users/apps/edit'
  },

  enable: {
    method : 'post',
    path   : 'org/users/apps/enabled'
  },

  share: {
    method : 'post',
    path   : 'org/users/apps/share'
  }
}
