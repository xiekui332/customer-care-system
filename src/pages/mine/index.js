import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Empty, Tabs, Button, Input, message  } from 'antd';
import { sessionGetItem, alterPassword, sessionSetItem } from '../../api'
import { actionCreators } from './store'

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
        this.state = {
            login:sessionGetItem('token'),
            list:[1,2,3,4,5,6,7,8,9],
            panelType:1
        }
    }

    render() {
        const TabPane = Tabs.TabPane;
        const { login, panelType } = this.state;
        const operations = <Button onClick={() => {this.props.handleSave(panelType, this.oldPwd, this.newPwd, this.aginNewPwd, this.changeOldPwd, this.changeNewTel)}}>保存</Button>;
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
                            <Tabs tabBarExtraContent={operations} onTabClick={(key) => {this.setState({panelType:key })}}>
                                <TabPane tab="修改密码" key="1">
                                    <ChangePanel>
                                        <ChangePwoTitle>
                                            旧密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入旧密码"
                                            ref={(input) => this.oldPwd = input}
                                        />
                                        <ChangePwoTitle>
                                            新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新密码"
                                            ref={(input) => this.newPwd = input}
                                        />
                                        <ChangePwoTitle>
                                            确认新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请再次输入新密码"
                                            ref={(input) => this.aginNewPwd = input}
                                        />
                                    </ChangePanel>
                                </TabPane>
                                <TabPane tab="更换手机账号" key="2">
                                    <ChangePanel>
                                        <ChangePwoTitle>
                                        密码    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入登录密码"
                                            ref={(input) => this.changeOldPwd = input}
                                        />
                                        <ChangePwoTitle>
                                        新手机号    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新手机号码"
                                            ref={(input) => this.changeNewTel = input}
                                        />
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
    
})

const mapDispatch = (dispatch) => ({
    // 修改密码
    handleSave(panelType, oldPwd, newPwd, aginNewPwd, changeOldPwd, changeNewTel) { 
        let params = {}
        // panelType === 1 是修改密码
        if(panelType === 1) {
            sessionSetItem('changepwd', false)
            const action = actionCreators.changepwd(sessionGetItem('changepwd'))
            dispatch(action)
            
            if(!newPwd.input.value) {
                message.error('请输入新密码');
            }else if(newPwd.input.value !== aginNewPwd.input.value) {
                message.error('两次输入密码不一致');
            }else {
                params = {
                    userId:sessionGetItem('user').userId,
                    oldPwd:oldPwd.input.value,
                    password:newPwd.input.value
                }
                alterPassword(params)
                .then((res) => {
                    console.log(res)
                    if(res.code === 1 && res.msg === 'success') {
                        sessionSetItem('changepwd', false)
                        this.setState({
                            changepwd:false
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            }
            
            
        }else{

        }
    }

})

export default connect(mapState, mapDispatch)(Mine)