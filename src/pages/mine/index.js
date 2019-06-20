import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Empty, Tabs, Button, Input, message  } from 'antd';
import { sessionGetItem, alterPassword, sessionSetItem, checkmobile, changeMobile, changeTodilist, todoList } from '../../api'
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
            userId:JSON.parse(sessionStorage.getItem("user")).userId,
            login:sessionGetItem('token'),
            panelType:1,
            data:[],
            mineData:[],
            user:JSON.parse(sessionStorage.getItem("user"))
        }
        this.handleUptodo = this.handleUptodo.bind(this)
    }

    render() {
        const TabPane = Tabs.TabPane;
        const { changeOldPwd, changeNewTel } = this.props;
        const { login, panelType } = this.state;
        const user = this.state.user
        let part = '';
        if(user) {
            if(user.userType === 1) {
                part = "用户管理员"
            }else if(user.userType === 2) {
                part = "客户经理"
            }else if(user.userType === 3) {
                part = "审核员"
            }else if(user.userType === 4) {
                part = "业务管理员"
            }
        }
        
        let mineData = this.state.mineData
        
        // console.log(mineData)
        // console.log(this.props.mineData)
        const operations = <Button onClick={() => {this.props.handleSave(panelType, this.oldPwd, this.newPwd, this.aginNewPwd, this.changeOldPwd, this.changeNewTel, user, changeOldPwd, changeNewTel)}}>保存</Button>;
        

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
                            {
                                part === '客户经理'?
                                <Fragment>
                                    <ToDealt>待办事项</ToDealt>
                                    {
                                        // console.log(mineData)
                                    }
                                    {   
                                        mineData?
                                        mineData.map((item, index) => {
                                            return (
                                                <ToDealtItem key={item.todoId}>
                                                    {item.content}
                                                    <span className="iconfont" onClick={() => {this.updateTodolist(item.todoId, index, mineData)}}>×</span>
                                                    <div>
                                                        {/* <div>理由: {}</div> */}
                                                        <div className="todoTime">{item.createTime}</div>
                                                        <div className="todoSource">来自<span>{item.sourceName}</span></div>
                                                        <div className="clear"></div>
                                                    </div>
                                                </ToDealtItem>
                                            )
                                        }):<Empty description="暂无事项" className="empty" />
                                    }

                                </Fragment>
                                :""
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
                                            type='password'
                                            ref={(input) => this.oldPwd = input}
                                        />
                                        <ChangePwoTitle>
                                            新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新密码"
                                            type='password'
                                            ref={(input) => this.newPwd = input}
                                        />
                                        <ChangePwoTitle>
                                            确认新密码
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请再次输入新密码"
                                            type='password'
                                            ref={(input) => this.aginNewPwd = input}
                                        />
                                    </ChangePanel>
                                </TabPane>
                                <TabPane tab="更换手机号码" key="2">
                                    <ChangePanel>
                                        <ChangePwoTitle>
                                        密码    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入登录密码"
                                            ref={(input) => this.changeOldPwd = input}
                                            type='password'
                                            // value={changeOldPwd}
                                            // onChange={() => {this.handelChange(1, this.changeOldPwd)}}
                                        />
                                        <ChangePwoTitle>
                                        新手机号    
                                        </ChangePwoTitle>
                                        <Input className="change-pwo-input" placeholder="请输入新手机号码"
                                            ref={(input) => this.changeNewTel = input}
                                            // value={changeNewTel}
                                            // onChange={() => {this.handelChange(2, this.changeNewTel)}}
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

    componentDidMount() {
        this.handleUptodo()
    }

    componentDidUpdate() {
        if(this.props.minetel) {
            this.setState({
                user:sessionGetItem('user')
            }, () => {
                this.props.handleMinetel(false)
                return
            })
        }
    }


    handelChange(type, el) {
        this.props.dishandleMbile(type, el.input.value)
        
    }

    // 更新待办事项
    updateTodolist(id, index, mineData) {
        let params = {
            todoId:id
        }
        changeTodilist(params).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('消息已关闭')
                this.handleUptodo()
                // mineData.splice(index, 1)
                // this.setState({
                //     mineData:mineData
                // }, () => {
                //     if(mineData.length) {
                //         this.props.handleMineStatus(true)
                //     }else{
                //         this.props.handleMineStatus(false)
                //     }
                    
                // })
                
            } else{
                message.success(data.msg)
            }
        })
    }

    handleUptodo() {
        let params = {
            userId:this.state.userId
        }
        todoList(params).then((res) => {
            let data = res.data;
            // console.log(data)
            if(data.code === 1 && data.msg === 'success') {
               
                if(data.data) {
                    this.setState({
                        mineData:data.data
                    })
                    
                }else{
                    this.setState({
                        mineData:data.data
                    })
                }
            }
        })
    }


    
}

const mapState = (state) => ({
    // mineData:state.getIn(['left', 'mineData']).toJS(),
    changeOldPwd:state.getIn(['mine', 'changeOldPwd']),
    changeNewTel:state.getIn(['mine', 'changeNewTel']),
    minetel:state.getIn(['mine', 'minetel'])
})

const mapDispatch = (dispatch) => ({
    // 修改密码
    handleSave(panelType, oldPwd, newPwd, aginNewPwd, changeOldPwd, changeNewTel, user) { 
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
            let changepwd = sessionGetItem('changepwd')
            // if(!changepwd) {
            //     if(!changeOldPwd.input.value) {
            //         message.error('请填写密码')
            //         return
            //     }
            // }
            if(!changeOldPwd.input.value) {
                message.error('请填写密码')
                return
            }
            if(!checkmobile.test(changeNewTel.input.value)) {
                message.error('请输入正确的手机号')
                return
            }
            
            let params = {
                userId:user.userId,
                password:changeOldPwd.input.value,
                mobilePhone:changeNewTel.input.value
            }


            changeMobile(params).then((res) => {
                let data = res.data
                if(data.code === 1 && data.msg === 'success') {
                    message.success('修改成功')
                    let newUser = sessionGetItem('user')
                    newUser.mobilePhone = changeNewTel.input.value
                    sessionSetItem('user', newUser)
                    const action_thr = actionCreators.changeMinetel(true)
                    dispatch(action_thr)
                    // console.log(sessionGetItem('user'))
                    changeOldPwd.input.value = ''
                    changeNewTel.input.value = ''
                    let action = actionCreators.changeMobile(1, '')
                    dispatch(action)
                    let action_two = actionCreators.changeMobile(2, '')
                    dispatch(action_two)    
                }else{
                    message.error(data.msg)
                }
            })
        }
    },

    // 派发修改手机号
    dishandleMbile(type, value) {
        let action = actionCreators.changeMobile(type, value)
        dispatch(action)
    },

    // 派发我的状态
    handleMineStatus(bool) {
        const action = actionCreators.changeMineStatus(bool)
        dispatch(action)
    },
    
    handleMinetel(bool) {
        const action = actionCreators.changeMinetel(bool)
        dispatch(action)
    }


})

export default connect(mapState, mapDispatch)(Mine)