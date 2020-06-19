import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'default-passive-events'
import axios from 'axios'
import 'lib-flexible/flexible.js'
import Debounce from './views/custom/antiShake'



// const BASEURL= process.env.NODE_ENV === 'production' ? '' : '/api'

// import http from './http/http.js'
//设置全局axios
// Vue.prototype.$http = http
// Vue.prototype.$ajax = axios
// 全局axios跳转时自动加上路径前缀
Vue.prototype.$ajax = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  // baseURL:'http://localhost:8080',
  timeout:5000,
})
axios.defaults.withCredentials = true;//每次请求，无论是否跨域，都带上cookie信息

// // 发送请求前，携带token,用于验证用户名密码等
Vue.prototype.$ajax.interceptors.request.use(function(config) {
if(localStorage.token){
  config.headers.Authorization = localStorage.getItem('token')
}
  // console.log('请求前')
  // console.log(config)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 配置中文误提示

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('v-chart', ECharts)



 // 防抖节流

  Vue.component('Debounce',Debounce)



// import YanZheng from './views/custom/yanzheng'

// Vue.use(YanZheng)

//qui富文本
import  VueQuillEditor from 'vue-quill-editor'

// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
