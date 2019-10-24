<template>
  <div class="index">
    <el-tabs
      v-model="activeTab"
      type="border-card"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
      >
        <TodoList
          @add-todo="addTodo"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import TodoList from '../components/TodoList.vue'

  export default {
    name: 'home',
    components: {
      TodoList
    },
    data() {
      return {
        tabs: [
          {
            value: "1",
            label: "今日待办"
          }
        ],
        activeTab: "1",
      }
    },
    methods: {
      ...mapActions([
        'getTodosData'
      ]),
      addTodo() {
        // 跳转到添加todo页
        this.$router.push('/add')
      }
    },
    created() {
      this.getTodosData()
    }
  }
</script>

<style lang="less" scoped>

</style>
