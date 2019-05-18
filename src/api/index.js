import service from './request'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
const baseUrl = "http://148.70.204.30";

//login
export const login = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/login', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 发送验证码
export const sendCode = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/smsfindpwd', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取session数据
export const sessionGetItem = (params) => {
    return JSON.parse(sessionStorage.getItem(params))
}

// 存储session数据
export const sessionSetItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}




// 登陆后修改密码
export const alterPassword = (params) => {
    return new Promise((resolve, reject) => {
        service.post(baseUrl + '/user/updatepwdbyold', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
} 






// 获取home页数据

export const getHomeData = () => {
    return new Promise((resolve, reject) => {
        service.get('/api/userInfo.json')
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
};

// 登陆
export const userLogin = (count, passWord) => {
    return new Promise((resolve, reject) => {
        service.get('/api/login.json?count=' + count + '&passWord=' + passWord)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
};


// 客户详情
export const getCustomerDetail = (id) => {
    return new Promise((resolve, reject) => {
        service.get('/api/customerDetail.json')
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}