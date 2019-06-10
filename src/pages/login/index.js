import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { sendCode } from '../../api'
import { Modal, message } from 'antd';
import { login, sessionGetItem, sessionSetItem } from "../../api"

import { 
    LoginWrapper ,
    BackLogo,
    RightWrapper,
    LoginTitle,
    LoginInputWrapper,
    UserInput,
    LoginButtonWapper,
    LoginYes,
    LoginFind,
    LoginTips,
    LoginCondition,
    FindWrapper,
    MessageInput,
    MessageButton,
    FindTips
} from './style'

class Login extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            login:false,
            msg:'',
            status:false,           // 错误提示
            loginCondition:true,     // 登录和找回密码切换
            captchaCode:true,         // 验证码
            captchaText:'获取验证码',
            findmsg:''
        }

        this.getCaptchaCode = this.getCaptchaCode.bind(this)
        this.pageStatus = this.pageStatus.bind(this)
        
        
    }

    render() {
        const { login, pwd } = this.props;
        if(!login) {
            return (
                this.pageData()
            )
        }
        else if(login && pwd){
            return <Redirect to="/home"></Redirect>
        }
        else if(login && !pwd){
            return (
                this.pageData()
            )
            
        }
        
    }

    componentDidUpdate() {
        this.pageStatus()
        
    }

    // 页面登录密码为空则去修改密码界面
    pageStatus() {
        const { history } = this.props;
        const login = sessionGetItem('token')
        const pwd = sessionGetItem('changepwd')
        if(login && pwd) {
            const confirm = Modal.confirm;
            confirm({
                title:"修改密码",
                content:"请先前往修改密码",
                cancelText:"取消",
                okText:"确定",
                onOk() {
                    history.push({pathname :"/mine"})
                }
            })
        }else if(login && pwd === false) {
            
            history.push({pathname :"/home"})
        }
    }

    componentDidMount() {
        this.pageStatus()
    }

    
  
    pageData = () => {
        
        return (
            <LoginWrapper>
                <BackLogo>
                    
                </BackLogo>
                <RightWrapper>
                    <LoginCondition className={this.state.loginCondition?"isShow":"isHide"}>
                        <LoginTitle>大竹农商银行客户关系系统</LoginTitle>
                        <LoginInputWrapper>
                            <p>柜员号</p>
                            <UserInput placeholder="请输入柜员号" ref={(input) => this.userName = input} ></UserInput>
                        </LoginInputWrapper>
                        <LoginInputWrapper>
                            <p>密码</p>
                            <UserInput placeholder="请输入密码" ref={(input) => this.passWord = input} type="password"></UserInput>
                        </LoginInputWrapper>
                        <LoginTips className={this.state.status?"isOpacity":""}>请输入{this.state.msg}</LoginTips>
                        <LoginButtonWapper>
                            <LoginYes 
                                onClick={() => {this.checkLogin(this.userName, this.passWord)}}
                            >登录</LoginYes>
                            <LoginFind onClick={() => {this.findPassword()}}>找回密码</LoginFind>
                        </LoginButtonWapper>
                    </LoginCondition>

                    <LoginCondition className={this.state.loginCondition?"isHide":"isShow"}>
                        <FindWrapper>
                            <p>找回密码</p>
                            <LoginInputWrapper>
                                <p>柜员号</p>
                                <UserInput placeholder="请输入柜员号" ref={(input) => this.idCard = input} ></UserInput>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>手机号</p>
                                <UserInput placeholder="请输入手机号" ref={(input) => this.phoneNumber = input} ></UserInput>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>短信验证码</p>
                                <MessageInput maxLength="6" placeholder="请输入短信验证码" ref={(input) => this.mesNumber = input} ></MessageInput>
                                <MessageButton onClick={() => {this.getCaptchaCode(this.phoneNumber, this.idCard)}}>{this.state.captchaText}</MessageButton>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>新密码</p>
                                <UserInput placeholder="请输入新密码" ref={(input) => this.newPassword = input} type="password" ></UserInput>
                            </LoginInputWrapper>
                            <FindTips>{this.state.findmsg}</FindTips>
                            <LoginButtonWapper>
                                <LoginYes onClick={() => {this.findPwoSure(this.phoneNumber, this.idCard, this.mesNumber, this.newPassword)}}>确定</LoginYes>
                                <LoginFind onClick={() => {this.backLogin(true)}}>返回登录</LoginFind>
                            </LoginButtonWapper>
                        </FindWrapper>
                    </LoginCondition>
                </RightWrapper>
            </LoginWrapper>
        )
    }
    
    // 登陆校验
    checkLogin(userName, passWord) {
        if(!userName.value){
            this.setState({
                msg:"柜员号",
                status:true
            })
        }
        // else if(!passWord.value){
        //     this.setState({
        //         msg:"密码",
        //         status:true
        //     })
        // }
        else{
            this.setState({
                status:false
            })

            let params = {
                cabinetNo:'',
                password:''
            }
            params.cabinetNo = userName.value
            params.password = passWord.value
            login(params).then((res) => {
                let data = res.data;
                let token = null;
                if(data.code === 1 && data.msg === "success") {
                    token = data.data.token;
                    sessionSetItem('token', token);
                    sessionStorage.setItem(
                        "time", new Date().getTime()
                    );
                    sessionStorage.setItem(
                        "user", JSON.stringify(data.data.user)
                    );
                    if(!passWord.value) {
                        sessionSetItem('changepwd', true);
                    }else{
                        sessionSetItem('changepwd', false);
                    }
                    this.setState({
                        login:true
                    })
                    
                }else{
                    message.error(data.msg);
                }
            })
        }

    };

    // 找回密码
    findPassword() {
        this.setState({
            loginCondition:false
        })
    };

    // 找回密码确定按钮
    findPwoSure(telel, idel, msgel, newPwoel) {
        let params = {}
        if(!telel.value || !idel.value || !msgel.value || !newPwoel.value){
            this.setState({
                findmsg:"请完善信息"
            })
        }else if(!/^1[34578]\d{9}$/.test(telel.value)) {
            this.setState({
                findmsg:"请填写正确手机号"
            })
        }
        // else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idel.value)){
        //     this.setState({
        //         findmsg:"请填写正确身份证号"
        //     })
        // }
        
        else{
            this.setState({
                findmsg:""
            })
             params = {
                mobilePhone:telel.value,
                userId:idel.value,
                code:msgel.value,
                password:newPwoel.value
            }
            
        }
        console.log(params)
    };

    // 返回登陆
    backLogin() {
        this.setState({
            loginCondition:true
        })
    };

    // 获取验证码
    getCaptchaCode(telel, idel) {
        let count = 60;
        
        // 发送验证码校验电话号和身份证号码
        if(telel.value && idel.value && /^1[34578]\d{9}$/.test(telel.value) && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idel.value)){
            let params = {
                mobilePhone:telel.value,
                idcard:idel.value
            }
            if(this.state.captchaCode) {
                sendCode(params)
                .then((res) => {
                    let data = res.data;
                    // console.log(data)
                    if(data.code === 1 && data.msg === 'success') {
                        let timer = () => {
                        let timerInter = setInterval(() => {
                                
                                if(count > 0) {
                                    count = count - 1;
                                    this.setState({
                                        captchaText:count
                                    })
                                }else{
                                    clearInterval(timerInter)
                                    this.setState({
                                        captchaCode:true,
                                        captchaText:"获取验证码"
                                    })
                                    
                                }
                                
                            }, 1000)
                            
                        }
                        if(this.state.captchaCode) {
                            this.setState({
                                captchaCode:false,
                                captchaText:count
                            }, timer())
                        }
                    }else {
                        message.error(data.msg);
                    }
                    
                    
                    
                })
                .catch((err) => {
                    console.log(err)
                })
            }

            this.setState({
                findmsg:""
            })

            
        }
        else if(!idel.value) {
            this.setState({
                findmsg:"请输入柜员号"
            })
        }
        else if(!telel.value) {
            this.setState({
                findmsg:"请输入电话号码"
            })
        }else if(!/^1[34578]\d{9}$/.test(telel.value)) {
            this.setState({
                findmsg:"请输入正确电话号码"
            })
        }else {
            // 短信验证
        }
        
        // else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idel.value)) {
        //     this.setState({
        //         findmsg:"请输入正确身份证号码"
        //     })
        // }
    }


}

const mapDispatch = (dispatch) => ({
    // 点击登录时派发action
    handleLogin(userName, passWord) {
        
        
    }

    
});


const mapState = (state) => ({
    
});

export default connect(mapState, mapDispatch)(Login)