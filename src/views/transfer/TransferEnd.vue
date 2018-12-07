<template>
  <div class="about">
    <div>
        <br>
        <el-button v-if="ret_code === '00'" type="success" icon="el-icon-check" circle></el-button>
        <el-button v-else type="danger" icon="el-icon-error" circle></el-button>
        <h1>{{ret_msg}}</h1>
        <el-button v-if="ret_code === '00'" type="default" @click="cancelTrancodes()">完成</el-button>
        <el-button v-if="ret_code !== '00'" type="default" @click="returnNext()">返回上一步</el-button>
        <el-button v-if="ret_code !== '00'" type="warning" @click="cancelTrancodes()">取消</el-button>
    </div>
  </div>
</template>
<script>
import { ADDTIME_MUTATION, CHANGE_FORM, RESET_FORM } from '../../mutation-types'
export default {
  data: function () {
    return {
      ret_msg: '',
      ret_code: '',
      form: ''
    }
  },
  methods: {
    cancelTrancodes: function () {
      if (this.ret_code === '00') {
        this.$router.push({
          name: 'transfer'
        })
      } else {
        if (confirm('确定取消转账？')) {
          this.$router.push({
            name: 'transfer'
          })
          this.$store.commit(RESET_FORM)
        }
      }
    },
    returnNext: function () {
    //   this.$router.go(-1)
      this.$router.push({
        name: 'transferConfirm'
      })
    }
  },
  created: function () {
    this.ret_msg = this.$route.query.ret_msg
    this.ret_code = this.$route.query.ret_code
    this.form = this.$route.query.form
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
