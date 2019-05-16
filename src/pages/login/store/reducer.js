import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    isLogin:sessionStorage.getItem('token'),
    pwd:''
})

export default ((state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANGE_TOKEN:
        return state.merge({
            isLogin:action.token,
            pwd:fromJS(action.pwd)
        })
        default:
        return state;
    }
})