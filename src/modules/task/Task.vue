<template>

  <div class="task-page">
    <header>
      <h2>
        <router-link to="/">返回</router-link>{{inventory.name | maxLen(15)}}的列表
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
    <div class="item-list">
      <task-list-item v-for="task in unfinishedTasks" :key="task.id" :task="task" @refresh="refreshTask"></task-list-item>
    </div>

    <div class="bottom-commands">
      <el-button type="text" v-if="!isShowFinish" @click="showFinishTasks()">显示已完成</el-button>
      <el-button type="text" v-if="isShowFinish" @click="isShowFinish=false">隐藏已完成</el-button>
      <el-button type="text" v-if="inventoryCanDel()" @click="delInventory">删除清单</el-button>
      <el-button type="text" @click="exportXLS"><icon name="file-excel-o"></icon> 导出</el-button>
    </div>

    <finish-task-list v-if="isShowFinish" :list="finishedTasks" @refresh="refreshTask"></finish-task-list>

  </div>
</template>
<script>
  import { focus } from '@/assets/js/el-focus'
  import * as taskModel from '@/localdb/model/task/task'
  import * as inventoryModel from '@/localdb/model/task/inventory'
  import TaskListItem from './sub/TaskListItem.vue'
  import FinishTaskList from './sub/FinishTaskList.vue'
  import * as taskExport from './TaskExport'

  export default {
    components: {
      TaskListItem,
      FinishTaskList
    },
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
      this.refreshTask()
    },
    methods: {
      refreshTask () {
        this.queryTasks('unfinished')
        this.queryTasks('finished')
      },
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
        if (this.newTask === '') {
          return false
        }
        await taskModel.saveTask(this.inventoryId, this.newTask)
        this.newTask = ''
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
      },
      inventoryCanDel () {
        return this.unfinishedTasks.length === 0
      },
      /**
       * 删除清单
       */
      async delInventory () {
        this.$confirm('确定要删除该清单?').then(async () => {
          await inventoryModel.deleteInventory(this.inventoryId)
          this.$router.push('/')
        }).catch(_ => {})
      },
      exportXLS () {
        taskExport.exportOneInventory(this.inventory, this.unfinishedTasks, this.finishedTasks)
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

      .el-button {
        margin-right: 2rem;
      }
    }

    .finish-list {
      color: $text-gray-dark;
    }

  }

</style>
