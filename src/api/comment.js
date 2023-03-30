import request from '@/utils/request'

export default {
  getReportReason(cmId) {
    return request({
      url: `/audit/auth/videoAudit/comment/${cmId}/reportReason`
    })
  }
}
