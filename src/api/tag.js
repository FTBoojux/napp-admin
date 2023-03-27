import request from '@/utils/request'

export function getVideoTags() {
  return request({
    url: '/videoManage/videoTag/all',
    method: 'get'
  })
}

export function addNewTag(tagName) {
  return request({
    url: `/audit/audit/videoTagAudit/${tagName}`,
    method: 'put'
  })
}
