import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    // 客户信息
    userInfo:{
        // 客户管理列表
        name:"",
        logo:"",
        list:[],
        customerList:[],
        // 文件列表
        fileList:[],
        // 客户详情
        customerDetail:{},
    },
    spin:false,             // loading
    isAdd:false,
    edit:false,
    isEdit:false,
    homeList:[],
    changeAddStatus:false,
    customerDetail:{},            // 客户详情
    showDetail:false
})

//  点击MiddleList数据
const changeMiddleListAcrtive = (state, action) => {
    let userInfo = state.get('userInfo').toJS()
    // console.log(action.data.customerDetail)
    userInfo.customerDetail = action.data.customerDetail
    let data = userInfo.customerList
    if(action.isEdit){
        data[action.index].active = action.status
    }else{
        for(let i = 0; i < data.length; i ++){
            data[i].active = false
        }
        data[action.index].active = action.status
    }
    
    return state.merge({
        userInfo:fromJS(userInfo)
    })
}

export default ((state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANGE_HOME_DATA:
        return state.merge({
            homeList:fromJS(action.list)
        });
        case constants.CLICK_MIDDLE_LIST:
        return changeMiddleListAcrtive(state, action)
        case constants.IS_LOADING:
        return state.merge({
            spin:fromJS(action.active)
        });
        case constants.IS_ADD:
        return state.merge({
            isAdd:fromJS(action.isAdd)
        });
        case constants.IS_EDIT:
        return state.merge({
            isEdit:fromJS(action.bool)
        });
        
        case constants.CHANGE_ADD_STATUS:
        return state.merge({
            changeAddStatus:fromJS(action.addStatus)
        });
        
        case constants.CHANGE_CUSDETAIL:
        return state.merge({
            customerDetail:fromJS(action.data)
        });
        
        case constants.CHANGE_SHOW:
        return state.merge({
            showDetail:fromJS(action.bool)
        });
        
        case constants.CHANGE_SPIN:
        return state.merge({
            spin:fromJS(action.bool)
        });
        default:
        return state;
    }
})


// CHANGE_SPIN