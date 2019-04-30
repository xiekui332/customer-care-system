import axios from 'axios'

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 10000, // 请求超时时间
    withCredentials: true // 选项表明了是否是跨域请求
})

service.interceptors.request.use(config => {
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})

//拦截响应
service.interceptors.response.use(config => {
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(
    response => {
      /**
      * code为非000000是抛错 可结合自己业务进行修改
      */
      return response
    },
    error => {
      return Promise.reject(error)
    }
)

export default service