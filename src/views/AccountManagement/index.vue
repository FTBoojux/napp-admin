<template>
  <div class="account-management">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="keyword" placeholder="通过账户名搜索" @keyup.enter.native="fetchAccounts" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchAccounts">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="showCreateAccountDialog">添加账户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="accounts" style="width: 100%" :row-key="record => record.aid">
      <el-table-column prop="aid" label="ID" width="80" />
      <el-table-column prop="adminName" label="账户名" />
      <el-table-column prop="level" label="权限等级" />
      <el-table-column prop="createAt" label="创建时间" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="{ row }">
          <el-tag v-if="row.status === 0" type="success">启用</el-tag>
          <el-tag v-else type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button v-if="row.status === 0" type="danger" size="mini" @click="freezeAccount(row.aid)">冻结</el-button>
          <el-button v-else type="success" size="mini" @click="unfreezeAccount(row.aid)">停用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="添加账户" :visible.sync="createAccountDialogVisible" width="30%">
      <el-form ref="newAccountForm" :model="newAccount" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="newAccount.adminName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newAccount.password"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-input-number v-model="newAccount.level" :min="1" :max="99"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="createAccountDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmitCreateAccount">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { createAccount, fetchAccounts, freezeAccount, unfreezeAccount } from '@/api/account'

export default {
  name: 'AccountManagement',
  data() {
    return {
      keyword: '',
      accounts: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      createAccountDialogVisible: false,
      newAccount: {
        adminName: '',
        password: '',
        level: 1
      }
    }
  },
  mounted() {
    this.fetchAccounts()
  },
  methods: {
    async fetchAccounts() {
      const response = await fetchAccounts(this.keyword, this.currentPage, this.pageSize)
      console.log(response)
      if (response.code === 200) {
        this.accounts = response.data.records
        this.total = response.data.total
      } else {
        this.$message.error('账户获取失败！')
      }
    },
    async createAccount() {
      // Implement create account functionality
    },
    async freezeAccount(aid) {
      const response = await freezeAccount(aid)

      if (response.code === 200) {
        this.$message.success('账户已冻结！')
        await this.fetchAccounts()
      } else {
        this.$message.error('冻结失败！')
      }
    },
    async unfreezeAccount(aid) {
      const response = await unfreezeAccount(aid)

      if (response.code === 200) {
        this.$message.success('账户已解冻')
        await this.fetchAccounts()
      } else {
        this.$message.error('解冻失败！')
      }
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.fetchAccounts()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchAccounts()
    },

    showCreateAccountDialog() {
      this.createAccountDialogVisible = true
    },

    async handleSubmitCreateAccount() {
      try {
        await this.$refs.newAccountForm.validate()
        await createAccount(this.newAccount)
        this.$message.success('账户创建成功')
        this.createAccountDialogVisible = false
        this.resetNewAccountForm()
        await this.fetchAccounts()
      } catch (error) {
        this.$message.error('账户创建失败')
      }
    },

    resetNewAccountForm() {
      this.$refs.newAccountForm.resetFields()
      this.newAccount = {
        adminName: '',
        password: '',
        level: 1
      }
    }
  }
}
</script>

<style scoped>
.account-management {
  padding: 10px;
}
</style>
