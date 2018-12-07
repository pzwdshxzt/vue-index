<template>
  <div class="about">
    <div>
      <img class="img-3-4" src='https://source.unsplash.com/collection/954550/1920x1080'>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
    }
  },
  transitions: {
  },
  methods: {
  },
  created: function () {
  },
  computed: {
  }
}
</script>
<style lang="stylus">
.el-carousel__item h3
  color: #475669;
  margin: 0 auto;

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.img-3-4
  display: block
  max-width: 100%
  height: auto;
</style>
