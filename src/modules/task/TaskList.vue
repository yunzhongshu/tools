<template>

  <div class="task-page">
    <header>
      <h2>任务清单</h2>
    </header>
    <ul class="group-list">
      <li v-for="(taskGroup, index) in taskGroups">
        {{taskGroup.name}}
      </li>
    </ul>
    <div class="create-group">
      <el-button type="text" class="create-group-btn" @click="createGroup()">
        <i class="el-icon-plus"></i>创建清单
      </el-button>
      <el-input v-show="isAppendNew"
        size="large"
        placeholder="创建清单"
        v-model="newTaskGroup">
      </el-input>
    </div>
  </div>



</template>
<script>
export default {
  data () {
    return {
      taskGroups: [
        {
          id: 1,
          name: '默认分组'
        },
        {
          id: 2,
          name: '工作'
        }
      ],
      isAppendNew: false
    }
  },
  methods: {
    createGroup () {
      this.isAppendNew = !this.isAppendNew
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/base.scss";

  .task-page{
    padding: 0 1rem;

    header{
      height: 5rem;
      line-height: 5rem;
      text-align: center;

      h2{
        margin: 0;
      }
    }

    .group-list{
      li {
        text-align: left;
        height: 4.5rem;
        line-height: 4.5rem;
        border-bottom: 1px solid $base-border-color;
      }

    }

    .create-group {
      text-align: left;
      margin-top: 1rem;

      .create-group-btn{
        font-size: $font-size-lg;
        i {
          margin-right: 0.5rem;
        }
      }

    }


  }





</style>
