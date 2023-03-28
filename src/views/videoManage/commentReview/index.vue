<template>
  <div>
    <el-table :data="reportedComments" style="width: 100%">
      <el-table-column prop="cmId" label="评论ID" width="100" />
      <el-table-column prop="content" label="评论内容" width="200" />
      <el-table-column prop="uid" label="用户ID" width="100" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="reportCounts" label="举报次数" width="100" />
      <el-table-column label="查看举报理由" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="listReason(scope.row.cmId)">查看举报理由</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="success" @click="handleReview(scope.row.cmId, 'valid')">举报有效</el-button>
          <el-button type="danger" @click="handleReview(scope.row.cmId, 'invalid')">举报无效</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import video from '@/api/video'

export default {
  data() {
    return {
      reportedComments: []
    }
  },
  created() {
    this.fetchReportedComments()
  },
  methods: {
    async fetchReportedComments() {
      // 调用 getReportedComment 方法
      const response = await video.getReportedComment()
      if (response.ok) {
        this.reportedComments = response.data
      } else {
        this.$message.error('获取举报评论失败')
      }
    },
    handleReview(cmId, action) {

    },
    listReason(cmId) {
      console.log(cmId)
    }
  }
}
</script>
