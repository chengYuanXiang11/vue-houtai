import axios from 'axios'
//全局axios跳转时自动加上路径前缀
const http = axios.create({
    baseURL:'http://localhost:3001/api'
  })

  export default http