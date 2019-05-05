import * as constants from './constants'
import { getHomeData, getCustomerDetail } from "../../../api"

// 获取MiddleList数据
export const getMiddleList = () => {
    return (dispatch) => {
        getHomeData().then((res) => {
            let result = res.data;
            // console.log(result)
            if(result.success === true){
                let action = {
                    type:constants.CHANGE_HOME_DATA,
                    list:result
                }
                dispatch(action)
            }
        })
        .catch((err) => {

        })
    }
}

// 点击MiddleList数据
export const clickMiddleList = (index, id, active) => {
    return (dispatch) => {
        
        if(active === true){
            return
        }

        let action = {
            type:constants.IS_LOADING,
            active:true
        }
        dispatch(action)

        getCustomerDetail(id).then((res) => {
            let result = res.data;
            // console.log(result)
            if(result.success === true){
                let action = {
                    type:constants.CLICK_MIDDLE_LIST,
                    status:true,
                    index,
                    data:result
                }
                dispatch(action)

                let action_two = {
                    type:constants.IS_LOADING,
                    active:false
                }
                dispatch(action_two)
            }
        })

        
        
    }
}