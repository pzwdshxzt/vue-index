<template>
  <div id="app">
      <div id="nav">
        <el-container>
          <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="99"><h1 class="animated infinite bounce" @click="checkLogin">{{username}}</h1></el-menu-item>
              <el-menu-item index="1" @click="homeIndex"><a>Home</a></el-menu-item>
              <el-menu-item index="2" @click="checkIn" ><a>Todo</a></el-menu-item>
              <el-menu-item index="3" @click="timeClock"><a>Time</a></el-menu-item>
              <el-menu-item index="4" @click="aboutPage"><a>About</a></el-menu-item>
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
              <el-input style="width:150px" v-model="form.checkCode" autocomplete="off"></el-input>
              <img :src="checkCode" @click="getCheckCode">
            </el-form-item>
          </el-form>
          <el-button @click="dialogFormVisible = false">取消</el-button>&nbsp;
          <el-button type="primary" @click="submitLoginForm('form')">登陆</el-button>&nbsp;
          <el-button type="success" @click="submitRegForm('form')">注册</el-button>
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
    loginSuccess (response) {
      if (response.data.code === 200) {
        this.$message({
          type: 'success',
          message: response.data.msg
        })
        this.dialogFormVisible = false
        this.$store.dispatch('loginUserInfo', response.data.data)
        this.form = {
          username: '',
          password: ''
        }
        sessionStorage.setItem('token', response.data.token)
      } else {
        this.$message({
          type: 'warning',
          message: response.data.msg
        })
      }
    },
    getCheckCode () {
      this.checkCode = this.$axios.defaults.baseURL + '/getCheckCode?d=' + this.$store.state.uuid + '&' + new Date()
    },
    checkLogin () {
      // this.$store.dispatch('loginOut')
      if (!this.checkLoginFlag()) {
        this.$confirm('此操作将用户退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('user/logout', {}, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            } }
          ).then((Response) => {
            if (Response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '已注销!'
              })
              this.$store.dispatch('loginOut')
            } else {
              this.$message({
                type: 'warning',
                message: Response.data.msg
              })
            }
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
    submitLoginForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.password = this.$md5(this.form.password)
          this.$axios.post('user/login', { data: this.form }
          ).then((Response) => {
            this.loginSuccess(Response)
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
    submitRegForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.password = this.$md5(this.form.password)
          this.$axios.post('user/reg', { data: this.form }
          ).then((Response) => {
            this.loginSuccess(Response)
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    checkIn () {
      if (!this.checkLoginFlag()) {
        this.$router.push('todo')
      }
      if (this.checkLoginFlag()) {
        this.dialogFormVisible = true
      }
    },
    timeClock () {
      this.$router.push('time')
    },
    homeIndex () {
      this.$router.push('/')
    },
    aboutPage () {
      this.$router.push('about')
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
