<template>
  <div class="finish-list">
    <div v-for="day in dayList" class="list-group">
      <div class="group-title">{{day}}</div>
      <task-list-item v-for="task in listDayMap[day]" :key="task.id" :task="task" @refresh="refreshTask"></task-list-item>
    </div>
  </div>
</template>
<script>
import utils from '@/assets/js/utils'
import TaskListItem from './TaskListItem.vue'

export default {
  components: {
    TaskListItem
  },
  data () {
    return {
      listDayMap: {
      },
      dayList: []
    }
  },
  created () {
    this.arrange()
  },
  props: ['list'],
  watch: {
    list: {
      handler (newVal) {
        this.arrange()
      },
      deep: true
    }
  },
  methods: {
    arrange () {
      this.listDayMap = {}
      this.dayList = []
      this.list.forEach(task => {
        let day = this.getDay(task.updateTime)
        if (!this.listDayMap[day]) {
          this.listDayMap[day] = []
          this.dayList.push(day)
        }
        let index = this.listDayMap[day].length
        this.$set(this.listDayMap[day], index, task)
        console.log(this.listDayMap[day])
      })
    },
    getDay (date) {
      return utils.formatDate('yyyy年MM月dd日', new Date(date))
    },
    refreshTask () {
      this.$emit('refresh')
    }
  }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../../../assets/css/base.scss";

  .finish-list {
    margin-top: 20px;
    color: $text-gray-dark;

    .group-title {
      text-align: left;
      font-weight: bold;
    }

  }
</style>
