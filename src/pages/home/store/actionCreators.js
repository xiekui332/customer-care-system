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






