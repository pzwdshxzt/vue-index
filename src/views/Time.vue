<template>
  <div>
    <h1>{{selectTimeFormat}}</h1>
    <el-date-picker
      v-model="selectTime"
      @blur="changeTime"
      type="datetime"
      placeholder="选择日期时间"
      default-time="17:30:00">
    </el-date-picker>
    <h1>{{countString}} </h1>
    <h1 v-if="times > 0" class="animated infinite bounce"><strong>{{times}}</strong> 秒</h1>
      <el-progress :stroke-width="30"  :percentage="percentNum" class="el-progress"></el-progress>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      selectTime: this.$store.state.selectTime,
      countString: '',
      times: 0
    }
  },
  methods: {
    changeTime: function () {
      this.$store.dispatch('changeSelectTime', this.selectTime)
      this.times = Math.floor((this.selectTime.getTime() - new Date()) / 1000)
    },
    counterFn: function (t) {
      let retmsg = ``
      let leave1 = t % (24 * 3600)
      let leave2 = leave1 % 3600
      let leave3 = leave2 % 60
      if (t > 0) {
        let day = Math.floor(t / (24 * 3600))
        let hour = Math.floor(leave1 / 3600)
        let minute = Math.floor(leave2 / 60)
        let second = Math.round(leave3)
        if (day > 0) {
          retmsg = `${day}天 ${hour}小时 ${minute}分 ${second}秒`
        } else if (hour > 0) {
          retmsg = `${hour}小时 ${minute}分 ${second}秒`
        } else if (minute > 0) {
          retmsg = `${minute}分 ${second}秒`
        } else {
          retmsg = `${second}秒`
        }
      } else {
        let day = Math.ceil(t / (24 * 3600))
        let hour = Math.ceil(leave1 / 3600)
        let minute = Math.ceil(leave2 / 60)
        let second = Math.ceil(leave3)
        if (day !== 0) {
          retmsg = ` 设置时间已经超过 ${day}天 ${hour}小时 ${minute}分 ${second}秒`
        } else if (hour !== 0) {
          retmsg = ` 设置时间已经超过 ${hour}小时 ${minute}分 ${second}秒`
        } else if (minute !== 0) {
          retmsg = ` 设置时间已经超过 ${minute}分 ${second}秒`
        } else {
          retmsg = ` 设置时间已经超过 ${second}秒`
        }
      }
      this.countString = retmsg
    },
    startCount: function () {
      window.setInterval(() => {
        this.times--
        this.counterFn(this.times)
      }, 1000)
    },
    dataFormat: function (time) {
      return `
      ${time.getFullYear()}-${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}-${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}
        ${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}
      : ${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()}
      : ${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}
      `
    }
  },
  created: function () {
    this.times = Math.floor((this.selectTime.getTime() - new Date()) / 1000)
    this.startCount()
  },
  computed: {
    percentNum: function () {
      let startTime = Math.floor((this.selectTime.getTime() - this.$store.state.startTime.getTime()) / 1000)
      if (this.times > 0 && startTime > 0) {
        let percent = (1 - (this.times / startTime)) * 100
        return percent > 100 ? 100 : percent
      }
      return 100
    },
    selectTimeFormat: function () {
      return this.dataFormat(this.selectTime)
    }
  }
}
</script>
<style lang="stylus">
.el-progress
  width:400px
  margin:0 auto
</style>
