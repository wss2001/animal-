
import axios from "axios";
// 引入 axios 实例
import type {AxiosInstance} from "axios";
// 引入进度条
//@ts-ignore
import nprogress from 'nprogress'
// // 引入进度条样式
import 'nprogress/nprogress.css'
const requests = axios.create({
  baseURL:'/api',
  timeout:30000
})
requests.interceptors.request.use(config=>{
  // 进度条开始运行
  nprogress.start()
  return config
})
requests.interceptors.response.use((res)=>{
  // 进度条结束运行
  nprogress.done()
  return res.data
},(error)=>{
  return error
})
export default requests