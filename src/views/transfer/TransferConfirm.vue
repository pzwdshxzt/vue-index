<template>
  <div class="about">
    <h2>转账确认页</h2>
    <div class='el-form-custom'>
      <el-form :model="form"  label-width="100px">
        <el-form-item label="付款账号">
            <el-input v-model="form.payAccount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收款账号">
            <el-input v-model="form.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收款人名称">
            <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
            <el-input v-model="form.num" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="通知对方">
            <el-checkbox class="el-checkbox" v-model="form.type" label="是否通知对方" name="type" :disabled="true"></el-checkbox>
        </el-form-item>
        <el-button type="default" @click="returnNext()">返回上一步</el-button>
        <el-button type="primary" @click="submit()">确认</el-button>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      form: this.$store.state.form
    }
  },
  methods: {
    returnNext: function () {
      this.$router.push({
        path: 'transfer',
        query: {
          form: this.form
        }
      })
    },
    submit () {
      this.$axios.post('/mock/transfer.do', {
        form: this.form
      }).then((Response) => {
        if (Response.data.data.ret_code === '0000') {
          this.$router.push({
            path: 'transferEnd',
            query: {
              form: this.form,
              ret_msg: '转账成功',
              ret_code: '00'
            }
          })
        } else {
          this.$router.push({
            path: 'transferEnd',
            query: {
              form: this.form,
              ret_msg: '转账失败',
              ret_code: '01'
            }
          })
        }
      })
    }
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
