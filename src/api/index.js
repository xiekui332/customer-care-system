import service from './request'
// import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

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