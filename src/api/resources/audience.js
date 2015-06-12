/**
 * Audience Endpoints
 */

export default {
  create: {
    method : 'post',
    path   : 'org/user/apps/audiences/new'
  },

  read: {
    method : 'get',
    path   : 'org/user/apps/audiences'
  },

  search: {
    method : 'get',
    path   : 'org/user/apps/audiences/search'
  },

  update: {
    method : 'post',
    path   : 'org/user/apps/audiences/edit'
  },

  enable: {
    method : 'post',
    path   : 'org/user/apps/audiences/enable'
  },

  copy: {
    method : 'post',
    path   : 'org/user/apps/audiences/copy'
  }
}
