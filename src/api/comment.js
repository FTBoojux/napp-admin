import request from '@/utils/request'

export default {
  getReportReason(cmId) {
    return request({
      url: `/audit/auth/videoAudit/comment/${cmId}/reportReason`
    })
  },
  passComment(cmId) {
    return request({
      url: `/audit/auth/videoAudit/comment/reportUseless/${cmId}`,
      method: 'put'
    })
  },
  rejectComment(data) {
    return request({
      url: `/audit/auth/videoAudit/comment/reportPass`,
      method: 'put',
      data
    })
  }
}
