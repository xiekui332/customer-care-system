import { fromJS } from 'immutable'
import * as constants from './constants'
import { sessionGetItem } from '../../../api'

const defaultState = fromJS({
    changepwd: sessionGetItem('changepwd')
})

export default ((state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANFE_PWD:
        return action.changepwd
        default:
        return state;
    }
})