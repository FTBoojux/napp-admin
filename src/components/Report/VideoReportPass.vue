<template>
  <el-form ref="reportForm" :model="reportForm" @submit.native.prevent="submitForm">
    <el-form-item label="违规理由" prop="reason">
      <el-input v-model="reportForm.reason" type="textarea" :rows="4" placeholder="请输入违规理由" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import video from '@/api/video'

export default {
  name: 'VideoReportProject',
  props: {
    vid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      reportForm: {
        reason: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.reportForm.validate((valid) => {
        if (valid) {
          // 提交表单数据到后端
          this.sendDataToBackend()
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    sendDataToBackend() {
      video
        .rejectVideo({
          vid: this.vid,
          reason: this.reportForm.reason
        })
        .then(res => {
          this.$message('退回成功！')
        })
    }
  }
}
</script>

