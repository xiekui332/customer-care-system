import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Input } from 'antd';
import { sessionGetItem } from '../../api'

import {
    MessagePage,
    MessageWrapper,
    MessageMiddle,
    MessageTitle,
    MessageLargeBtn,
    MessageItem,
    MessageContent,
    MessageRightDetail,
    MegRightTitle,
    MegRightBtn,
    MsgBtn,
    MsgHead,
    MsgContent,
    MsgTextWrapper,
    MsgSelect,
    MsgItem,
    MsgText
} from './style'

class Message extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            timeShow:false,
            timeText:"请选择",
            isEdit:false,
            msgTextarea:"",
            login:sessionGetItem('token')
        })

        this.handleTimeSelect = this.handleTimeSelect.bind(this)
        this.handleTimeSelectLi = this.handleTimeSelectLi.bind(this)
        // this.handleMessageItem = this.handleMessageItem.bind(this)
    }

    render() {
        const { login, timeShow, timeText, isEdit, msgTextarea } = this.state;
        const { TextArea } = Input;
        if(login){
            return(
                <MessagePage>
                    <LeftCon />
                    <MessageWrapper>
                        <MessageMiddle className="editSrollBar">
                            <MessageTitle>短信管理</MessageTitle>
                            <MessageLargeBtn onClick={() => {this.handleMessageItem(true)}}>添加定时发送条件</MessageLargeBtn>
                            <MessageItem onClick={() => {this.handleMessageItem(false)}}>
                                <p>端午节祝福</p>
                                <MessageContent>
                                    客户姓名 你好，今天是端午节，祝您端午 节快乐祝您端午节快乐
                                </MessageContent>
                            </MessageItem>
                            <MessageItem>
                                <p>端午节祝福</p>
                                <MessageContent>
                                    客户姓名 你好，今天是端午节，祝您端午 节快乐祝您端午节快乐
                                </MessageContent>
                            </MessageItem>
                            <MessageItem>
                                <p>端午节祝福</p>
                                <MessageContent>
                                    客户姓名 你好，今天是端午节，祝您端午 节快乐祝您端午节快乐
                                </MessageContent>
                            </MessageItem>
                            <MessageItem>
                                <p>端午节祝福</p>
                                <MessageContent>
                                    客户姓名 你好，今天是端午节，祝您端午 节快乐祝您端午节快乐
                                </MessageContent>
                            </MessageItem>
                        </MessageMiddle>


                        <MessageRightDetail>
                            <MsgHead className={isEdit?"isHide":"isShow"}>
                                <MegRightTitle>
                                    添加定时发送条件
                                </MegRightTitle>
                                <MegRightBtn>
                                    <MsgBtn className="msgCancel">取消</MsgBtn>
                                    <MsgBtn className="msgSave">保存</MsgBtn>
                                </MegRightBtn>
                            </MsgHead>

                            <MsgHead className={isEdit?"isShow":"isHide"}>
                                <MegRightTitle>
                                    端午节祝福
                                </MegRightTitle>
                                <MegRightBtn>
                                    <span className="iconfont">&#xe619;</span>
                                    <span className="iconfont">&#xe6fc;</span>
                                </MegRightBtn>
                            </MsgHead>

                            <MsgContent>
                                <MsgTextWrapper>
                                    <p>短信发送时间</p>
                                    <MsgSelect>
                                        <MsgText onClick={this.handleTimeSelect} className={timeText === "请选择"?"isgray":""}>{timeText}</MsgText>
                                        <span className="iconfont" onClick={this.handleTimeSelect}>&#xe601;</span>
                                        <MsgItem className={timeShow?"isShow":"isHide"}>
                                            <li 
                                                onClick={() => {this.handleTimeSelectLi(this.li)}}
                                                ref={(li) => this.li = li}
                                            >1</li>
                                            <li 
                                                onClick={() => {this.handleTimeSelectLi(this.li)}}
                                                ref={(li) => this.li = li}
                                            >2</li>
                                            <li 
                                                onClick={() => {this.handleTimeSelectLi(this.li)}}
                                                ref={(li) => this.li = li}
                                            >3</li>
                                        </MsgItem>
                                    </MsgSelect>

                                    <p>自定义短信内容</p>
                                    <TextArea rows={10} value={msgTextarea} className="msg-textarea" />
                                </MsgTextWrapper>
                            </MsgContent>

                        </MessageRightDetail>
                    </MessageWrapper>
                </MessagePage>
            
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }

    }

     // 短信发送时间选择
    handleTimeSelect() {
        this.setState({
            timeShow:!this.state.timeShow
        })
    }

    handleTimeSelectLi(li) {
        this.setState({
            timeShow:!this.state.timeShow,
            timeText:li.innerHTML
        })
    }

    handleMessageItem(bool) {
        if(bool){
            this.setState({
                isEdit:false
            })
        }else{
            this.setState({
                isEdit:true
            })
        }
        
        
    }

}


const mapState = (state) => ({
    
});

const mapDispatch = (dispatch) => ({
    
});

export default connect(mapState, mapDispatch)(Message)