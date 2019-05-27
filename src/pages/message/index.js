import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { Input, message, Empty } from 'antd';
import { sessionGetItem, changeSendMsg } from '../../api'

import {
    MessagePage,
    MessageWrapper,
    MessageMiddle,
    MessageTitle,
    MessageLargeBtn,
    // MessageItem,
    // MessageContent,
    MessageRightDetail,
    MegRightTitle,
    MegRightBtn,
    MsgBtn,
    MsgHead,
    MsgContent,
    MsgTextWrapper,
    MsgSelect,
    PreviewMessage
} from './style'

class Message extends PureComponent {
    constructor(props) {
        super(props)
        this.state = ({
            timeShow:false,
            timeText:"请选择",
            isEdit:false,
            msgTextarea:"",
            login:sessionGetItem('token'),
            msgTitle:'',
            prewStatus:false
        })

        this.handleTimeSelect = this.handleTimeSelect.bind(this)
        this.handleTimeSelectLi = this.handleTimeSelectLi.bind(this)
        // this.handleMessageItem = this.handleMessageItem.bind(this)
    }

    render() {
        const { login, isEdit, msgTextarea, msgTitle, prewStatus } = this.state;
        const { TextArea } = Input;
        if(login){
            return(
                <MessagePage>
                    <LeftCon />
                    <MessageWrapper>
                        <MessageMiddle className="editSrollBar">
                            <MessageTitle>短信管理</MessageTitle>
                            <MessageLargeBtn onClick={() => {this.handleMessageItem(true)}}>正在新建营销短信</MessageLargeBtn>
                            {/* <MessageItem onClick={() => {this.handleMessageItem(false)}}>
                                <p>端午节祝福</p>
                                <MessageContent>
                                    客户姓名 你好，今天是端午节，祝您端午 节快乐祝您端午节快乐
                                </MessageContent>
                                <div>
                                    <span>已发送</span>
                                    <span>2019-05-23</span>
                                </div>
                            </MessageItem> */}
                            <Empty size='' description='暂无' />
                        </MessageMiddle>


                        <MessageRightDetail className='msg-right-wrapper'>
                            <MsgHead className={isEdit?"isHide":"isShow"}>
                                <MegRightTitle>
                                新建营销短信
                                </MegRightTitle>
                                <MegRightBtn>
                                    <MsgBtn className="msgCancel"
                                        onClick={() => {this.handleCancel()}}
                                    >取消</MsgBtn>
                                    <MsgBtn className="msgCancel"
                                        onClick={() => {this.handlePrew(this.prewEl, prewStatus, msgTitle, msgTextarea)}}
                                    >预览</MsgBtn>
                                    <MsgBtn className="msgSave"
                                        onClick={() => {this.handleSend(msgTitle, msgTextarea)}}
                                    >发送</MsgBtn>
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
                                    <p>活动名称</p>
                                    <MsgSelect>
                                        {/* <MsgText onClick={this.handleTimeSelect} className={timeText === "请选择"?"isgray":""}>{timeText}</MsgText>
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
                                        </MsgItem> */}

                                        <Input placeholder="请输入活动名称"
                                            ref={(input) => {this.msgTitleEl = input}}
                                            onChange={() => {this.handleInput(this.msgTitleEl, 1, msgTitle, msgTextarea)}}
                                            value={msgTitle}
                                        />
                                    </MsgSelect>

                                    <p>自定义短信内容</p>
                                    <TextArea rows={10} value={msgTextarea} className="msg-textarea"
                                        ref={(input) => {this.msgContentEl = input}}
                                        onChange={() => {this.handleInput(this.msgContentEl, 2, msgTitle, msgTextarea)}}
                                    />
                                </MsgTextWrapper>
                            </MsgContent>
                            


                                        {/* 预览短信 */}
                            <PreviewMessage ref={(el) => {this.prewEl = el}} className={prewStatus?"active":""}>
                                        <p>短信预览</p>
                                        <div>
                                            尊敬的客户， 大竹农商银行将开展 {msgTitle} 活动， 内容如下 {msgTextarea} ， 热情希望您能参与， 我们竭诚为您为你提供更好更多的金融服务
                                        </div>
                            </PreviewMessage>
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

    // 点击预览
    handlePrew(prewEl, prewStatus, msgTitle, msgTextarea) {
        // active
        if(msgTitle && msgTextarea) {
            let h = document.getElementsByClassName('msg-right-wrapper')[0].clientHeight
            prewEl.style.height = (h - 60) + 'px'
            this.setState({
                prewStatus:!prewStatus
            }) 
        }else{
            message.info('请填写完整活动信息');
        }
    }


    // input change
    handleInput(el, type, msgTitle, msgTextarea) {
        if(type === 1) {
            msgTitle = el.input.value
        }else if(type === 2) {
            msgTextarea = el.textAreaRef.value
        }
        this.setState({
            msgTitle:msgTitle,
            msgTextarea:msgTextarea
        })
    }


    // 发送营销短息
    handleSend(msgTitle, msgTextarea) {
        if(msgTitle && msgTextarea) {
            let params = {
                name:msgTitle,
                content:msgTextarea
            }
            changeSendMsg(params).then((res) => {
                console.log(res)
                let data = res.data
                if(data.code === 1 && data.msg === 'success') {
                    message.success('发送成功')
                }else{
                    message.error(data.msg)
                }
            })
        }else{
            message.info('请填写完整活动信息');
        }
    }


    // 取消
    handleCancel() {
        this.setState({
            msgTitle:'',
            msgTextarea:''
        })
    }

}


const mapState = (state) => ({
    
});

const mapDispatch = (dispatch) => ({
    
});

export default connect(mapState, mapDispatch)(Message)