import axios from 'axios'
import local from '@/untils/local'
import router from '../router'
import jsonBig from 'json-bigint'
// 设置共用的地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 对响应回来的数据转换为对象
axios.defaults.transformResponse = [(data) => {
  try {
    return jsonBig.parse(data)
  } catch (e) {
    return data
  }
}]
// 设置默认的请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => response
  , error => {
  // 对响应错误做点什么  获取状态码  判断是不是401  如果是 跳转登录页面
    if (error.response.status === 401) {
      return router.push('/login')
    }
    return Promise.reject(error)
  })
export default axios
