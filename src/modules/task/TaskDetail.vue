<template>
  <div class="task-detail">
    <tool-header :title="title">
      <el-button slot="headLeft" type="text" @click="goBack()">返回</el-button>
    </tool-header>
    <el-form ref="task-detail-form" :model="task" label-width="150px">
      <el-form-item label="到期日:">
        <el-col :span="16">
          <el-date-picker type="date" placeholder="选择日期" v-model="task.clockDate" ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="提醒时间:">
        <el-col :span="16">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="task.clockTime" ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="指派给:">
        <el-col :span="16">
          <el-input v-model="task.assignTo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="描述:">
        <el-col :span="16">
          <el-input type="textarea" v-model="task.description" :rows="4"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ToolHeader from '@/components/ToolHeader'
import * as taskModel from '@/localdb/model/task/task'
import utils from '@/assets/js/utils'

export default {
  components: {
    ToolHeader
  },
  data () {
    return {
      taskId: this.$route.params['taskId'],
      task: {
        clockDate: '',
        clockTime: '',
        assignTo: '',
        description: ''
      },
      title: '任务详情'
    }
  },
  created () {
    if (typeof this.taskId === 'string') {
      this.taskId = parseInt(this.taskId)
    }
    this.getTask()
  },
  methods: {
    async getTask () {
      let info = await taskModel.getTask(this.taskId)
      this.$lodash.assign(this.task, info)
      this.title = utils.maxLength(this.task.title, 15) + '的详情'
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../assets/css/base";

  .task-detail {

    .el-date-editor.el-input {

        width: 100% !important;
    }
  }

</style>
