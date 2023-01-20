import request from '@/utils/request'

export function login(data) {
  return request({
    url: `/audit/audit/auditLogin`,
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/audit/audit/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
