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