<template>

  <div class="task-page">
    <header>
      <h2>
        <router-link to="/">返回</router-link>任务清单
      </h2>
    </header>
    <div class="create-item">
      <el-input size="large"
                v-focus="true"
                placeholder="添加任务"
                v-model="newTaskItem">
        <el-button slot="append" icon="plus" @click="save()"></el-button>
      </el-input>
    </div>
    <ul class="item-list">
      <li v-for="(taskItem, index) in taskItems">
        <span>{{taskItem.name}}</span>
        <span class="finish-check">
          <el-checkbox v-model="finish"></el-checkbox>
        </span>
      </li>
    </ul>

  </div>
</template>
<script>

export default {
  data () {
    return {
      taskItems: [],
      newTaskItem: ''
    }
  },
  methods: {
    save () {
      this.taskItems.push({name: this.newTaskItem})
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../assets/css/base.scss";
  .task-page {
    padding: 0 1rem;

    header {
      height: 5rem;
      line-height: 5rem;
      text-align: center;

      h2 {
        position: relative;
        a {
          font-size: $font-size-lg;
          float: left;
          position: absolute;
          left: 1rem;
        }
        margin: 0;
        text-align: center;
      }
    }

    .create-item {
      text-align: left;
      margin-top: 1rem;
      padding-left: 0;
      padding-right: 0;


      .create-item-btn{
        font-size: $font-size-lg;

        i {
          margin-right: 1rem;
        }

      }

    }

    .item-list {
      li {
        padding-left: 1rem;
        padding-right: 1rem;
        text-align: left;
        height: 4.5rem;
        line-height: 4.5rem;
        border-bottom: 1px solid $base-border-color;

        .fa-icon {
          margin-right: 1rem;
          vertical-align: middle;
        }

        .finish-check {
          float: right;
          margin-right: 3rem;
        }

      }

    }
  }

</style>
