<template>

  <div class="task-page">
    <header>
      <h2>
        <router-link to="/">返回</router-link>{{inventory.name}}的列表
        <el-button-group>
          <!--<el-button type="primary" icon="edit"></el-button>-->
          <!--<el-button type="primary" icon="delete"></el-button>-->
        </el-button-group>
      </h2>
    </header>
    <div class="create-item">
      <el-input size="large"
                v-focus="true"
                placeholder="添加任务"
                v-model="newTask">
        <el-button slot="append" icon="plus" @click="save()"></el-button>
      </el-input>
    </div>
    <ul class="item-list">
      <li v-for="(task, index) in unfinishedTasks">
        <span>{{task.title}}</span>
        <span class="finish-check">
          <el-checkbox v-model="task.status" @change="changeFinished(task)" title="完成任务" true-label="finished" false-label="unfinished"></el-checkbox>
          <i class="el-icon-close task-delete" @click="deleteTask(task)" title="删除任务"></i>
        </span>
      </li>
    </ul>

    <div class="bottom-commands">
      <el-button type="text" v-if="!isShowFinish" @click="showFinishTasks()">显示已完成</el-button>
      <el-button type="text" v-if="isShowFinish" @click="isShowFinish=false">隐藏已完成</el-button>
    </div>

    <ul class="item-list finish-list" v-if="isShowFinish">
      <li v-for="(task, index) in finishedTasks">
        <span>{{task.title}} </span>
        <span><small>[{{task.updateTime | dateTime}}</small>]</span>
        <span class="finish-check">
          <el-checkbox v-model="task.status" @change="changeFinished(task)" title="完成任务" true-label="finished" false-label="unfinished"></el-checkbox>
          <i class="el-icon-close task-delete" @click="deleteTask(task)" title="删除任务"></i>
        </span>
      </li>
    </ul>

  </div>
</template>
<script>
import { focus } from '@/assets/js/el-focus'
import * as taskModel from '@/localdb/model/task/task'
import * as inventoryModel from '@/localdb/model/task/inventory'

export default {
  data () {
    return {
      inventory: {
        name: '任务列表'
      },
      newTask: '',
      finishedTasks: [],
      isShowFinish: false,
      inventoryId: this.$route.params['inventoryId'],
      unfinishedTasks: []
    }
  },
  mounted () {
    if (typeof this.inventoryId === 'string') {
      this.inventoryId = parseInt(this.inventoryId)
    }
    this.getInventory()
    this.queryTasks('unfinished')
  },
  methods: {
    async getInventory () {
      this.inventory = await inventoryModel.getInventory(this.inventoryId)
    },
    async queryTasks (status) {
      const list = await taskModel.queryTasks(this.inventoryId, status)
      switch (status) {
        case 'unfinished':
          this.unfinishedTasks = list
          break
        case 'finished':
          this.finishedTasks = list
          break
      }
    },
    async save () {
      await taskModel.saveTask(this.inventoryId, this.newTask)
      this.$notify.success('保存成功')
      this.queryTasks('unfinished')
    },
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
    },
    showFinishTasks () {
      this.isShowFinish = true
      this.queryTasks('finished')
    }
  },
  directives: {
    focus: focus
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
        margin: 0;
        text-align: center;

        a {
          font-size: $font-size-lg;
          float: left;
          position: absolute;
          left: 1rem;
        }

        .el-button-group{
          position: absolute;
          right: 0;
          top: 1rem;
        }
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
          margin-right: 1rem;
        }
        .task-delete {
          color: $text-gray;
          margin-left: 2rem;
          cursor: pointer;
        }
      }
    }

    .bottom-commands {
      margin-top: 1rem;
    }

    .finish-list {
      color: $text-gray-dark;
    }

  }

</style>
