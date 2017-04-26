<template>

  <el-row id="app">
    <el-col :xs="{span:24,offset:0}" :md="{span:12,offset:6}">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "assets/css/base";


html{-webkit-text-size-adjust: none;}
html,body{
  font-size: 62.5%;
}

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: $font-size-base;
}



</style>
