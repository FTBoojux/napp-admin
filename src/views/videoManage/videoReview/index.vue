<template>
<!--  <p>视频审核页面</p>-->
  <el-table
    :data="videoList"
  >
    <el-table-column label="上传人" prop="baseUserInfo.username"></el-table-column>
    <el-table-column label="视频标题" prop="vidName"></el-table-column>
    <el-table-column label="简介">
      <template slot-scope="scope">
        <el-button
          @click="showIntroduction(scope.$index)">
          查看简介
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="视频">
      <template slot-scope="scope">
        <el-button
          @click="showVideo(scope.$index)">
          查看视频
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          @click="passVideo(scope.$index)">
          通过
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import video from '@/api/video'
export default {
  name: 'VideoReview',
  data() {
    return {
      videoList: [],
      VIDEO_BASE_URL: ''
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_VIDEO_URL)
    this.VIDEO_BASE_URL = process.env.VUE_APP_VIDEO_URL
    this.showVideoList()
  },
  methods: {
    showIntroduction(index) {
      console.log(index)
      this.$alert(this.videoList[index].introduction, '视频简介', {
        confirmButtonText: '确定'
      })
    },
    showVideo(index) {
      this.$alert(`<video controls src=${this.VIDEO_BASE_URL + this.videoList[index].videoUrl} width="100%"></video>`, '视频简介', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    },
    showVideoList() {
      video.getVideoListToReview(1, 10)
        .then(res => {
          this.videoList = res.data
          console.log(this.videoList)
        })
    },
    passVideo(index) {
      video.passVideo(this.videoList[index].vid)
        .then(res => {
          this.$alert(res.message,'结果',{
            confirmButtonText: '确定'
          })
          this.showVideoList()
        })
    }
  }
}
</script>

<style scoped>

</style>
