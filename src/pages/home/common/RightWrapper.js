import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Upload, Tooltip, Empty, Spin, Modal, message, Input } from 'antd';
import "antd/dist/antd.css";
import AddNewCus from '../../../common/AddNewCus'
import { handlecustomDelete, toTransfer, sureToTransfer, changeCarefull } from '../../../api'
import { actionCreators } from '../store'
// import { baseUrl_down } from '../../../config'

import { 
    DetailWrapper,
    RightHeaderWrapper,
    RightContentWrapper,
    // RightCarousel,
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
            carefullReason:'',
            previewVisible: false,
            previewImage: ''
        }
        
    }
    render () {
        const { customerDetail, spin, isAdd, showDetail } = this.props;
        const { transStatus, totransfer, newUserId, careStatus, carefullReason, previewImage, previewVisible } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        const confirm = Modal.confirm;
        const TextArea = Input.TextArea
        let homeList = []
        let fileList = []
        let attachFile = []
        let changeNewattachFile = []
        const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        // console.log(isAdd)
        if(customerDetail && customerDetail.customerId) {
            // test
            // customerDetail.attachs = []

            if(customerDetail.attachs&&customerDetail.attachs.length) {
                for(let i = 0; i < customerDetail.attachs.length; i ++) {
                    let obj = {}
                    obj.origName = customerDetail.attachs[i].origName
                    obj.attachPath =customerDetail.attachs[i].attachPath
                    obj.attachId = customerDetail.attachs[i].attachId
                    obj.uid = customerDetail.attachs[i].attachId
                    obj.name = customerDetail.attachs[i].origName
                    obj.status = 'done'
                    obj.attachSuffix = customerDetail.attachs[i].attachSuffix
                    obj.url = customerDetail.attachHost + customerDetail.attachs[i].attachPath
                    changeNewattachFile.push(obj)

                    
                   
                }

                for(let i = 0; i < changeNewattachFile.length; i ++) {
                    if(PICTURE_EXPRESSION.test(changeNewattachFile[i].attachSuffix)) {
                        fileList.push(changeNewattachFile[i])
                        
                        fileList.map((item, index) => (
                            item.uid = item.uid.toString()
                        ))
                        // console.log(fileList)
                    }else{
                        attachFile.push(changeNewattachFile[i])
                    }
                }
            }   

        }

        
        // console.log(customerDetail)
        return (
            <DetailWrapper
            className="detailWrapper"
            >
                {/* 添加客户内容 */}
                <AddNewCus>
                    
                </AddNewCus>

                {/* 客户详情内容 */}
                <div className={showDetail?"isShow newheight":"isHide newheight"}>
                    <RightHeaderWrapper className={spin || !customerDetail?"isOpacity":"" }>
                        {
                            user.userType === 2?
                            <Fragment>
                                {/* 删除 */}
                                <Tooltip title="" onClick={() => {this.handleTipDel(customerDetail, confirm, homeList)}}>
                                    {/* <span className="iconfont">&#xe619;</span> */}
                                    <div className="reset-shanchu"></div>
                                </Tooltip>
                                {/* 编辑 */}
                                <Tooltip title="" onClick={() => {this.handleTipEdit(customerDetail, confirm, homeList)}}>
                                    {/* <span className="iconfont">&#xe6fc;</span> */}
                                    <div className="reset-fangbj"></div>
                                </Tooltip>
                                {/* 会话 */}
                                {/* <Tooltip title="" onClick={() => {this.handleTipChat(customerDetail, confirm, homeList, chatStatus)}}>
                                    <span className="iconfont">&#xe62f;</span>
                                </Tooltip> */}
                                {/* 移交 */}
                                <Tooltip title="" onClick={() => {this.handleTipTran(customerDetail, confirm, homeList, transStatus)}}>
                                    {/* <span className="iconfont">&#xe60c;</span> */}
                                    <div className="reset-yijiao"></div>
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
                                        <td>公司(店铺)名称</td>
                                        <td>{(customerDetail && customerDetail.companyName) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>经营内容</td>
                                        <td>{(customerDetail && customerDetail.businessContent) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>经营地址</td>
                                        <td>{(customerDetail && customerDetail.businessAddress) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>工作人员数量</td>
                                        <td>{(customerDetail && customerDetail.staffNum) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    
                                    {/* {console.log(customerDetail)} */}
                                    {/* 新增 */}
                                    <tr>
                                        <td>生产经营面积</td>
                                        <td>{(customerDetail && customerDetail.businessArea) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>年营业额(近三年平均)</td>
                                        <td>{(customerDetail && customerDetail.yearlyTurnover) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>资产情况(万元)</td>
                                        <td>{(customerDetail && customerDetail.property) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>负债情况(万元)</td>
                                        <td>{(customerDetail && customerDetail.liabilities) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>信用情况(人品、口碑)</td>
                                        <td>{(customerDetail && customerDetail.creditInfo) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>有无融资需求</td>
                                        <td>{(customerDetail && customerDetail.financialDemand == 1?'有':'无')}</td>
                                    </tr>
                                    <tr>
                                        <td>需求金额(万元)</td>
                                        <td>{(customerDetail && customerDetail.demandAmount) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>已与我行发生业务种类</td>
                                        <td>{(customerDetail && customerDetail.existingBusinessType) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>已发生业务金额</td>
                                        <td>{(customerDetail && customerDetail.existingBusinessAmount) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>是否有经营合伙人</td>
                                        <td>{(customerDetail && customerDetail.isBusinessPartner === 0?'无':'有')}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人姓名</td>
                                        <td>{(customerDetail && customerDetail.relatName) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人身份证号码</td>
                                        <td>{(customerDetail && customerDetail.relatIdcard) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人关系</td>
                                        <td>{(customerDetail && customerDetail.relatRelationship) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    <tr>
                                        <td>关联人联系电话</td>
                                        <td>{(customerDetail && customerDetail.relatPhone) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                    {
                                        // console.log(customerDetail)
                                    }
                                    <tr>
                                        <td>关联人备注</td>
                                        <td>{(customerDetail && customerDetail.relatRemark) || <span className="no-data">暂无</span>}</td>
                                    </tr>
                                </tbody>
                            </RightContentWrapper>
                            
                            {
                                customerDetail.attachs && customerDetail.attachs.length?
                                
                                <Fragment>
                                    
                                    <div className="list-photo">
                                        <Upload 
                                            
                                            accept=".jpg, .jpeg, .png, svg, gif, .bmp"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={(file) => {this.handlePreview(file)}}
                                            >
                                            {fileList.length >= 9 ? null : ''}
                                        </Upload>

                                        <Modal visible={previewVisible} footer={null} onCancel={(file) => {this.handleCancel(file)}}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                        <p className="clear"></p>
                                    </div>
                                </Fragment>
                                :""
                            }
                            
                            

                            <FileWrapper>
                                {
                                    attachFile && attachFile.length? 
                                    attachFile.map((item, index) => (
                                        <FileItem key={item.customerId}
                                            onClick={() => {this.handleAttachDownload(item, attachFile)}}
                                        >
                                            <span className="iconfont">&#xe600;</span>
                                            {item.name}
                                        </FileItem>
                                    ))
                                    :''
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
                                                item.photo?<img src={item.photo} alt="" />:
                                                <div className="moren-img"></div>
                                                // <span className="iconfont no-avetor">&#xe633;</span>
                                            }
                                            <ToTraItem className="trans-item">
                                                <div>
                                                <span className="title trans-title">{item.name}</span>
                                                <span className="mobile trans-mobile">{item.mobilePhone}</span>
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
        
        
            let h = document.getElementsByClassName('detailWrapper')[0].clientHeight;
            this.carefulrea.style.height = (h - 60) + 'px'
            this.blockEl.style.height = (h - 60) + 'px' 
        
    }

    // 预览图片
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleCancel = (file) => {
        this.setState({ previewVisible: false })
    }

    // 下载附件
    handleAttachDownload(file, attachFile) {
        // console.log(file)
        // console.log(baseUrl_down + '/attach/download?attachId=' + file.uid)
        window.open(file.url)
    }

    // 删除
    handleTipDel(detail, confirm, homeList) {
        this.setState({
            transStatus:false
        })
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
        // console.log(customerDetail)
        this.setState({
            transStatus:false
        })
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
                let params = {
                    isAdd:false
                }
                this.props.isAddAction(params)
                this.props.disShowDetail(false)
                this.props.handleChangeTrans(true)
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

    //  改变移交后的状态
    handleChangeTrans(bool) {
        let action = actionCreators.changeTransStatus(bool)
        dispatch(action)
    }
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