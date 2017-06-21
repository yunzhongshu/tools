<template>

  <div class="task-page">
    <header>
      <h2>任务分组</h2>
    </header>
    <ul class="group-list">
      <li v-for="(taskGroup, index) in getGroups" @click="showGroupItem(taskGroup)">
        <icon name="list-ul"></icon>
        <span>{{taskGroup.name}}</span>
        <span class="subNum">{{taskGroup.taskCount}}</span>
      </li>
    </ul>
    <div class="create-group">
      <el-button type="text" class="create-group-btn" @click="createGroup()">
        <i class="el-icon-plus" v-if="!isAppendNew"></i>
        <i class="el-icon-minus" v-if="isAppendNew"></i>创建清单
      </el-button>
      <el-input v-show="isAppendNew"
                size="large"
                v-focus="isAppendNew"
                placeholder="创建清单"
                v-model="newTaskGroup">
        <el-button slot="append" icon="plus" @click="save()"></el-button>
      </el-input>
    </div>
  </div>



</template>
<script>
  import { focus } from '@/assets/js/el-focus'
  import {mapGetters, mapActions} from 'vuex'
  import localDB from '@/localdb/db'

  export default {
    data () {
      return {
        isAppendNew: false,
        newTaskGroup: ''
      }
    },
    computed: {
      ...mapGetters(['getGroups'])
    },
    mounted () {
      this.queryGroups().then(d => {
      }, d => {
        this.$notify.error({
          title: '失败',
          message: '加载任务分组失败'
        })
      })
//      localDB.openDatabase([
//        {
//          name: 'table1',
//          keyPath: 'id',
//          updateFunc () {
//            console.log('success update callback.')
//          }
//        }
//      ])
    },
    methods: {
      ...mapActions(['queryGroups', 'saveGroup']),
      createGroup () {
        this.isAppendNew = !this.isAppendNew
      },
      save () {
        this.saveGroup({
          name: this.newTaskGroup
        }).then(() => {
          this.$notify.success('保存成功')
          this.isAppendNew = false
        }, (d) => {
        })
      },
      showGroupItem (group) {
        this.$router.push({name: 'taskItem', params: {groupId: group.id}})
      }
    },
    directives: {
      focus: focus
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
        padding-left: 1rem;
        text-align: left;
        height: 4.5rem;
        line-height: 4.5rem;
        border-bottom: 1px solid $base-border-color;
        cursor: pointer;

        &:hover{
          background-color: $theme-color-light;
        }

        .fa-icon {
          margin-right: 1rem;
          vertical-align: middle;
        }

        .subNum {
          float: right;
          margin-right: 3rem;
        }

      }

    }

    .create-group {
      text-align: left;
      margin-top: 1rem;
      padding-left: 1rem;

      .create-group-btn{
        font-size: $font-size-lg;

        i {
          margin-right: 1rem;
        }

      }

    }



  }





</style>
