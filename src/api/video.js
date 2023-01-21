import request from '@/utils/request'

export default {
  getVideoListToReview(pageNum = 1, pageSize = 10) {
    return request({
      url: `/audit/auth/videoAudit/videoListToReview`,
      method: 'get',
      params: { pageNum, pageSize }
    })
  }
}
