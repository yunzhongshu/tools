<template>

  <div class="task-page">
    <header>
      <h2>任务清单</h2>
    </header>
    <ul class="group-list">
      <li v-for="(inventory, index) in inventories" @click="gotoTaskList(inventory.id)">
        <icon name="list-ul"></icon>
        <span class="group-list-item-name">{{inventory.name}}</span>
        <span class="subNum">{{inventory.taskCount}}</span>
      </li>
    </ul>
    <div class="create-group">
      <el-button type="text" class="create-group-btn" @click="createInventory()">
        <i class="el-icon-plus" v-if="!isAppendNew"></i>
        <i class="el-icon-minus" v-if="isAppendNew"></i>创建清单
      </el-button>
      <el-input v-show="isAppendNew"
                size="large"
                v-focus="isAppendNew"
                placeholder="创建清单"
                v-model="newInventory">
        <el-button slot="append" icon="plus" @click="save()"></el-button>
      </el-input>
    </div>
  </div>



</template>
<script>
  import { focus } from '@/assets/js/el-focus'
  import * as inventoryModel from '@/localdb/model/task/inventory'

  export default {
    data () {
      return {
        isAppendNew: false,
        newInventory: '',
        inventories: []
      }
    },
    mounted () {
      this.queryInventories()
    },
    methods: {
      async queryInventories () {
        this.inventories = await inventoryModel.queryInventories('enabled')
      },
      createInventory () {
        this.isAppendNew = !this.isAppendNew
      },
      async save () {
        await inventoryModel.insertInventory(this.newInventory)
        this.$notify.success('保存成功')
        this.isAppendNew = false
        this.queryInventories()
      },
      gotoTaskList (inventoryId) {
        this.$router.push({name: 'TaskList', params: {inventoryId: inventoryId}})
      },
      async deleteInventory (inventoryId) {
        await inventoryModel.deleteInventory(inventoryId)
        this.$notify.success('删除成功')
        this.queryInventories()
      }
    },
    directives: {
      focus: focus
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
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
        position: relative;

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
