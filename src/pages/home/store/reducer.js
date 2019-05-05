import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    // 客户信息
    userInfo:{
        // 客户管理列表
        name:"",
        logo:"",
        list:[
            
        ],
        customerList:[
            
        ],
        // 文件列表
        fileList:[
            
        ],

        // 客户详情
        customerDetail:{
           
        },

    },

    
    // loading
    spin:false
    

})

//  点击MiddleList数据
const changeMiddleListAcrtive = (state, action) => {
    let userInfo = state.get('userInfo').toJS()
    // console.log(action.data.customerDetail)
    userInfo.customerDetail = action.data.customerDetail
    let data = userInfo.customerList
    for(let i = 0; i < data.length; i ++){
        data[i].active = false
    }
    data[action.index].active = action.status
    return state.merge({
        userInfo:fromJS(userInfo)
    })
}

export default ((state = defaultState, action) => {
    switch(action.type) {
        case constants.CHANGE_HOME_DATA:
        return state.merge({
            userInfo:fromJS(action.list.data)
        });
        case constants.CLICK_MIDDLE_LIST:
        return changeMiddleListAcrtive(state, action)
        case constants.IS_LOADING:
        return state.merge({
            spin:fromJS(action.active)
        });
        default:
        return state;
    }
})