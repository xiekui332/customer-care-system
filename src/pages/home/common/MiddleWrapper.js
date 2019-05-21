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
    AddCustomerWrapper,
    SearchInput,
    SearchCondition,
    AddButtonWrapper,
    AddCusButton,
    MiddleChceckBox,
    EditWrapper,
    EditItem
} from '../style'

class MiddleWrapper extends PureComponent{

    render () {
        const { customerList,handleMiddleList, 
                handleAddCustomer, addCustomer, 
                handleSearchCustomer, 
                handleCancelCustomer,
                handleEditCustomer, isAdd,
                isEdit 
        } = this.props;

        const user = JSON.parse(sessionStorage.getItem("user"))
        
        return (
            <Customer className="customer">
                <MiddleHeader>
                    <span>客户管理</span>
                    <OperateWrapper>
                        <Tooltip title="新建客户" onClick={() => {handleAddCustomer(this.EditWrapper, this.MiddleListWrapper)}}>
                            <span className="iconfont">&#xe64c;</span>
                        </Tooltip>
                        <Tooltip title="搜索" onClick={() => {handleSearchCustomer(isAdd, this.EditWrapper, this.MiddleListWrapper)}}>
                            <span className="iconfont">&#xe7c0;</span>
                        </Tooltip>
                        <Tooltip title="编辑" onClick={() => {handleEditCustomer(isAdd, this.EditWrapper, this.MiddleListWrapper)}}>
                            <span className="iconfont">&#xe6fc;</span>
                        </Tooltip>
                    </OperateWrapper>
                </MiddleHeader>
                   

                <MiddleListWrapper className="editSrollBar" ref={(MiddleListWrapper) => {this.MiddleListWrapper = MiddleListWrapper}}>
                    <AddCustomerWrapper 
                        className="AddCustomerWrapper-show" 
                        onClick={() => {addCustomer(isAdd)}}>
                        新建客户
                    </AddCustomerWrapper>

                    <SearchWrapper className="SearchWrapper">
                        <SearchCondition>
                            <span>用户名</span>
                            <SearchInput placeholder="请输入用户名"></SearchInput>
                        </SearchCondition>
                        <SearchCondition>
                            <span>手机号</span>
                            <SearchInput placeholder="请输入手机号"></SearchInput>
                        </SearchCondition>

                        <AddButtonWrapper>
                            <AddCusButton className="add-cancel" onClick={handleCancelCustomer}>取消</AddCusButton>
                            <AddCusButton className="add-save">保存</AddCusButton>
                        </AddButtonWrapper>
                    </SearchWrapper> 

                    {
                        customerList && customerList.map((item, index) => (
                            <MiddleList onClick={() => {handleMiddleList(index, item.id, item.active, isAdd, isEdit)}} key={item.id} className={customerList[index].active?'selected':''} >
                                <MiddleChceckBox className={isEdit&&item.active?'middleChceckBox middle-check-box-show':'middleChceckBox'}>
                                    <span className="iconfont">&#xe617;</span>
                                </MiddleChceckBox>
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

                {/* 底部批量操做部分 */}
                <EditWrapper ref={(EditWrapper) => {this.EditWrapper = EditWrapper}}>
                    <EditItem>
                        <span className="iconfont">&#xe619;</span>
                        <p>删除</p>
                    </EditItem>
                    <EditItem className={user.userType === 2?"isHide":"isShow"}>
                        <span className="iconfont">&#xe60c;</span>
                        <p>移交</p>
                    </EditItem>
                    <EditItem>
                        <span className="iconfont">&#xe60a;</span>
                        <p>资料备份</p>
                    </EditItem>
                </EditWrapper>
            </Customer>
        )
    }


    componentDidMount() {
        this.props.resetHeight()
    }
  
}


const mapDispatch = (dispatch) => ({
    // 点击管理客户列表
    handleMiddleList(index, id, active, isAdd, isEdit) {
        const action = actionCreators.clickMiddleList(index, id, active, isEdit)
        dispatch(action)
        if(isAdd){
            let action = actionCreators.clickAddCustomer(false)
            dispatch(action)
            let el = document.getElementsByClassName('AddCustomerWrapper-show')[0]
            el.style.height = 0 + 'px';
        }
        
    },

    // 重新计算高度
    resetHeight() {
        let screen_height = document.body.clientHeight;
        let el = document.getElementsByClassName('editSrollBar')[0]
        el.style.height = (screen_height - 60) + 'px';
    },

    // 点击新建客户
    handleAddCustomer(EditWrapper, MiddleListWrapper) {
        let el = document.getElementsByClassName('AddCustomerWrapper-show')[0]
        el.style.height = 80 + 'px';
        
        let searchel = document.getElementsByClassName('SearchWrapper')[0]
        searchel.style.height = 0 + 'px';
        
        // 删除底部滑出的padding
        EditWrapper.classList.remove('editWrapper-active')
        MiddleListWrapper.classList.remove("MiddleListWrapper-active")
    },

    // 添加客户
    addCustomer(isAdd) {
        if(!isAdd){
            const action = actionCreators.clickAddCustomer(true)
            dispatch(action)
        }
        
    },

    // 点击搜索
    handleSearchCustomer(isAdd, EditWrapper, MiddleListWrapper) {
        let el = document.getElementsByClassName('SearchWrapper')[0]
        el.style.height = 160 + 'px';
        if(isAdd){
            let action = actionCreators.clickAddCustomer(false)
            dispatch(action)
            
        }
        let addel = document.getElementsByClassName('AddCustomerWrapper-show')[0]
            addel.style.height = 0 + 'px';

        EditWrapper.classList.remove('editWrapper-active')
        MiddleListWrapper.classList.remove("MiddleListWrapper-active")
    },

    // 点击取消
    handleCancelCustomer() {
        let el = document.getElementsByClassName('SearchWrapper')[0]
        el.style.height = 0 + 'px';
    },

    // 点击编辑
    handleEditCustomer(isAdd, EditWrapper, MiddleListWrapper) {
        // 底部操作滑出
        EditWrapper.classList.add('editWrapper-active')
        MiddleListWrapper.classList.add("MiddleListWrapper-active")

        let el = document.getElementsByClassName('middleChceckBox')
        let el_AddCustomer = document.getElementsByClassName('AddCustomerWrapper-show')[0]
        el_AddCustomer.style.height = 0 + 'px';
        let el_Search = document.getElementsByClassName('SearchWrapper')[0]
        el_Search.style.height = 0 + 'px';

        for(let i = 0; i < el.length; i ++){
            el[i].classList.add('middleChceckBox-show')
        }

        if(isAdd){
            let action = actionCreators.clickAddCustomer(false)
            dispatch(action)
            
        }

        let action = actionCreators.clickEdit(true)
            dispatch(action)
    }

   
})

const mapState = (state) => ({
    customerList:state.getIn(['left', 'userInfo']).toJS().customerList,
    isAdd:state.getIn(['left', 'isAdd']),
    isEdit:state.getIn(['left', 'isEdit'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)