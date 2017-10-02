<template>
  <div>
    <h1>e工具</h1>
    <el-row :gutter="20">
      <el-col :span="8" v-for="tool in tools" :key="tool.title">
        <router-link to="/inventory">
          <el-card>
            <h2>{{tool.title}}</h2>
            <p>{{tool.desc}}</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tools: [
        {
          title: '任务清单',
          desc: '按清单记录代办的各种任务， 可进行导出',
          url: '/inventory'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/base.scss";

  a {
    text-decoration: none;
    color: $base-text-color;

  }

  .el-card {
    background-color: $light-blue;

    h2 {
      font-size: $font-size-h2;
    }
    p {
      text-align: left;
    }
  }
</style>
