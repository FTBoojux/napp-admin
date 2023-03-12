import request from '@/utils/request'

export default {
  getVideoListToReview(pageNum = 1, pageSize = 10) {
    return request({
      url: `/audit/auth/videoAudit/videoListToReview`,
      method: 'get',
      params: { pageNum, pageSize }
    })
  },
  passVideo(vid) {
    return request({
      url: `/audit/auth/videoAudit/passVideoById/${vid}`,
      method: 'put'
    })
  },
  rejectVideo(data) {
    return request({
      url: `/audit/auth/videoAudit/rejectVideo`,
      method: 'put',
      data
    })
  },
  getVideoReported(){
    return request({
      url: `/audit/auth/videoAudit/videosReported`
    })
  },
  getVideoReportReason(vid){
    return request({
      url: `/audit/auth/videoAudit/${vid}/reportReason`
    })
  }
}
