import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import customer from '../../../statics/images/nav_icon_guanli.png'
import message from '../../../statics/images/nav_icon_duanxi.png'
import mine from '../../../statics/images/nav_icon_wo.png'
import { actionCreators } from '../store'
import { todoList, ziliaoDownload, fujianDownload } from '../../../api'
import { baseUrl_down } from '../../../config'

import {
    LeftWrapper,
    LeftTop,
    LeftCustomer,
    LeftItemUl,
    LeftItemLi,
    LeftButton
} from '../style'


class LeftCon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:JSON.parse(sessionStorage.getItem("user")).userId,
            msg:false
        }

        this.loadFile = this.loadFile.bind(this)
    }

    render () {
        const { changepwd } = this.props;
        const { msg } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        const userType = JSON.parse(sessionStorage.getItem("userType"))
        // console.log(user)
        // console.log(userType)
        // 修改usertype
        user.userType = userType

        let part = '';
        if(userType === 1) {
            part = "用户管理员"
        }else if(userType === 2) {
            part = "客户经理"
        }else if(userType === 3) {
            part = "审核员"
        }else if(userType === 4) {
            part = "业务管理员"
        }

        return (
            <LeftWrapper>
                <LeftTop>
                    <p>大竹农商银行</p>
                    <p>客户关系系统</p>
                </LeftTop>
                <LeftCustomer>
                    {
                        !user.logo?
                        // <span className="iconfont">&#xe633;</span> 
                        <div className="moren-img"></div>
                        :
                        <img src={user.logo} alt="" />
                    }
                    <p>{user.name} {user.name?"/":""} {part}</p>
                </LeftCustomer>

                <LeftItemUl
                    ref={(ul) => {this.ul = ul}}>
                    {
                        user.userType === 2 || user.userType === 3 || user.userType === 4?
                        <LeftItemLi
                            ref={(li) => {this.liCust = li}}
                            >
                            {
                                changepwd?
                                <div>
                                    <img src={customer} alt="" />
                                    <span>客户管理</span>
                                </div>
                                :
                                <NavLink to={"/home"} replace activeClassName="handleActice" >
                                    <img src={customer} alt="" />
                                    <span>客户管理</span>
                                </NavLink>
                            }
                            
                        </LeftItemLi>
                        :""
                    }
                    
                    
                    {
                        user.userType === 1?
                        <LeftItemLi 
                            ref={(li) => {this.liUser = li}}
                            >
                            {
                                changepwd?
                                <div>
                                    <img src={customer} alt="" />
                                    <span>用户管理</span>
                                </div>
                                :
                                <NavLink to={"/user"} replace activeClassName="handleActice">
                                    <img src={customer} alt="" />
                                    <span>用户管理</span>
                                </NavLink>
                            }
                            
                        </LeftItemLi>
                        :""
                    }

                    {
                        user.userType === 1?
                        <LeftItemLi 
                        // className="nowork"
                            ref={(li) => {this.liMess = li}}
                            >
                            {
                                changepwd?
                                <div>
                                    <img src={message} alt="" />
                                    <span>营销短信</span>
                                </div>
                                :
                                <NavLink to={"/message"} replace activeClassName="handleActice">
                                        <img src={message} alt="" />
                                        <span>营销短信</span>
                                </NavLink>
                            }
                        </LeftItemLi>
                        :""
                    }
                    
                    <LeftItemLi
                        ref={(li) => {this.liMine = li}}
                        >
                        {
                            changepwd?
                            <div>
                                <img src={mine} alt="" />  
                                <span>
                                    我的
                                    <i></i>
                                </span> 
                            </div>
                            :
                            <NavLink to={"/mine"} replace activeClassName="handleActice">
                                <img src={mine} alt="" />  
                                <span>
                                    我的
                                    {   
                                        user.userType === 2?
                                        <Fragment>
                                            {
                                                msg?
                                                <i></i>
                                                :''
                                            }
                                        </Fragment>
                                        :''
                                    }
                                    
                                </span> 
                            </NavLink>
                        }
                    </LeftItemLi>
                </LeftItemUl>

                <LeftButton>
                    <div onClick={() => {this.handleLogout()}}>
                        <Link to="/login">
                            {/* <span className="iconfont">&#xe673;</span> */}
                            <div className="reset-tuichu">

                            </div>
                            <span>退出</span>
                        </Link>
                    </div>
                    {
                        user.userType === 1?
                        <div onClick={() => {this.beifen()}}>
                            {/* <span className="iconfont">&#xe60a;</span> */}
                            <div className="reset-beifen"></div>
                            <span>备份管理 </span>
                        </div>
                        :''
                    }
                    
                </LeftButton>
            </LeftWrapper>
        )
        
    }


    componentDidMount() {
        this.props.getHomeData()
        let params = {
            userId:this.state.userId
        }

        todoList(params).then((res) => {
            let data = res.data;
            // console.log(data)
            if(data.code === 1 && data.msg === 'success') {
                // data.data = [
                //     {
                //         "todoId": 2,
                //         "userId": 1,
                //         "bizId": 1,
                //         "content": "客户张三3天后生日",
                //         "createTime": "2019-05-01 18:09:30"
                //     }
                // ]
                if(data.data) {
                    
                    this.setState({
                        msg:true
                    }, () => {
                        this.props.handleMineDate(data.data)
                    })
                    
                }else{
                    this.setState({
                        msg:false
                    })
                }
            }
        })
    }

    handleLogout() {
        sessionStorage.clear()
        
    }

    beifen() {
        ziliaoDownload().then((res) => {
            var fileName = res.headers['content-disposition'].split(";")[1].split("filename=")[1];
            this.loadFile(fileName, res.data)
        })

        fujianDownload().then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                let url = data.data.url
                var aLink = document.createElement('a');
                aLink.target = '_blank'
                aLink.href = url;
                aLink.click();
            }else{

            }
            console.log(data)

        })
    }


    loadFile(fileName, content){
        var aLink = document.createElement('a');
        var blob = new Blob([content], {
            type: 'text/plain'
         });
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        URL.revokeObjectURL(blob);
    }



    
}

const mapState = (state) => ({
    login:state.getIn(['login', 'isLogin']),
    changepwd:state.getIn(['mine', 'changepwd'])
})

const mapDispatch = (dispatch) => ({
    // 获取首页数据
    getHomeData() {
        const action = actionCreators.getMiddleList()
        dispatch(action)
    },

    // 派发我的状态
    handleMineDate(data) {
        const action = actionCreators.changeMineData(data)
        dispatch(action)
    }
})

export default connect(mapState, mapDispatch)(LeftCon) 