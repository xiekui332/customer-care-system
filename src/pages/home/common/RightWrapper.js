import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Tooltip  } from 'antd';
import "antd/dist/antd.css";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

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
        const { fileList } = this.props;
        return (
            <DetailWrapper>
                <RightHeaderWrapper>
                    <Tooltip title="">
                        <span className="iconfont">&#xe62f;</span>
                    </Tooltip>
                    <Tooltip title="">
                        <span className="iconfont transferIcon">&#xe60c;</span>
                    </Tooltip>
                </RightHeaderWrapper>

                <RightWrapper>
                    <RightContentWrapper>
                        <tbody>
                            <tr>
                                <td>客户姓名</td>
                                <td>王大伟</td>
                            </tr>
                            <tr>
                                <td>身份证号码</td>
                                <td>1423654653213232</td>
                            </tr>
                            <tr>
                                <td>手机号码</td>
                                <td>18649999993</td>
                            </tr>
                            <tr>
                                <td>常住地址</td>
                                <td>四川省绵阳市涪城区国家高新技术产业开发区</td>
                            </tr>
                            <tr>
                                <td>行业分类</td>
                                <td>农业</td>
                            </tr>
                            <tr>
                                <td>公司名称</td>
                                <td>新希望六和股份有限公司</td>
                            </tr>
                            <tr>
                                <td>经营内容</td>
                                <td>饲料、原料添加剂、饲料加工机械、农副产品、食品的生产、加工、销售， 饲料、原料添加剂、饲料加工机械、农副产品</td>
                            </tr>
                            <tr>
                                <td>是否有经营合伙人</td>
                                <td>有</td>
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
                    
                </RightWrapper>
            </DetailWrapper>
        )
    }

    componentDidMount() {
        new Swiper('.swiper-container', {
            autoplay: false,
            loop: true,
            slidesPerView: 4,
            pagination : {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        

        // 动态赋值table
        let tableWidth = document.getElementsByTagName('table')[0].offsetWidth;
        document.getElementsByClassName('swiper-wrapper')[0].style.width = tableWidth
    }
}

const mapDispatch = (dispatch) => ({
    onChange() {
        console.log(2)
    }
})

const mapState = (state) => ({
    fileList:state.getIn(['left','userInfo']).toJS().fileList
})

export default connect(mapState, mapDispatch)(MiddleWrapper)