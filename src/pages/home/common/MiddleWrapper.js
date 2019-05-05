import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Tooltip } from 'antd';
import "antd/dist/antd.css";
import { 
    Customer,
    MiddleHeader,
    OperateWrapper,
    MiddleListWrapper,
    MiddleList,
    CustomerInfo
} from '../style'

class MiddleWrapper extends PureComponent{
    render () {
        const { customerList,handleMiddleList } = this.props;
        return (
            <Customer>
                <MiddleHeader>
                    <span>客户管理</span>
                    <OperateWrapper>
                        <Tooltip title="新建客户">
                            <span className="iconfont">&#xe64c;</span>
                        </Tooltip>
                        <Tooltip title="搜索">
                            <span className="iconfont">&#xe7c0;</span>
                        </Tooltip>
                        <Tooltip title="编辑">
                            <span className="iconfont">&#xe6fc;</span>
                        </Tooltip>
                    </OperateWrapper>
                </MiddleHeader>

                <MiddleListWrapper className="editSrollBar">
                    {
                        customerList && customerList.map((item, index) => (
                            <MiddleList onClick={() => {handleMiddleList(index)}} key={index} className={customerList[index].active?'selected':''} >
                                <img src={item.src} alt="" />
                                <CustomerInfo >
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{item.phone}</span>
                                    </p>
                                    <p>
                                        {item.company}
                                    </p>
                                </CustomerInfo>
                            </MiddleList>
                        ))
                    }
                    
                </MiddleListWrapper>
            </Customer>
        )
    }

  
}

const mapDispatch = (dispatch) => ({
    // 点击管理客户列表
    handleMiddleList(index) {
        const action = actionCreators.clickMiddleList(index)
        dispatch(action)
    },

    // 循环列表
    mapMiddleList(customerList) {
       
    }

   
})

const mapState = (state) => ({
    customerList:state.getIn(['left', 'userInfo']).toJS().customerList
})

export default connect(mapState, mapDispatch)(MiddleWrapper)