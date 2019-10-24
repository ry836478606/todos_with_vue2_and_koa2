import Vue from 'vue'
import axios from 'axios'
import router from '../router'

// 全局请求loading
let loading = ''

const axiosInstance = axios.create({
    baseURL: '/api'
})

// token头部
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token') || '';

// 请求拦截
axiosInstance.interceptors.request.use((config) => {
    loading = Vue.prototype.$loading({ fullscreen: true })
    return config
}, (error) => {
    loading.close()
    Vue.prototype.$message.error('加载超时')
    return Promise.reject(error)
})

// 响应拦截，请求状态非200系列执行error函数，封装错误接口提示
axiosInstance.interceptors.response.use((response) => {
    loading.close()
    return response
}, (error) => {
    loading.close()
    if (error.response.status === 401) { // 401需重新登录
        localStorage.removeItem('token')
        router.push('/login')
    }else{
        if (error.response) {
            Vue.prototype.$message.error(error.response.data.meta.message)
        }
    }
    return Promise.reject(error)
})

Vue.prototype.$http = axiosInstance
