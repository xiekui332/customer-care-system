import service from './request'
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
// import { baseUrl } from '../config'

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
        service.post('/user/list', QS.stringify(params))
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
        service.post('/user/detail', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 删除用户
export const userDelete = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/del', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 待办事项列表
export const todoList = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/todo/list', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取客户列表数据
export const getCustomerList = (params, urlType) => {
    let url = ''
    if(urlType === 2) {
        url = '/customer/list'
    }else if(urlType === 3) {
        url = '/customer/auditlist'
    }else if(urlType === 4) {
        url = '/customer/alllist'
    }
    
    return new Promise((resolve, reject) => {
        service.post(url, QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}



// 
export const handlecustomDelete = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/customer/del', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


export const handleUpload = (fileUrl, params) => {
    return new Promise((resolve, reject) => {
        service.post(fileUrl, params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 获取系统参数
export const getsystemData = () => {
    return new Promise((resolve, reject) => {
        service.post('/sys/params')
        
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}



// 添加客户
export const addCustom = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/customer/add', QS.stringify(params))
        // service.post('/customer/add', params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}


// 编辑客户
export const editCustom = (params) => {
    return new Promise((resolve, reject) => {
        // service.post('/customer/edit', QS.stringify(params))
        service.post('/customer/add', params)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })  
}






// 客户详情
export const getCustomerDetail = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/customer/detail', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}



// 客户经理列表
export const toTransfer = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/customermanagers', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 客户移交
export const sureToTransfer = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/customer/transfer', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 发送营销短信
export const changeSendMsg = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/sms/send/market', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 修改手机号
export const changeMobile = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/user/updatemobilephone', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 审核拒绝
export const changeCarefull = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/customer/audit', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


// 更新代办
export const changeTodilist = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/todo/updatereaded', QS.stringify(params))
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}