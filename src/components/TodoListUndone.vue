<template>
  <div class="todolist-undone">
    <el-checkbox
            v-if="todosData.undone.length > 0"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group
            v-model="checkedTodos"
            @change="handleCheckedTodosChange"
    >
      <el-row
              v-for="todo in todosData.undone"
              :key="todo._id"
              :gutter="10"
              type="flex"
              justify="space-between"
              class="todo-row"
      >
        <el-col
                :xs="18"
                :sm="22"
        >
          <el-checkbox :label="todo._id">
            <el-row type="flex">
              <el-col :xs="3" :sm="4" :class="{expired: moment(todo.expectTime) < moment()}">
                {{moment(todo.expectTime).format('YYYY-MM-DD HH:mm')}}
                {{moment(todo.expectTime) < moment() ? '已超时': ''}}
              </el-col>
              <el-col :xs="21" :sm="20" class="cont-txt">{{todo.content}}</el-col>
            </el-row>
          </el-checkbox>
        </el-col>
        <el-col
                :xs="6"
                :sm="2"
        >
          <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  circle
                  @click="editTodoUndone(todo)"
          ></el-button>
          <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  @click="forgoTodoUndone(todo)"
          ></el-button>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <el-row
            type="flex"
            justify="center"
            v-show="checkedTodos.length > 0"
    >
      <el-button
              type="primary"
              @click="todoBeDone"
      >做完啦</el-button>
    </el-row>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        isIndeterminate: false,
        checkAll: false,
        checkedTodos: []
      }
    },
    computed: {
      ...mapState(['todosData'])
    },
    methods: {
      ...mapActions(['getTodosData']),
      moment,
      /**
       * 全选复选框值变动时触发
       *
       * @param {Boolean} val 复选框变动后的值
       */
      handleCheckAllChange(val) {
        if (val) {
          this.checkedTodos = this.todosData.undone.map(todo => {
            return todo._id
          })
        } else {
          this.checkedTodos = []
        }
        this.isIndeterminate = false
      },

      /**
       * 待处理待办项复选框组值变动时触发
       *
       * @param {Array} value 复选框组值变动后的值
       */
      handleCheckedTodosChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.todosData.undone.length
        this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.todosData.undone.length
      },

      /**
       * '删除'按钮点击时触发，放弃该待办项
       *
       * @event button#click
       * @param {Object} todo 待办项对象
       * @param {string} todo._id 待办项id
       */
      async forgoTodoUndone(todo) {
          await this.$http.patch(`/todos/${todo._id}`, { status: 3 })
          await this.getTodosData()
          this.$message.success('该待办项归类至已放弃中')

          // 删除的项如果在删除前是被勾选，则需从checkedTodos中剔除,并更改全选的状态
          this.checkedTodos = this.checkedTodos.filter(todoId => {
            return todoId !== todo._id
          })
          let checkedCount = this.checkedTodos.length
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.todosData.undone.length
      },

      // 前往待办事项编辑页面
      editTodoUndone(todo) {
        this.$router.push({
          name: 'editTodo',
          params: {
            todo
          }
        })
      },

      /**
       * '做完啦'按钮点击时，即待处理待办项完成时触发
       *
       * @event button#click
       */
      todoBeDone() {
        const idStr = this.checkedTodos.join(':')
        this.$http
                .patch(`/todos/${idStr}`, {
                  status: 2
                })
                .then(() => {
                  this.checkedTodos = []
                  this.isIndeterminate = false
                  this.$message.success('该待办项归类至已完成中')
                  this.getTodosData()
                })
      }
    }
  }
</script>

<style lang="less" scoped>
  .todolist-undone{
    .todo-row {
      align-items: center;
      margin: 10px 0;
    }
    // /deep/ or >>> or ::v-deep 是针对element的默认样式是如 el-button[238dbsa]动态的样式的深度检索
    /deep/ .el-checkbox{
      width: 100%;
    }
    /deep/ .el-checkbox__label{
      width: -webkit-fill-available;
    }
    .cont-txt{
      margin-right: 20px;
      word-break: break-all;
      white-space: normal;
    }
    .expired{
      color: red;
    }
  }
</style>
