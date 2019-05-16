import * as constants from './constants'
import { login } from "../../../api"

export const loginStatus = (params, notoken) => {
    return (dispatch) => {
        if(notoken) {
            let action = {
                type:constants.CHANGE_TOKEN,
                token:null
            }
            
            dispatch(action)
        }else{
            login(params).then((res) => {
                let data = res.data;
                let token = null;
                if(data.code === 1 && data.msg === "success") {
                    token = data.data.token;
                    sessionStorage.setItem(
                        "token", token
                    );
                    sessionStorage.setItem(
                        "time", new Date().getTime()
                    );
                    sessionStorage.setItem(
                        "user", JSON.stringify(data.data.user)
                    );
                    let action = {
                        type:constants.CHANGE_TOKEN,
                        token,
                        pwd:params.password
                    }
                    dispatch(action)
                }
            })
        }
        
    }
}