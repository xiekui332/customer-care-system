import * as constants from './constants'
import { getHomeData } from "../../../api"

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
export const clickMiddleList = (index) => {
    return (dispatch) => {
        let action = {
            type:constants.CLICK_MIDDLE_LIST,
            status:true,
            index
        }
        dispatch(action)
    }
}