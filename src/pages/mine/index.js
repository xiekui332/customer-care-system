import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Empty, Tabs, Button, Input  } from 'antd';

import { 
    MineWrapepr,
    MineCon,
    MineMiddle,
    MineMessage,
    UserName,
    UserRole,
    UserNumberWrapper,
    UserNumPhone,
    UserNumIdcard,
    ToDealt,
    ToDealtItem,
    MineRight,
    ChangePanel,
    ChangePwoTitle
 } from "./style";

class Mine extends PureComponent {
    constructor(props){
        super(props)
        this.state = ({
            list:[1,2,3,4,5,6,7,8,9]
        })
    }

    render() {
        const TabPane = Tabs.TabPane;
        const operations = <Button>保存</Button>;
        const { login }  = this.props;
        if(login){
            return(
                <MineWrapepr>
                    <LeftCon/>
                    <MineCon>
                        <MineMiddle className="editSrollBar">
                            <p className="mine-title">我的</p>

                            <MineMessage>
                                <div>
                                    <UserName>考辛斯 </UserName><UserRole> / 客户经理</UserRole>
                                </div>
                                <UserNumberWrapper>
                                    <UserNumPhone>18665898988</UserNumPhone>
                                    <UserNumIdcard>1422341865332165</UserNumIdcard>
                                </UserNumberWrapper>
                            </MineMessage>

                            <ToDealt>待办事项</ToDealt>

                            {   
                                this.state.list.length > 0?
                                this.state.list.map((item, index) => {
                                    return (
                                        <ToDealtItem key={item}>
                                            这里是收到的待办事项，一般是系统通知这里 不会收到短信内容
                                            <span className="iconfont">×</span>
                                        </ToDealtItem>
                                    )
                                }):<Empty description="暂无内容" className="empty" />
                            }
                            
                        </MineMiddle>

                        <MineRight>
                            <Tabs tabBarExtraContent={operations}>
                                <TabPane tab="修改密码" key="1">
                                    <ChangePanel>
                                        <ChangePwoTitle>
                                            旧密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入旧密码" />
                                        <ChangePwoTitle>
                                        新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新密码" />
                                        <ChangePwoTitle>
                                        确认新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请再次输入新密码" />
                                    </ChangePanel>
                                </TabPane>
                                <TabPane tab="更换手机账号" key="2">
                                    <ChangePanel>
                                        <ChangePwoTitle>
                                        密码    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入登录密码" />
                                        <ChangePwoTitle>
                                        新手机号    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新手机号码" />
                                    </ChangePanel>
                                </TabPane>
                            </Tabs>
                        </MineRight>
                    </MineCon>
                </MineWrapepr>
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }
    }
}

const mapState = (state) => ({
    login:state.getIn(['login', 'isLogin'])
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, mapDispatch)(Mine)