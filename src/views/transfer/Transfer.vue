<template>
  <div class="about">
    <h2>转账录入页</h2>
    <div class='el-form-custom'>
      <el-form ref="form" :model="form"  label-width="100px" :rules="rules">
        <el-form-item label="付款账号" prop="payAccount">
            <el-select class="el-select" v-model="form.payAccount" placeholder="请选择付款账号">
                <el-option v-for="(item,index) in payAccounts" :label="item.labelName" :value="item.value" :key="index">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="收款账号" prop="account">
            <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="收款人名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="转账金额" prop="num">
            <el-input v-model.number="form.num"></el-input>
        </el-form-item>
        <el-form-item label="通知对方">
            <el-checkbox class="el-checkbox" v-model="form.type" label="是否通知对方" name="type"></el-checkbox>
        </el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
    </el-form>
    </div>
  </div>
</template>
<script>
import { CHANGE_FORM } from '../../mutation-types'
export default {
  data: function () {
    return {
      form: {
        account: '',
        payAccount: '',
        name: '',
        num: '',
        type: ''
      },
      rules: {
        payAccount: [
          { required: true, message: '请选择付款账号', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收款姓名', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '转账金额不能为空' },
          { type: 'number', message: '请输入金额', trigger: 'blur' }
        ]
      },
      payAccounts: []
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // get请求
          // this.$router.push({
          //   path: 'transferConfirm',
          //   query: this.form
          // })
          // 命名的路由
          // post请求
          // this.$router.push({
          //   name: 'transferConfirm',
          //   params: { object: this.form }
          // })
          this.$router.push({
            name: 'transferConfirm'
          })
          this.$store.commit(CHANGE_FORM, this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.form = {
        account: '',
        payAccount: '',
        name: '',
        num: '',
        type: ''
      }
    }
  },
  created: function () {
    // this.$axios.get('/api/accountList.json').then((Response) => {
    //   this.payAccounts = Response.data.payAccounts
    // })
    this.$axios.get('/mock/accountList.do').then((Response) => {
      this.payAccounts = Response.data.payAccounts
    })
    if (this.$store.state.form !== undefined && this.$store.state.form !== '') {
      this.form = this.$store.state.form
    }
  },
  computed: {
  }
}
</script>
<style  lang="stylus">
.el-form-custom
    width 400px
    margin:0 auto
.el-select
    width 300px
.el-checkbox
    float left
</style>
