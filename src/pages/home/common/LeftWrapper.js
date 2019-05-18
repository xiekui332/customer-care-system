import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import customer from '../../../statics/images/nav_icon_guanli.png'
import message from '../../../statics/images/nav_icon_duanxi.png'
import mine from '../../../statics/images/nav_icon_wo.png'
import { actionCreators } from '../store'
import {
    LeftWrapper,
    LeftTop,
    LeftCustomer,
    LeftItemUl,
    LeftItemLi,
    LeftButton
} from '../style'


class LeftCon extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render () {
        const { changepwd } = this.props;
        const user = JSON.parse(sessionStorage.getItem("user"))

        let part = '';
        if(user.userType === 1) {
            part = "用户管理员"
        }else if(user.userType === 2) {
            part = "客户经理"
        }else if(user.userType === 3) {
            part = "审核员"
        }else if(user.userType === 4) {
            part = "业务管理员"
        }
        // console.log(user)
        return (
            <LeftWrapper>
                <LeftTop>
                    <p>大竹农商银行</p>
                    <p>客户关系系统</p>
                </LeftTop>
                <LeftCustomer>
                    {
                        !user.logo?
                        <span className="iconfont">&#xe61a;</span>:
                        <img src={user.logo} alt="" />
                    }
                    <p>{user.userName } /{ part}</p>
                </LeftCustomer>

                <LeftItemUl
                    ref={(ul) => {this.ul = ul}}>
                    <LeftItemLi className={user.userType === 1?"isShow":"isHide"}
                        ref={(li) => {this.liUser = li}}
                        onClick={() => {this.handleActive(this.ul, this.liUser)}}>
                        {
                            changepwd?
                            <div>
                                <img src={customer} alt="" />
                                <span>用户管理</span>
                            </div>
                            :
                            <Link to={"/user"} replace>
                                <img src={customer} alt="" />
                                <span>用户管理</span>
                            </Link>
                        }
                        
                    </LeftItemLi>
                    <LeftItemLi
                        ref={(li) => {this.liCust = li}}
                        onClick={() => {this.handleActive(this.ul, this.liCust)}}>
                        {
                            changepwd?
                            <div>
                                <img src={customer} alt="" />
                                <span>客户管理</span>
                            </div>
                            :
                            <Link to={"/"} replace>
                                <img src={customer} alt="" />
                                <span>客户管理</span>
                            </Link>
                        }
                        
                    </LeftItemLi>
                    <LeftItemLi className="nowork"
                        ref={(li) => {this.liMess = li}}
                        onClick={() => {this.handleActive(this.ul, this.liMess)}}>
                        {
                            changepwd?
                            <div>
                                <img src={message} alt="" />
                                <span>短信管理</span>
                            </div>
                            :
                            <Link to={"/message"} replace>
                                    <img src={message} alt="" />
                                    <span>短信管理</span>
                            </Link>
                        }
                    </LeftItemLi>
                    <LeftItemLi
                        ref={(li) => {this.liMine = li}}
                        onClick={() => {this.handleActive(this.ul, this.liMine)}}>
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
                            <Link to={"/mine"} replace>
                                <img src={mine} alt="" />  
                                <span>
                                    我的
                                    <i></i>
                                </span> 
                            </Link>
                        }
                    </LeftItemLi>
                </LeftItemUl>

                <LeftButton>
                    <div onClick={() => {this.handleLogout()}}>
                        <Link to="/login">
                            <span className="iconfont">&#xe673;</span>
                            <span>退出</span>
                        </Link>
                    </div>
                    <div>
                        <span className="iconfont">&#xe60a;</span>
                        <span>资料备份</span>
                    </div>
                </LeftButton>
            </LeftWrapper>
        )
        
    }


    componentDidMount() {
        this.props.getHomeData()
    }

    handleLogout() {
        sessionStorage.clear()
    }

    //  点击左侧菜单
    handleActive(ulEl, liEl) {
        let elList = ulEl.childNodes
        for(let i = 0; i < elList.length; i ++) {
            elList[i].classList.remove('handleActice')
        }
        liEl.classList.add('handleActice')

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
    }
})

export default connect(mapState, mapDispatch)(LeftCon) 