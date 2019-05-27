import { fromJS } from 'immutable'
import * as constants from './constants'
import { sessionGetItem } from '../../../api'

const defaultState = fromJS({
    changepwd: sessionGetItem('changepwd'),
    changeOldPwd:'',
    changeNewTel:''
})

export default ((state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANFE_PWD:
        return action.changepwd
        
        case constants.CHANFE_MOBILE_PWD:
        return state.merge({
            changeOldPwd:fromJS(action.changeOldPwd)
        })
        
        case constants.CHANFE_MOBILE:
        return state.merge({
            changeNewTel:fromJS(action.changeNewTel)
        })

        default:
        return state;
    }
})