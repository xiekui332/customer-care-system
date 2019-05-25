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
            panelType:1,
            data:[]
        }
    }

    render() {
        const TabPane = Tabs.TabPane;
        const { login, panelType } = this.state;
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
        let mineData = []
        if(this.props.mineData && this.props.mineData.length) {
            mineData = this.props.mineData
        }
        // console.log(mineData)
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
                                    <UserName>{user.name} </UserName><UserRole> / {part}</UserRole>
                                </div>
                                <UserNumberWrapper>
                                    <UserNumPhone>{user.mobilePhone}</UserNumPhone>
                                    <UserNumIdcard>{user.idcard}</UserNumIdcard>
                                </UserNumberWrapper>
                            </MineMessage>

                            <ToDealt>待办事项</ToDealt>

                            {   
                                mineData && mineData.length?
                                mineData.map((item, index) => {
                                    return (
                                        <ToDealtItem key={item.todoId}>
                                            {item.content}
                                            <span className="iconfont">×</span>
                                        </ToDealtItem>
                                    )
                                }):<Empty description="暂无事项" className="empty" />
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
    mineData:state.getIn(['left', 'mineData']).toJS()
})

const mapDispatch = (dispatch) => ({
    // 修改密码
    handleSave(panelType, oldPwd, newPwd, aginNewPwd, changeOldPwd, changeNewTel) { 
        let params = {}
        // panelType === 1 是修改密码
        if(panelType === 1) {
            
            if(sessionGetItem('changepwd')) {
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
                    alterPassword(params, sessionGetItem('token'))
                    .then((res) => {
                        let data = res.data;
                        if(data.code === 1 && data.msg === 'success') {
                            sessionSetItem('changepwd', false)
                            const action = actionCreators.changepwd(sessionGetItem('changepwd'))
                            dispatch(action)
                            message.success('修改成功');
                            newPwd.input.value = ''
                            aginNewPwd.input.value = ''
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
    
                }
            }else{
                if(!oldPwd.input.value) {
                    message.error('请输入旧密码');
                }
                else if(!newPwd.input.value) {
                    message.error('请输入新密码');
                }else if(newPwd.input.value !== aginNewPwd.input.value) {
                    message.error('两次输入密码不一致');
                }else {
                    params = {
                        userId:sessionGetItem('user').userId,
                        oldPwd:oldPwd.input.value,
                        password:newPwd.input.value
                    }
                    alterPassword(params, sessionGetItem('token'))
                    .then((res) => {
                        let data = res.data;
                        if(data.code === 1 && data.msg === 'success') {
                            sessionSetItem('changepwd', false)
                            const action = actionCreators.changepwd(sessionGetItem('changepwd'))
                            dispatch(action)
                            message.success('修改成功');
                            oldPwd.input.value = ''
                            newPwd.input.value = ''
                            aginNewPwd.input.value = ''
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
    
                }
            }
            
            
            
            
        }else{

        }
    }
})

export default connect(mapState, mapDispatch)(Mine)