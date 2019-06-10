import * as constants from './constants'




// 获取MiddleList数据
export const getMiddleList = (data) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_HOME_DATA,
            list:data
        }
        dispatch(action)
    }
}




// 点击新建客户派发action
export const changeIsAdd = (params) => {
    return (dispatch) => {
        let action = {
            type:constants.IS_ADD,
            isAdd:params.isAdd
        }
        dispatch(action)
    }
};


// 添加客户成功状态
export const changeAddStatus = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_ADD_STATUS,
            addStatus:bool
        }
        dispatch(action)
    }
}


// 查询客户详情
export const changeCusDetail = (data) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_CUSDETAIL,
            data
        }
        dispatch(action)
    }
}  


// 改变展示客户详情状态
export const changeShowDetail = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_SHOW,
            bool
        }
        dispatch(action)
    }
} 

// 加载中状态 changeSpin

export const changeSpin = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_SPIN,
            bool
        }
        dispatch(action)
    }
} 

// 我的短消息状态 

export const changeMineData = (data) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_MINE_STATUS,
            data
        }
        dispatch(action)
    }
} 

// 编辑客户状态 

export const changeCusEdit = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_EDIT_STATUS,
            bool
        }
        dispatch(action)
    }
} 



// changefileList
