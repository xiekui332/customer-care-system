import service from './request'
// import QS from 'qs' // 引入qs模块，用来序列化post类型的数据

// 获取搜所数据
export const getHomeList = () => {
    return new Promise((resolve, reject) => {
        service.get('/api/headerList.json')
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err.data)
        })
    })
};

// 获取home页数据

export const getHomeData = () => {
    return new Promise((resolve, reject) => {
        service.get('/api/home.json')
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
};


// 加载更多
export const getMoreData = () => {
    return new Promise((resolve, reject) => {
        service.get('/api/homeList.json')
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