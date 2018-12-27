<template>
  <div class="about">
    <div>
      <el-table :default-sort = "{prop: 'date', order: 'descending'}"
        :data="tableData"
        stripe sortable
        style="width: 100%">
        <el-table-column
        prop="date"
        label="创建日期"
        >
        </el-table-column>
        <el-table-column
          label="标题"
          >
          <template slot-scope="scope">
            <el-button type="primary" @click="show_todo(scope.row)" size="mini">{{scope.row['title']}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="累计打卡次数">
          <template slot-scope="scope">
            你已经累计打卡{{scope.row['count']}}次了
          </template>
        </el-table-column>
        <el-table-column
          prop="clockCount"
          label="连续打卡次数">
          <template slot-scope="scope">
            你已经连续打卡{{scope.row['clockCount']}}次了
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="primary" @click="clockToday(scope.row)"  size="mini">今日打卡</el-button>
            <el-button v-if="scope.row.status === 0" type="success" @click="doneTodo(scope.row)"  size="mini">完成</el-button>
            <el-button v-if="scope.row.status === 0" type="danger" @click="delTodo(scope.row)"  size="mini">遗憾</el-button>
            <el-tag  v-if="scope.row.status === 2" type="info">遗憾您未完成</el-tag>
            <el-tag  v-if="scope.row.status === 1" type="success">你完成了</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-button type="default" @click="addTodo">Todo</el-button>
    </div>

    <el-dialog title="Todo" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="title" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="todo具体内容" :label-width="formLabelWidth" prop="todo">
          <el-input type="textarea" v-model="form.todo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTodoForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        todo: '',
        title: '',
        userId: this.$store.state.user.id
      },
      rules: {
        todo: [
          { inputValidator: '^[\\\u4e00-\\\u9fa5a-zA-Z][\\\u4e00-\\\u9fa5a-zA-Z]+$', required: true, message: '请输入TODO得具体内容', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入TODO得标题', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    show_todo (row) {
      let hello = this.$notify({
        title: row.title,
        message: row.todo,
        type: 'success'
      })
      console.log(hello)
    },
    updateTable () {
      this.$axios.post('user/getTodoList', { data: this.$store.state.user }
      ).then((Response) => {
        if (Response.data.code === 200 && Response.data.data !== '') {
          this.tableData = Response.data.data
          this.$message({
            type: 'success',
            message: '数据已更新'
          })
        } else {
          if (Response.data.data === '') {
            this.$message('暂无数据')
          } else {
            this.$message(Response.data.data.msg)
          }
        }
      })
    },
    clockToday (row) {
      this.$axios.post('user/clockTodo', { data:
          { id: row.id } }
      ).then((Response) => {
        if (Response.data.code === 200) {
          this.$notify({
            type: 'success',
            message: Response.data.msg,
            title: '打卡'
          })
          this.updateTable()
          this.dialogFormVisible = false
          this.form = {
            todo: '',
            title: '',
            userId: this.$store.state.user.id
          }
        } else {
          this.$notify({
            type: 'warning',
            message: Response.data.msg,
            title: '打卡'
          })
        }
      })
    },
    doneTodo (row) {
      if (confirm('确定完成TODO了？')) {
        this.$axios.post('user/doneTodo', { data:
            { id: row.id } }
        ).then((Response) => {
          if (Response.data.code === 200) {
            this.$notify({
              type: 'success',
              message: Response.data.msg,
              title: '完成任务'
            })
            this.updateTable()
            this.dialogFormVisible = false
            this.form = {
              todo: '',
              title: '',
              userId: this.$store.state.user.id
            }
          } else {
            this.$notify({
              type: 'warning',
              message: Response.data.msg,
              title: '完成任务'
            })
          }
        })
      }
    },
    delTodo (row) {
      if (confirm('确定要放弃这个TODO？')) {
        this.$axios.post('user/delTodo', { data:
            { id: row.id } }
        ).then((Response) => {
          if (Response.data.code === 200) {
            this.$notify({
              type: 'success',
              message: Response.data.msg,
              title: '遗憾'
            })
            this.updateTable()
            this.dialogFormVisible = false
            this.form = {
              todo: '',
              title: '',
              userId: this.$store.state.user.id
            }
          } else {
            this.$notify({
              type: 'warning',
              message: Response.data.msg,
              title: '遗憾'
            })
          }
        })
      }
    },
    addTodo () {
      this.dialogFormVisible = true
    },
    submitTodoForm (formName) {
      if (this.$store.state.user.id === undefined || this.$store.state.user.id === '') {
        this.$notify({
          type: 'warning',
          message: '请先登录'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('user/addTodo', { data: this.form }
          ).then((Response) => {
            if (Response.data.code === 200) {
              this.$notify({
                type: 'success',
                message: '添加成功',
                title: '添加TODO'
              })
              this.updateTable()
              this.dialogFormVisible = false
              this.form = {
                todo: '',
                title: '',
                userId: this.$store.state.user.id
              }
            } else {
              this.$notify({
                type: 'warning',
                message: Response.data.msg,
                title: '添加失败'
              })
            }
          })
        } else {
          this.$notify({
            type: 'warning',
            message: '请检查数据是否正确'
          })
          return false
        }
      })
    }
  },
  created: function () {
    this.updateTable()
  }
}
</script>
<style lang="stylus">
.about
  align-text: center
</style>
