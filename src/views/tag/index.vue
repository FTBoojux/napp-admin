<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-input v-model="newTag" placeholder="输入新的标签" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewTag_">添加标签</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tags" border>
      <el-table-column prop="vtId" label="ID" width="100" />
      <el-table-column prop="tagName" label="标签名" />
      <el-table-column prop="createAt" label="创建时间" />
      <el-table-column
        label="操作"
        width="180"
        :formatter="({ row }) => '删除'"
        @cell-click="deleteTag"
      />
    </el-table>
  </div>
</template>

<script>
import { addNewTag, getVideoTags } from '@/api/tag'

export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      newTag: ''
    }
  },
  // 在页面初次渲染时调用tag.getAllTags()方法
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      getVideoTags()
        .then(res => {
          console.log(res)
          this.tags = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addNewTag_() {
      addNewTag(this.newTag)
        .then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getTags()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style scoped>

</style>
