import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Empty, Spin } from 'antd';
import "antd/dist/antd.css";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import AddNewCus from '../../../common/AddNewCus'

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
    render () {
        const { fileList, customerDetail, spin, isAdd, showDetail } = this.props;
        const user = JSON.parse(sessionStorage.getItem("user"))
        // console.log(isAdd)
        return (
            <DetailWrapper>
                {/* 添加客户内容 */}
                <AddNewCus></AddNewCus>

                {/* 客户详情内容 */}
                <div className={showDetail?"isShow":"isHide"}>
                    <RightHeaderWrapper className={spin || !customerDetail?"isOpacity":"" }>
                        <Tooltip title="">
                            <span className="iconfont">&#xe62f;</span>
                        </Tooltip>
                        <Tooltip title="" className={user.userType === 2?"isHide":"isShow"}>
                            <span className="iconfont transferIcon">&#xe60c;</span>
                        </Tooltip>
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

}

const mapDispatch = (dispatch) => ({
    
})

const mapState = (state) => ({
    fileList:state.getIn(['left','userInfo']).toJS().fileList,
    spin:state.getIn(['left','spin']),
    isAdd:state.getIn(['left', 'isAdd']),
    edit:state.getIn(['left', 'edit']),
    customerDetail:state.getIn(['left', 'customerDetail']).toJS(),
    showDetail:state.getIn(['left', 'showDetail'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)