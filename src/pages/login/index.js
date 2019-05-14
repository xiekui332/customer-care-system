import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { actionCreators } from './store'

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
    MessageButton
} from './style'

class Login extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            status:false,           // 错误提示
            loginCondition:true,     // 登录和找回密码切换
            captchaCode:true,         // 验证码
            captchaText:'获取验证码'
        }

        this.getCaptchaCode = this.getCaptchaCode.bind(this)
    }

    render() {
        return (
            <LoginWrapper>
                <BackLogo></BackLogo>
                <RightWrapper>
                    <LoginCondition className={this.state.loginCondition?"isShow":"isHide"}>
                        <LoginTitle>大竹农商银行客户关怀系统</LoginTitle>
                        <LoginInputWrapper>
                            <p>用户名</p>
                            <UserInput placeholder="请输入用户名" ref={(input) => this.userName = input} ></UserInput>
                        </LoginInputWrapper>
                        <LoginInputWrapper>
                            <p>密码</p>
                            <UserInput placeholder="请输入密码" ref={(input) => this.passWord = input} type="password"></UserInput>
                        </LoginInputWrapper>
                        <LoginTips className={this.state.status?"isOpacity":""}>请输入{this.state.msg}</LoginTips>
                        <LoginButtonWapper>
                            <LoginYes onClick={() => {this.checkLogin(this.userName, this.passWord)}}>登录</LoginYes>
                            <LoginFind onClick={() => {this.findPassword()}}>找回密码</LoginFind>
                        </LoginButtonWapper>
                    </LoginCondition>

                    <LoginCondition className={this.state.loginCondition?"isHide":"isShow"}>
                        <FindWrapper>
                            <p>找回密码</p>
                            <LoginInputWrapper>
                                <p>手机号</p>
                                <UserInput placeholder="请输入手机号" ref={(input) => this.photoNumber = input} ></UserInput>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>身份证号</p>
                                <UserInput placeholder="请输入身份证号" ref={(input) => this.idCard = input} ></UserInput>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>短信验证码</p>
                                <MessageInput placeholder="请输入短信验证码" ref={(input) => this.mesNumber = input} ></MessageInput>
                                <MessageButton onClick={this.getCaptchaCode}>{this.state.captchaText}</MessageButton>
                            </LoginInputWrapper>
                            <LoginInputWrapper>
                                <p>新密码</p>
                                <UserInput placeholder="请输入新密码" ref={(input) => this.newPassword = input} type="password" ></UserInput>
                            </LoginInputWrapper>
                            <LoginButtonWapper>
                                <LoginYes onClick={() => {}}>确定</LoginYes>
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
                msg:"用户名",
                status:true
            })
        }else if(!passWord.value){
            this.setState({
                msg:"密码",
                status:true
            })
        }else{
            this.setState({
                status:false
            })

            this.props.handleLogin(userName, passWord)
        }

    };

    // 找回密码
    findPassword() {
        this.setState({
            loginCondition:false
        })
    };

    // 返回登陆
    backLogin() {
        this.setState({
            loginCondition:true
        })
    };

    // 获取验证码
    getCaptchaCode() {
        let count = 60;
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
    }


}

const mapDispatch = (dispatch) => ({
    handleLogin(userName, passWord) {
        let params = {
            userName:userName.value,
            password:passWord.value
        }

        const action = actionCreators.loginStatus(params)
        dispatch(action)
    },

    
})

export default connect(null, mapDispatch)(Login)