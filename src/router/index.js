import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/add',
    name: 'addTodo',
    component: () => import(/* webpackChunkName: "addTodo" */ '../views/AddTodo.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/editTodo',
    name: 'editTodo',
    component: () => import(/* webpackChunkName: "editTodo" */ '../views/EditTodo.vue'),
    meta: {requireAuth: true} // 路由元信息，作用：访问该路由可获取到该元信息，用来标识如需身份要求等
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫：判断需要带token访问
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(localStorage.getItem('token')) {
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})

export default router
