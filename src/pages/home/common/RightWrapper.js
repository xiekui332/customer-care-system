import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Empty, Spin, Modal, message } from 'antd';
import "antd/dist/antd.css";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import AddNewCus from '../../../common/AddNewCus'
import { handlecustomDelete, getCustomerDetail } from '../../../api'
import { actionCreators } from '../store'

import { 
    DetailWrapper,
    RightHeaderWrapper,
    RightContentWrapper,
    RightCarousel,
    RightWrapper,
    FileWrapper,
    FileItem
} from '../style'

class MiddleWrapper extends PureComponent{
    constructor(props) {
        super(props) 
        this.state = {

        }
        
    }
    render () {
        const { fileList, customerDetail, spin, isAdd, showDetail } = this.props;
        const user = JSON.parse(sessionStorage.getItem("user"))
        const confirm = Modal.confirm;
        let homeList = []
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        // console.log(isAdd)
        return (
            <DetailWrapper>
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
                                <Tooltip title="" onClick={() => {this.handleTipChat(customerDetail, confirm, homeList)}}>
                                    <span className="iconfont">&#xe62f;</span>
                                </Tooltip>
                                {/* 移交 */}
                                <Tooltip title="" onClick={() => {this.handleTipTran(customerDetail, confirm, homeList)}}>
                                    <span className="iconfont">&#xe60c;</span>
                                </Tooltip>
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
        
        
    }


    // 删除
    handleTipDel(detail, confirm, homeList) {
        let that = this;
        let showData = []
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
                        homeList.map((item, index) => (
                            item.customerId === detail.customerId?homeList.splice(index, 1):""
                        ))

                        that.props.disNewMidList(homeList)
                        homeList.map((item, index) => (
                            item.active === true?showData.push(item.customerId):""
                        ))
                        
                        if(showData.length) {
                            let params_two = {
                                id:showData[showData.length - 1]
                            }
                            that.props.disSpin(false)
                            that.props.disShowDetail(true)
                            // console.log(params_two)
                            getCustomerDetail(params_two).then((res) => {
                                let data = res.data
                                if(data.code === 1 && data.msg === 'success') {
                                    if(data.data) {
                                        // console.log(data)
                                        that.props.disCusDetail(data.data)
                                        that.props.disSpin(false)
                                    }
                                }
                            })
                        }else{
                            that.props.disShowDetail(false)
                        }
                        
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
        
    }
    // 会话
    handleTipChat(customerDetail, confirm, homeList) {
        
    }
    // 移交
    handleTipTran(customerDetail, confirm, homeList) {
        
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