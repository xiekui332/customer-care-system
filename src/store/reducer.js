import { combineReducers } from 'redux-immutable';
import { reducer as HomeReducer } from '../pages/home/store'
import { reducer as LoginReducer } from '../pages/login/store'
import { reducer as MessageReducer } from '../pages/message/store'
import { reducer as MineReducer } from '../pages/mine/store'

export default combineReducers({
    left:HomeReducer,
    login:LoginReducer,
    message:MessageReducer,
    mine:MineReducer
})