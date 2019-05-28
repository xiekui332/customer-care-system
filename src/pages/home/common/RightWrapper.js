import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Empty, Spin, Modal, message, Input } from 'antd';
import "antd/dist/antd.css";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import AddNewCus from '../../../common/AddNewCus'
import { handlecustomDelete, toTransfer, sureToTransfer, changeCarefull } from '../../../api'
import { actionCreators } from '../store'

import { 
    DetailWrapper,
    RightHeaderWrapper,
    RightContentWrapper,
    RightCarousel,
    RightWrapper,
    FileWrapper,
    FileItem,
    RightBlock,
    Totranslist,
    TotransferItem,
    ToTraItem,
    CareHeader,
    CareTitle,
    CareButton,
    CareReason
} from '../style'

class MiddleWrapper extends PureComponent{
    constructor(props) {
        super(props) 
        this.state = {
            chatStatus:false,
            transStatus:false,
            totransfer:[],
            newUserId:'',
            careStatus:false,
            carefullReason:''
        }
        
    }
    render () {
        const { fileList, customerDetail, spin, isAdd, showDetail } = this.props;
        const { transStatus, totransfer, newUserId, careStatus, carefullReason } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        const confirm = Modal.confirm;
        const TextArea = Input.TextArea
        let homeList = []
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        // console.log(isAdd)
        return (
            <DetailWrapper
            className="detailWrapper"
            >
                {/* 添加客户内容 */}
                <AddNewCus></AddNewCus>

                {/* 客户详情内容 */}
                <div className={showDetail?"isShow":"isHide"}>
                    <RightHeaderWrapper className={spin || !customerDetail?"isOpacity":"" }>
                        {
                            user.userType === 2?
                            <Fragment>
                                {/* 删除 */}
                                <Tooltip title="" onClick={() => {this.handleTipDel(customerDetail, confirm, homeList)}}>
                                    <span className="iconfont">&#xe619;</span>
                                </Tooltip>
                                {/* 编辑 */}
                                <Tooltip title="" onClick={() => {this.handleTipEdit(customerDetail, confirm, homeList)}}>
                                    <span className="iconfont">&#xe6fc;</span>
                                </Tooltip>
                                {/* 会话 */}
                                {/* <Tooltip title="" onClick={() => {this.handleTipChat(customerDetail, confirm, homeList, chatStatus)}}>
                                    <span className="iconfont">&#xe62f;</span>
                                </Tooltip> */}
                                {/* 移交 */}
                                <Tooltip title="" onClick={() => {this.handleTipTran(customerDetail, confirm, homeList, transStatus)}}>
                                    <span className="iconfont">&#xe60c;</span>
                                </Tooltip>
                            </Fragment>
                            :""
                        }
                        {
                            user.userType === 3?
                            <Fragment>
                                <CareHeader>
                                    <CareTitle>
                                        {customerDetail.name}
                                    </CareTitle>

                                    <CareButton>
                                        <button onClick={() => {this.handlerefuse(this.carefulrea, careStatus)}}>拒绝</button>
                                        <button onClick={() => {this.handlepass(customerDetail.customerId)}}>通过</button>
                                    </CareButton>
                                </CareHeader>
                            </Fragment>
                            :""
                        }
                    </RightHeaderWrapper>

                    <RightWrapper>
                        <div className={spin || !customerDetail?"isHide":"isShow" }>
                            <RightContentWrapper>
                                <tbody>
                                    <tr>
                                        <td>客户姓名</td>
                                        <td>{(customerDetail && customerDetail.name) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>身份证号码</td>
                                        <td>{(customerDetail && customerDetail.idcard) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>手机号码</td>
                                        <td>{(customerDetail && customerDetail.mobilePhone) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>常住地址</td>
                                        <td>{(customerDetail && customerDetail.address) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>行业分类</td>
                                        <td>{(customerDetail && customerDetail.industryClass) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>公司名称</td>
                                        <td>{(customerDetail && customerDetail.companyName) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>经营内容</td>
                                        <td>{(customerDetail && customerDetail.businessContent) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>是否有经营合伙人</td>
                                        <td>{(customerDetail && customerDetail.isBusinessPartner === 0?'无':'有')}</td>
                                    </tr>
                                </tbody>
                            </RightContentWrapper>
                            
                            {
                                
                                customerDetail.attachs && customerDetail.attachs.length?
                                <RightCarousel className="swiper-container">
                                        <span className="iconfont swiper-button-prev">&#xe663;</span>
                                        <span className="iconfont swiper-button-next">&#xe6a8;</span>
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">Slide 1</div>
                                            <div className="swiper-slide">Slide 2</div>
                                            <div className="swiper-slide">Slide 3</div>
                                            <div className="swiper-slide">Slide 4</div>
                                            <div className="swiper-slide">Slide 5</div>
                                        </div>
                                        <div className='swiper-pagination'></div>
                                </RightCarousel>
                                :""
                            }
                            
                            

                            <FileWrapper>
                                {
                                    fileList.map((item, index) => (
                                        <FileItem key={item.id}>
                                            <span className="iconfont">&#xe600;</span>
                                            {item.name}
                                        </FileItem>
                                    ))
                                }
                                
                            </FileWrapper>
                        </div> 
                        {
                            spin?
                            <div className="example">
                                <Spin className="example" delay={100} size={'large'} />
                            </div>
                            :''
                        }
                        
                        
                        
                    
                    
                    </RightWrapper>
                    
                    <RightBlock
                        ref={(block) => {this.blockEl = block}}
                        className={transStatus?"active":""}
                    >
                        <div>
                            {/* <p className="chat-title">编辑短信内容</p>
                            <TextArea className="chat-textarea" rows={6} placeholder="输入短信内容" />

                            <div className="chat-send"
                                onClick={() => {this.handleSend()}}
                            >
                                确认发送
                            </div> */}

                            <Totranslist className="editSrollBar trans-wrapper">
                                {
                                    totransfer && totransfer.map((item, index) => (
                                        <TotransferItem className={item.active?"trans-box-active trans-box":" trans-box"} key={item.cabinetNo}
                                            onClick={() => {this.handleTransfer(item, totransfer, customerDetail, transStatus)}}
                                        >
                                            {
                                                item.photo?<img src={item.photo} alt="" />:<span className="iconfont no-avetor">&#xe61a;</span>
                                            }
                                            <ToTraItem className="trans-item">
                                                <div>
                                                <span className="title trans-title">{item.name}</span>
                                                <span className="mobile trans-mobile">{item.mobilePhone}222</span>
                                                </div>
                                                <div className="idCard trans-idCard">
                                                    {item.cabinetNo}
                                                </div>
                                            </ToTraItem>
                                        </TotransferItem>
                                    ))
                                }
                            
                            </Totranslist>
                            <div className="botton-wrapper">
                                <div className="chat-send"
                                    onClick={() => {this.handleTrans(customerDetail, newUserId, transStatus)}}
                                >
                                    确认移交
                                </div> 
                                {/* <TotransferButton 
                                className="trans-send"
                                onClick={() => {this.sureTransfer(totransfer, homeList, this.transferWrapEl)}}>确认移交</TotransferButton> */}
                            </div>
                        </div>
                        
                        
                    </RightBlock>
                
                    {/* 审核原因 */}
                    <CareReason 
                        ref={(block) => this.carefulrea = block}
                        className={careStatus?"active":""}
                    >
                        <p className="care-title">拒绝理由</p>
                        <TextArea className="care-textarea" rows={6} placeholder="输入拒绝理由" 
                            ref={(text) => this.textArea = text}
                            onChange={() => {this.carefullReaTxt(this.textArea)}}
                            value={carefullReason}
                        />

                        <div className="care-send"
                            onClick={() => {this.handleCareful(carefullReason, customerDetail.customerId, careStatus)}}
                        >
                            拒绝
                        </div>
                    </CareReason>
                </div>

                {
                    !showDetail && !isAdd?
                    <Empty className="" description={'暂无数据'} />
                    :""
                }
            </DetailWrapper>
        )
    }

    componentDidMount() {
        new Swiper('.swiper-container', {
            autoplay: false,
            loop: false,
            slidesPerView: 4,
            spaceBetween: 20,
            pagination : {
                el: '.swiper-pagination',
                clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        
            let height = document.getElementsByClassName('detailWrapper')[0].clientHeight
            this.blockEl.style.height = (height - 60) + 'px' 
            let h = document.getElementsByClassName('detailWrapper')[0].clientHeight;
            this.carefulrea.style.height = (h - 60) + 'px'
        
    }


    // 删除
    handleTipDel(detail, confirm, homeList) {
        let that = this;
        confirm({
            title: '确认删除?',
            okText:"确定",
            cancelText:"取消",
            onOk() {
                let params = {
                    customerIds:detail.customerId
                }
                
                handlecustomDelete(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('删除成功')
                        that.props.handleChangeStatus(true)

                        that.props.disShowDetail(false)
                        
                    }else{
                        message.error(data.msg)
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // 编辑
    handleTipEdit(customerDetail, confirm, homeList) {
        console.log(customerDetail)
        let params = {
            isAdd:true
        }
        this.props.isAddAction(params)
        this.props.disShowDetail(false)
        this.props.handleCusEdit(true)
    }
    // 会话
    handleTipChat(customerDetail, confirm, homeList, chatStatus) {
        this.setState({
            chatStatus:!chatStatus
        })
    }
    // 移交
    handleTipTran(customerDetail, confirm, homeList, transStatus) {
        this.setState({
            transStatus:!transStatus
        })

        toTransfer().then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                if(data.data) {
                    data.data.map((item, index) => (
                        item.active = false
                    ))
                    this.setState({
                        totransfer:data.data
                    })
                }else{
                    message.info(data.msg)
                }
            }else{
                message.error(data.msg)
            }

        })
    }


    // 选择客户经理
    handleTransfer(item, totransfer, customerDetail, transStatus) {
        totransfer.map((item ,index) => (
            item.active = false
        ))
        item.active = true
        this.setState({
            totransfer:totransfer,
            newUserId:item.userId
        })

    }


    // 确认移交
    handleTrans(customerDetail, newUserId, transStatus) {
        let params = {
            customerIds:customerDetail.customerId,
            newUserId:newUserId
        }

        sureToTransfer(params).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('移交成功')
                this.setState({
                    transStatus:!transStatus
                })
            }else{
                message.error(data.msg)
            }
        })
    }


    // 点击拒绝
    handlerefuse(carefulrea, careStatus) {
        
        this.setState({
            careStatus:!careStatus
        })
    }

    // 审核拒绝
    handleCareful(value, id, careStatus) {
        if(!value) {
            message.error('请输入理由')
            return
        }
        let params = {
            id:id,
            status:2,
            auditReason:value
        }
        changeCarefull(params).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('操作成功')
                this.props.handleChangeStatus(true)
                this.props.disShowDetail(false)
                this.setState({
                    careStatus:!careStatus
                })
            }else{
                message.success(data.msg)
            }
        })
    }

    // text输入
    carefullReaTxt(el) {
        let value = el.textAreaRef.value
        this.setState({
            carefullReason:value
        })
    }


    // 通过
    handlepass(id) {
        let params = {
            id:id,
            status:1
        }
        changeCarefull(params).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('操作成功')
                this.props.handleChangeStatus(true)
                this.props.disShowDetail(false)
            }else{
                message.success(data.msg)
            }
        })

    }

}

const mapDispatch = (dispatch) => ({
    disNewMidList(data) {
        let action = actionCreators.getMiddleList(data)
        dispatch(action)
    },

    // 派发展示客户详情状态
    disShowDetail(bool) {
        let action = actionCreators.changeShowDetail(bool)
        dispatch(action)
    },


    // 派发客户详情action
    disCusDetail(data) {
        let action = actionCreators.changeCusDetail(data)
        dispatch(action)
    },

    // 派发加载中
    disSpin(bool) {
        let action = actionCreators.changeSpin(bool)
        dispatch(action)
    },

    // 点击新建客户派发action
    isAddAction(params) {
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
    },

    // 编辑客户
    handleCusEdit(bool) {
        let action = actionCreators.changeCusEdit(bool)
        dispatch(action)
    },

    //  改变新增客户后的状态
    handleChangeStatus(bool) {
        let action = actionCreators.changeAddStatus(bool)
        dispatch(action)
    },
})

const mapState = (state) => ({
    fileList:state.getIn(['left','userInfo']).toJS().fileList,
    spin:state.getIn(['left','spin']),
    isAdd:state.getIn(['left', 'isAdd']),
    edit:state.getIn(['left', 'edit']),
    customerDetail:state.getIn(['left', 'customerDetail']).toJS(),
    showDetail:state.getIn(['left', 'showDetail']),
    homeList:state.getIn(['left', 'homeList'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)