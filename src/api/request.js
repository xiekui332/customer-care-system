import axios from 'axios'

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 10000, // 请求超时时间
    withCredentials: true // 选项表明了是否是跨域请求
})


// request
service.interceptors.request.use(
    config => {
        if(sessionStorage.getItem("token")) {
            config.headers = {
                "Authorization":"Bearer " + JSON.parse(sessionStorage.getItem("token")),
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        return config;
    }, err => {
        console.log('请求失败')
        return Promise.reject(err)
    }
)

// response
service.interceptors.response.use(config => {
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})


export default service