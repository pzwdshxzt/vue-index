<template>
  <div id="app">
      <div id="nav">
        <el-container>
          <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="99"><h1 class="animated infinite bounce" @click="checkLogin">{{username}}</h1></el-menu-item>
              <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
              <el-menu-item index="2" @click="checkIn" ><a>Todo</a></el-menu-item>
              <el-menu-item index="3"><router-link to="/time">Time</router-link></el-menu-item>
              <el-menu-item index="4"><router-link to="/about">About</router-link></el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
        <el-dialog title="登陆/注册" :visible.sync="dialogFormVisible" width="480px">
          <el-form ref="form"  :model="form" :rules="rules">
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
              <el-input style="width:300px" v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input style="width:300px" type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" :label-width="formLabelWidth" prop="checkCode">
              <el-input style="width:150px" type="password" v-model="form.checkCode" autocomplete="off"></el-input>
              <img :src="checkCode" @click="getCheckCode">
            </el-form-item>
            <h4>如果未注册就是直接注册了</h4>
          </el-form>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">登陆/注册</el-button>
        </el-dialog>
     </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      activeIndex: '1',
      dialogFormVisible: false,
      checkCode: this.$axios.defaults.baseURL + '/getCheckCode?d=' + this.$store.state.uuid + '&' + new Date(),
      form: {
        username: '',
        password: '',
        checkCode: ''
      },
      rules: {
        username: [
          { inputValidator: '^[\\\u4e00-\\\u9fa5a-zA-Z][\\\u4e00-\\\u9fa5a-zA-Z]+$', required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入验证吗', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px'
    }
  },
  computed: {
    username: function () {
      return this.$store.state.user.username
    }
  },
  methods: {
    getCheckCode () {
      this.checkCode = this.$axios.defaults.baseURL + '/getCheckCode?d=' + this.$store.state.uuid + '&' + new Date()
    },
    checkLogin () {
      if (!this.checkLoginFlag()) {
        this.$confirm('此操作将用户退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('loginOut')
          this.$message({
            type: 'success',
            message: '已注销!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消注销'
          })
        })
      }
      if (this.checkLoginFlag()) {
        this.dialogFormVisible = true
      }
    },
    checkLoginFlag () {
      return this.$store.state.user.id === undefined || this.$store.state.user.id === ''
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.password = this.$md5(this.form.password)
          this.$axios.post('user/login', { data: this.form }
          ).then((Response) => {
            if (Response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '登陆成功'
              })
              this.dialogFormVisible = false
              this.$store.dispatch('loginUserInfo', Response.data.data)
              this.form = {
                username: '',
                password: ''
              }
            } else {
              this.$message({
                type: 'warning',
                message: Response.data.msg
              })
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请检查数据是否正确'
          })
          return false
        }
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    checkIn () {
      if (!this.checkLoginFlag()) {
        this.$router.push('todo')
      }
      if (this.checkLoginFlag()) {
        this.dialogFormVisible = true
      }
    }
  }
}
</script>

<style lang="stylus">
a
  text-decoration: none
.router-link-active
  text-decoration: none
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
