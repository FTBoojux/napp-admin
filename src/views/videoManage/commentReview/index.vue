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
          <el-button type="primary" @click="showReportReasons(scope.row.cmId)">查看举报理由</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="rejectComment(scope.row.cmId)">举报有效</el-button>
          <el-button type="danger" @click="passComment(scope.row.cmId)">举报无效</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="举报理由" :visible.sync="reportReasonDialogVisible" width="30%">
      <el-list>
        <el-list-item v-for="(reason, index) in reportReasons" :key="index">
          {{ reason }}
          <br>
        </el-list-item>
      </el-list>
    </el-dialog>

  </div>
</template>

<script>
import video from '@/api/video'
import comment from '@/api/comment'

export default {
  data() {
    return {
      reportedComments: [],
      reportReasonDialogVisible: false,
      reportReasons: []
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
    },
    async showReportReasons(cmId) {
      try {
        const response = await comment.getReportReason(cmId)
        if (response.ok) {
          this.reportReasons = response.data
          this.reportReasonDialogVisible = true
        } else {
          this.$message.error('获取举报理由失败')
        }
      } catch (error) {
        this.$message.error('获取举报理由失败')
      }
    },
    async rejectComment(cmId) {
      const reason = await this.promptReason()
      if (reason !== null) {
        try {
          const data = { cmId, reason }
          const response = await comment.rejectComment(data)
          if (response.ok) {
            this.$message.success('处理成功')
            // 刷新数据或删除处理过的评论
            await this.fetchReportedComments()
          } else {
            this.$message.error('处理失败')
          }
        } catch (error) {
          this.$message.error('处理失败')
        }
      }
    },
    async passComment(cmId) {
      try {
        const response = await comment.passComment(cmId)
        if (response.ok) {
          this.$message.success('处理成功')
          // 刷新数据或删除处理过的评论
          await this.fetchReportedComments()
        } else {
          this.$message.error('处理失败')
        }
      } catch (error) {
        this.$message.error('处理失败')
      }
    },
    async promptReason() {
      return await this.$prompt('请输入处理理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入处理理由'
      })
        .then(({ value }) => {
          return value
        })
        .catch(() => {
          return null
        })
    }
  }
}
</script>
