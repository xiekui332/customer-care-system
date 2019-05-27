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