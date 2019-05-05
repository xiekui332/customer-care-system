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
    CustomerInfo,
    SearchWrapper,
    AddCustomerWrapper
} from '../style'

class MiddleWrapper extends PureComponent{
    render () {
        const { customerList,handleMiddleList, handleAddCustomer, addCustomer } = this.props;
        return (
            <Customer>
                <MiddleHeader>
                    <span>客户管理</span>
                    <OperateWrapper>
                        <Tooltip title="新建客户" onClick={handleAddCustomer}>
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

                
                {/* <SearchWrapper>

                </SearchWrapper> */}    

                <MiddleListWrapper className="editSrollBar">
                    <AddCustomerWrapper className="AddCustomerWrapper-show" onClick={addCustomer}>
                        新建客户
                    </AddCustomerWrapper>
                    {
                        customerList && customerList.map((item, index) => (
                            <MiddleList onClick={() => {handleMiddleList(index, item.id, item.active)}} key={item.id} className={customerList[index].active?'selected':''} >
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


    componentDidMount() {
        this.props.resetHeight()
    }
  
}


const mapDispatch = (dispatch) => ({
    // 点击管理客户列表
    handleMiddleList(index, id, active) {
        const action = actionCreators.clickMiddleList(index, id, active)
        dispatch(action)
    },

    // 重新计算高度
    resetHeight() {
        let screen_height = document.body.clientHeight;
        let el = document.getElementsByClassName('editSrollBar')[0]
        el.style.height = (screen_height - 60) + 'px';
    },

    // 点击新建客户
    handleAddCustomer() {
        let el = document.getElementsByClassName('AddCustomerWrapper-show')[0]
        el.style.height = 80 + 'px';
        
    },

    // 添加客户
    addCustomer() {
        const action = actionCreators.clickAddCustomer(true)
        dispatch(action)
    }

   
})

const mapState = (state) => ({
    customerList:state.getIn(['left', 'userInfo']).toJS().customerList,
    isAdd:state.getIn(['left', 'isAdd'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)