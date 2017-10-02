<template>
  <div class="task-list-item">
    <div class="task-state">
      <icon name="clock-o" v-if="task.clockTime"></icon>
    </div>
    <div class="task-title">
      {{task.title}}
    </div>
    <div class="task-command">
      <el-checkbox v-model="task.status" @change="changeFinished(task)" title="完成任务" true-label="finished" false-label="unfinished"></el-checkbox>
      <i class="el-icon-delete task-delete" @click="deleteTask(task)" title="删除任务"></i>
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
      this.$emit('refresh')
    },
    async deleteTask (task) {
      await taskModel.deleteTask(task)
      this.$notify.success('删除成功')
      this.$emit('refresh')
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../../assets/css/base.scss";


  .task-list-item {
    display: table;
    width: 100%;
    min-height: 4.5rem;
    border-bottom: 1px solid $base-border-color;

    i, svg {
      font-size: 16px;
      color: $text-gray;
      cursor: pointer;
    }

    &:hover{
      background-color: $theme-color-light;

      i, svg {
        color: $text-gray-dark;
      }
    }

    .task-state, .task-title, .task-command {
      display: table-cell;
    }

    .task-state {
      width: 2rem;
      text-align: left;
      vertical-align: middle;
    }
    .task-title {
      text-align: left;
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    .task-command {
      width: 6rem;
      text-align: center;
      vertical-align: middle;

      i {
        margin-left: 1.5rem;
      }
    }

  }



</style>
