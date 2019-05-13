// import * as constants from './constants'
import { login } from "../../../api"

export const loginStatus = (params) => {
    return (dispatch) => {
        login(params).then((res) => {
            console.log(res)
        })
    }
}