<template>
  <div>
    <div>举办审核</div>
    <el-table :data="videos">
      <el-table-column prop="name" label="视频标题" />
      <el-table-column label="查看视频内容">
        <template slot-scope="scope">
          <el-button @click="showVideo(scope.$index)">查看视频内容</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="上传人id" />
      <el-table-column prop="reportTimes" label="举办次数" />
      <el-table-column label="举办理由">
        <template #default="scope">
          <el-button size="small" type="success" @click="showReason = true">查看</el-button>
          <el-dialog :visible.sync="showReason" title="举办理由一览">
            <VideoReportReasons :vid="videos[scope.$index].vid" />
          </el-dialog>
        </template>
      </el-table-column>

      <el-table-column label="处理意见">
        <template #default="scope">
          <el-button size="small" type="danger" @click="showPassModel = true">判定违规</el-button>
          <el-dialog :visible.sync="showPassModel" title="填写拒绝理由">
            <VideoReportReject :vid="videos[scope.$index].vid" />
          </el-dialog>
          <el-button size="small" type="success">举办无效</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import video from '@/api/video'
import VideoReportReasons from '@/components/Report/VideoReportReasons'
import VideoReportReject from '@/components/Report/VideoReportPass'
export default {
  name: 'ReportVideo',
  components: { VideoReportReject, VideoReportReasons },
  data() {
    return {
      videos: [],
      VIDEO_BASE_URL: '',
      showReason: false,
      showPassModel: false
    }
  },
  mounted() {
    this.VIDEO_BASE_URL = process.env.VUE_APP_VIDEO_URL
    video
      .getVideoReported()
      .then(res => {
        console.log(res.data)
        this.videos = res.data
      })
  },
  methods: {
    showVideo(index) {
      console.log(index)
      this.$alert(`<video controls src=${this.VIDEO_BASE_URL + this.videos[index].videoUrl} width="100%"></video>`, '视频简介', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    },
    showReasons() {
      this.showReason = true
      console.log(this.showReason)
    }
  }
}
</script>

<style scoped>

</style>
