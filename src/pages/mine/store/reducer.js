import { fromJS } from 'immutable'
import * as constants from './constants'
import { sessionGetItem } from '../../../api'

const defaultState = fromJS({
    changepwd: sessionGetItem('changepwd'),
    changeOldPwd:'',
    changeNewTel:'',
    newMineStatus:false,
    minetel:false
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
        
        case constants.CHANGE_MINE_INDEX:
        return state.merge({
            newMineStatus:fromJS(action.bool)
        })
        
        case constants.CHANGE_MINE_TEL:
        return state.merge({
            minetel:fromJS(action.bool)
        })

        default:
        return state;
    }
})