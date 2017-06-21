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
      <li v-for="(taskItem, index) in getCurrentUnFinishedItems">
        <span>{{taskItem.title}}</span>
        <span class="finish-check">
          <el-checkbox v-model="taskItem.finished" @change="changeFinished(taskItem)" title="完成任务"></el-checkbox>
          <i class="el-icon-close task-delete" @click="deleteTask(taskItem)" title="删除任务"></i>
        </span>
      </li>
    </ul>

    <div class="bottom-commands">
      <el-button type="text" v-if="!isShowFinish" @click="showFinishItems()">显示已完成</el-button>
      <el-button type="text" v-if="isShowFinish" @click="isShowFinish=false">隐藏已完成</el-button>
    </div>

    <ul class="item-list finish-list" v-if="isShowFinish">
      <li v-for="(taskItem, index) in finishItems">
        <span>{{taskItem.title}} </span>
        <span><small>[{{taskItem.updateTime | dateTime}}</small>]</span>
        <span class="finish-check">
          <el-checkbox v-model="taskItem.finished" @change="changeFinished(taskItem)" title="完成任务"></el-checkbox>
          <i class="el-icon-close task-delete" @click="deleteTask(taskItem)" title="删除任务"></i>
        </span>
      </li>
    </ul>

  </div>
</template>
<script>
import { focus } from '@/assets/js/el-focus'
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      newTaskItem: '',
      finishItems: null,
      isShowFinish: false,
      groupId: this.$route.params['groupId']
    }
  },
  computed: {
    ...mapGetters(['getCurrentUnFinishedItems'])
  },
  mounted () {
    this.checkAndQueryItems(this.groupId)
  },
  methods: {
    ...mapActions(['checkAndQueryItems', 'saveItem', 'deleteItem', 'finishItem', 'queryFinishItems']),
    save () {
      this.saveItem({
        groupId: this.groupId,
        title: this.newTaskItem
      }).then((d) => {
        this.$notify.success('保存成功')
      }, (d) => {
      })
    },
    changeFinished (task) {
      this.finishItem(task).then((d) => {
        this.$notify.success('操作成功')
      }, (d) => {
        this.$notify.success('操作失败')
      })
    },
    deleteTask (task) {
      this.deleteItem(task).then((d) => {
        this.$notify.success('删除成功')
      }, (d) => {
        this.$notify.success('删除失败')
      })
    },
    showFinishItems () {
      this.isShowFinish = true
      if (!this.finishItems) {
        this.queryFinishItems(this.groupId).then((d) => {
          this.finishItems = d
        })
      }
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
