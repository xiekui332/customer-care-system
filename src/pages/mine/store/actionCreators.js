import * as constants from './constants' 

export const changepwd = (changepwd) => {
    return (dispatch) => {
        const action = {
            type:constants.CHANFE_PWD,
            changepwd
        }

        dispatch(action)
    }
}


export const changeMobile = (type, value) => {
    return (dispatch) => {
        let action = {}
        if(type === 1) {
            action = {
                type:constants.CHANFE_MOBILE_PWD,
                changeOldPwd:value
            }
        }else if(type === 2) {
            action = {
                type:constants.CHANFE_MOBILE,
                changeNewTel:value
            }
        }

        dispatch(action)
    }
}



// 改变我的代办数据
export const changeMineStatus = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_MINE_INDEX,
            bool
        }
        dispatch(action)
    }
}


// 改变我的tel
export const changeMinetel = (bool) => {
    return (dispatch) => {
        let action = {
            type:constants.CHANGE_MINE_TEL,
            bool
        }
        dispatch(action)
    }
}


// changeMinetel