import { combineReducers } from 'redux-immutable';
import { reducer as HomeReducer } from '../pages/home/store'

export default combineReducers({
    left:HomeReducer
})