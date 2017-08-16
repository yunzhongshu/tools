<template>
  <div class="task-list-item">
    <div class="list-item-content">
      {{task.title}}
    </div>
    <div class="list-cmd-group">
          <el-checkbox v-model="task.status" @change="changeFinished(task)" title="完成任务" true-label="finished" false-label="unfinished"></el-checkbox>
          <i class="el-icon-close task-delete" @click="deleteTask(task)" title="删除任务"></i>
    </div>
  </div>
</template>
<script>
import * as taskModel from '@/localdb/model/task/task'
export default {
  props: ['task'],
  methods: {
    async changeFinished (task) {
      if (task.status === 'finished') {
        await taskModel.finishTask(task)
      } else {
        await taskModel.unfinishTask(task)
      }

      this.$notify.success('操作成功')
      this.queryTasks('unfinished')
      this.queryTasks('finished')
    },
    async deleteTask (task) {
      await taskModel.deleteTask(task)
      this.$notify.success('删除成功')
      this.queryTasks('unfinished')
      this.queryTasks('finished')
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../../assets/css/base.scss";

  .task-list-item {
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: left;
    line-height: 4.5rem;
    border-bottom: 1px solid $base-border-color;

    div {
      display: inline;
    }

    .fa-icon {
      margin-right: 1rem;
      vertical-align: middle;
    }

    .list-cmd-group {
      float: right;
      margin-right: 1rem;

      .task-delete {
        color: $text-gray;
        margin-left: 2rem;
        cursor: pointer;
      }
    }
  }

</style>
