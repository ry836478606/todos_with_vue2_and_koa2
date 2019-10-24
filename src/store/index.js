import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 获取所有待办项的数据
    todosData: {
      undone: [],
      done: [],
      forgone: [],
    },
    // 代办事项类型： 1:日, 2:周, 3:月, 4:年
    todoType: 1,
  },
  mutations: {
    changeTodosData(state, payload) {
      state.todosData = payload.todosData
    }
  },
  actions: {
    getTodosData({state, commit}) {
      return new Promise((resolve) => {
        Vue.prototype.$http.get("/todos", {
          params: {
            type: state.todoType
          }
        }).then(res => {
          commit('changeTodosData', {
            todosData: res.data.data
          })
          resolve()
        })
      })
    }
  },
  modules: {
  }
})
