import request from '@/utils/request'

export function fetchAccounts(keyword, page, size) {
  return request({
    url: '/audit/auth/audit/list',
    method: 'get',
    params: {
      keyword,
      page,
      size
    }
  })
}

export function freezeAccount(aid) {
  return request({
    url: `/audit/auth/audit/${aid}/freeze`,
    method: 'put'
  })
}

export function unfreezeAccount(aid) {
  return request({
    url: `/audit/auth/audit/${aid}/unfreeze`,
    method: 'put'
  })
}

export function createAccount(data) {
  return request({
    url: '/audit/auth/audit/auditRegister',
    method: 'post',
    data
  })
}
