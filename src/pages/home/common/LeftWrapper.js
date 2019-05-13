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
    
    render () {
        const { userInfo } = this.props;
        return (
            <LeftWrapper>
                <LeftTop>
                    <p>大竹农商银行</p>
                    <p>客户关系系统</p>
                </LeftTop>
                <LeftCustomer>
                    {
                        userInfo.logo === ""?
                        <span className="iconfont">&#xe61a;</span>:
                        <img src={userInfo.logo} alt="" />
                    }
                    <p>{userInfo.name}/{userInfo.part}</p>
                </LeftCustomer>

                <LeftItemUl>
                    <LeftItemLi>
                        <Link to={"/"} replace>
                            <img src={customer} alt="" />
                            <span>客户管理</span>
                        </Link>
                    </LeftItemLi>
                    <LeftItemLi>
                        <Link to={"/message"} replace>
                                <img src={message} alt="" />
                                <span>短信管理</span>
                        </Link>
                    </LeftItemLi>
                    <LeftItemLi>
                        <Link to={"/mine"} replace>
                            <img src={mine} alt="" />  
                            <span>
                                我的
                                <i></i>
                            </span> 
                        </Link>
                    </LeftItemLi>
                </LeftItemUl>

                <LeftButton>
                    <div>
                        <span className="iconfont">&#xe673;</span>
                        <span>退出</span>
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
}

const mapState = (state) => ({
    userInfo:state.getIn(['left', 'userInfo']).toJS()
})

const mapDispatch = (dispatch) => ({
    // 获取首页数据
    getHomeData() {
        const action = actionCreators.getMiddleList()
        dispatch(action)
    }
})

export default connect(mapState, mapDispatch)(LeftCon) 