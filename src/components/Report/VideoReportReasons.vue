<template>
  <div>
    举办理由
    <el-table :data="reasonProduced">
      <el-table-column prop="reason" />
    </el-table>
  </div>
</template>

<script>
import video from '@/api/video'

export default {
  name: 'VideoReport',
  props: {
    vid: Number
  },
  data() {
    return {
      reason: [],
      reasonProduced: []
    }
  },
  mounted() {
    console.log(this.vid)
    video
      .getVideoReportReason(this.vid)
      .then(res => {
        // console.log(res.data)
        res.data.forEach(reason => {
          this.reasonProduced.push({ tag: 'tag', reason: reason })
        })
        console.log(this.reasonProduced)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>

</style>
