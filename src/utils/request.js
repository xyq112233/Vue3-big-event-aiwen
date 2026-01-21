import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 30000,
})
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if(userStore.token){
        config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    
    // TODO 4. 摘取核心响应数据
    // console.log(res);
    if(res.data.code === 0 ){
      return res
    }
    // TODO 3. 处理业务失败
    ElMessage.error(res.data?.message || '服务异常') 
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    //错误特殊情况:401权限不足或者token过期 => 拦截到登录
    if(err.response?.status === 401){
        //1. 清空无效token
        const userStore = useUserStore()
        userStore.removeToken()
        //2. 跳转登录页
        router.push('/login')
        //3. 提示用户
        ElMessage.error('登录过期，请重新登录')
    }

    //默认情况直接给提示
    ElMessage.error(err.data?.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }