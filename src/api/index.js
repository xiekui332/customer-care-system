import service from './request'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
// const baseUrl = "http://148.70.204.30";

//login
export const login = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/login', QS.stringify(params))
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
        service.post('/user/smsfindpwd', QS.stringify(params))
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
        service.post('/user/updatepwdbyold', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
} 

// 检测手机号
export const checkmobile = /^1[34578]\d{9}$/

// 检测身份证号
export const checkidCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 创建用户
export const createUser = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/save', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取用户列表
export const userList = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/list', params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 获取用户详情
export const userDetail = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/detail', params)
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