<template>
<!--  <p>视频审核页面</p>-->
  <div>
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
          <el-button
            @click="rejectVideo(scope.$index)">
            退回
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenationBox">
      <el-pagination
        class="pagenation"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        :page-sizes="pageSizes"
        :page-count="pageCount"
        :current-page="currentPage"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import video from '@/api/video'
export default {
  name: 'VideoReview',
  data() {
    return {
      videoList: [],
      pageSize: 10,
      total: 0,
      pageCount: 1,
      currentPage: 1,
      pageSizes: [5, 10, 20],
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
      video.getVideoListToReview(this.currentPage, this.pageSize)
        .then(res => {
          this.videoList = res.data.records
          console.log(this.videoList)
          this.total = res.data.total
          this.currentPage = res.data.current
          this.pageCount = res.data.pages
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
    },
    rejectVideo(index) {
      console.log(index)
      this.$prompt('请说明投稿退回理由','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        video
          .rejectVideo({
            vid: this.videoList[index].vid,
            reason: value
          })
          .then(res => {
            console.log(res)
            this.showVideoList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      })
    },
    currentChange(current) {
      // console.log(current)
      this.currentPage = current
      this.showVideoList()
    }

  }
}
</script>

<style scoped>
.pagenationBox{
  display: flex;
  align-items: center;
  justify-content: center;
}
/*.pagenation{*/
/*    display: inline-block;*/
/*  margin: auto;*/
/*}*/
</style>
