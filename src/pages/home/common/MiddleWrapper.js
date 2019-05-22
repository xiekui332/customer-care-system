import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Tooltip, Modal, message } from 'antd';
import "antd/dist/antd.css";
import { handlecustomDelete, getCustomerList } from '../../../api'
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
    constructor(props) {
        super(props)
        this.state = {
            isAdd:false,
            search:false,
            edit:false,
            user:JSON.parse(sessionStorage.getItem("user")),
            name:'',
            mobilePhone:'',
            companyName:'',               // 公司名称
            yearlyTurnoverSymbol:'',      // 年营业额符号（><=）
            yearlyTurnover:'',           // 年营业额（万元）   
            propertySymbol:'',          // 资产情况符号（><=）
            property:'',                // 资产情况（万元）
            liabilitiesSymbol:'',       // 负债情况符号（><=）
            liabilities:'',             // 负债情况（万元）
            demandAmountSymbol:'',      // 需求金额符号（><=）
            demandAmount:'',            // 需求金额（万元）
            pageNum:1,  
            pageSize:10,
            customerId:''
        }
    }

    render () {
        const { 
                handleCancelCustomer,
                homeList,
                isAddAction
        } = this.props;
        const { isAdd, search, edit } = this.state;
        // console.log(homeList)
        const confirm = Modal.confirm;
        
        return (
            <Customer className="customer">
                <MiddleHeader>
                    <span>客户管理</span>
                    <OperateWrapper>
                        <Tooltip title="新建客户" onClick={() => {this.addCustomer(isAdd)}}>
                            <span className="iconfont">&#xe64c;</span>
                        </Tooltip>
                        <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer(search)}}>
                            <span className="iconfont">&#xe7c0;</span>
                        </Tooltip>
                        <Tooltip title="编辑" onClick={() => {this.handleEditCustomer(edit, homeList, this.editWrapperEl, this.middleListWrapperEl)}}>
                            <span className="iconfont">&#xe693;</span>
                        </Tooltip>
                    </OperateWrapper>
                </MiddleHeader>
                   

                <MiddleListWrapper className="editSrollBar" ref={(middleListWrapper) => {this.middleListWrapperEl = middleListWrapper}}>
                    {/* 新建客户 */}
                    <AddCustomerWrapper 
                        className={isAdd?"addcustomer-show":""}
                        ref={(addcusEl) => { this.addcusEl = addcusEl}}
                        onClick={() => {this.handleAdd(isAddAction)}}>
                        新建客户
                    </AddCustomerWrapper>

                    {/* 搜索 */}
                    <SearchWrapper className={search?"searchWrapper":''}>
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
                        homeList && homeList.map((item, index) => (
                            <MiddleList 
                                className={item.active?"selected":""}
                                onClick={() => {this.handleList(homeList, item, index, item.customerId, item.active, edit)}}
                                key={item.customerId}>
                                <MiddleChceckBox className={edit?"middleChceckBox":" "}>
                                    <span className={edit && item.active?"iconfont isShow":"iconfont isHide"}>&#xe617;</span>
                                </MiddleChceckBox>
                                {
                                    item.photo?<img src={item.photo} alt="" />:<span className="iconfont">&#xe61a;</span>
                                }
                                <CustomerInfo >
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{item.mobilePhone}</span>
                                    </p>
                                    <p>
                                        {item.companyName}
                                    </p>
                                </CustomerInfo>
                            </MiddleList>
                        ))
                    }
                    
                    
                </MiddleListWrapper>

                {/* 底部批量操做部分 */}
                <EditWrapper ref={(editWrapper) => {this.editWrapperEl = editWrapper}}>
                    <EditItem>
                        <span className="iconfont">&#xe60c;</span>
                        <p>移交</p>
                    </EditItem>
                    <EditItem onClick={() => {this.handledelete(confirm, homeList)}}>
                        <span className="iconfont">&#xe619;</span>
                        <p>删除</p>
                    </EditItem>
                    {/* <EditItem>
                        <span className="iconfont">&#xe60a;</span>
                        <p>资料备份</p>
                    </EditItem> */}
                </EditWrapper>
            </Customer>
        )
    }


    componentDidMount() {
        this.props.resetHeight()
        this.getListData()
    }

    // 获取list
    getListData() {
        let data = this.state.user;
        let { name, mobilePhone, companyName, yearlyTurnoverSymbol, yearlyTurnover, propertySymbol, property, liabilitiesSymbol, liabilities, demandAmountSymbol, 
            demandAmount, pageNum, pageSize
        } = this.state;
        let urlType = data.userType
        let params = {}
        if(urlType === 2) {
            // 客户经理
            params = {
                name:name,
                mobilePhone:mobilePhone,
                companyName:companyName,
                yearlyTurnoverSymbol:yearlyTurnoverSymbol,
                yearlyTurnover:yearlyTurnover,
                propertySymbol:propertySymbol,
                property:property,
                liabilitiesSymbol:liabilitiesSymbol,
                liabilities:liabilities,
                demandAmountSymbol:demandAmountSymbol,
                demandAmount:demandAmount,
                pageNum:pageNum,
                pageSize:pageSize
            }
        }else if(urlType === 3) {
            // 审核员
            params = {
                name:name,
                mobilePhone:mobilePhone,
                companyName:companyName,
                pageNum:pageNum,
                pageSize:pageSize
                
            }
        }else if(urlType === 4) {
            // 业务管理员
            params = {
                name:name,
                mobilePhone:mobilePhone,
                companyName:companyName,
                yearlyTurnoverSymbol:yearlyTurnoverSymbol,
                yearlyTurnover:yearlyTurnover,
                propertySymbol:propertySymbol,
                property:property,
                liabilitiesSymbol:liabilitiesSymbol,
                liabilities:liabilities,
                demandAmountSymbol:demandAmountSymbol,
                demandAmount:demandAmount,
                pageNum:pageNum,
                pageSize:pageSize
            }
        }

        getCustomerList(params, urlType).then((res) => {
            let data = res.data;
            if(data.code === 1 && data.msg === 'success') {
                // 测试数据
                data.data = {
                    "list": [
                        {
                            "customerId": 1,
                            "userId": 1,
                            "name": "张三",
                            "idcard": "320926195511175276",
                            "mobilePhone": "13212345678",
                            "companyName": "aaa",
                            "status":0,
                            "photo":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg",
                            "createTime": "2019-05-01 18:09:30"
                        },
                        {
                            "customerId": 2,
                            "userId": 2,
                            "name": "张三",
                            "idcard": "320926195511175276",
                            "mobilePhone": "13212345678",
                            "companyName": "aaa",
                            "status":0,
                            "photo":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg",
                            "createTime": "2019-05-01 18:09:30"
                        },
                        {
                            "customerId": 3,
                            "userId": 3,
                            "name": "张三",
                            "idcard": "320926195511175276",
                            "mobilePhone": "13212345678",
                            "companyName": "aaa",
                            "status":0,
                            "photo":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg",
                            "createTime": "2019-05-01 18:09:30"
                        },
                        {
                            "customerId": 4,
                            "userId": 4,
                            "name": "张三",
                            "idcard": "320926195511175276",
                            "mobilePhone": "13212345678",
                            "companyName": "aaa",
                            "status":0,
                            "photo":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg",
                            "createTime": "2019-05-01 18:09:30"
                        },
                        {
                            "customerId": 5,
                            "userId": 5,
                            "name": "张三",
                            "idcard": "320926195511175276",
                            "mobilePhone": "13212345678",
                            "companyName": "aaa",
                            "status":0,
                            "photo":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg",
                            "createTime": "2019-05-01 18:09:30"
                        }
                    ],
                    "total": 1,
                    "pageNum": 1,
                    "pageSize": 20
                }

                if(data.data) {
                    data.data.list.map((item, index) => (
                        item.active = false
                    ))
                    this.props.disCusList(data.data.list)
                }
            }else{
                message.error(data.msg);
            }
        })
    }

    
    // 添加客户
    addCustomer(isAdd) {
        this.setState({
            isAdd:!this.state.isAdd,
            search:false
        })
        
    }

     // 点击搜索
    handleSearchCustomer(search) {
        this.setState({
            search:!this.state.search,
            isAdd:false
        })
    }

     // 点击编辑
    handleEditCustomer(edit, homeList, editWrapperEl, middleListWrapperEl) {
        
        this.setState({
            edit:!this.state.edit,
            isAdd:false,
            search:false
        }, () => {
            if(!this.state.edit) {
                homeList.map((item, index) => (
                    item.active = false
                ))
                this.props.disCusList(homeList)
                editWrapperEl.classList.remove('editWrapper-active')
                middleListWrapperEl.classList.remove('middleListWrapper-active')
            }else{
                this.props.disCusList(homeList)
                editWrapperEl.classList.add('editWrapper-active')
                middleListWrapperEl.classList.add('middleListWrapper-active')
            }
        })


        
        
    }

    // 点击列表
    handleList(homeList, item, index, customerId, active, edit) {
        if(!edit) {
            if(active) {
                return 
            }else{
                for(let i = 0; i < homeList.length; i ++) {
                    homeList[i].active = false
                }
                homeList[index].active = true;
                
                this.props.disCusList(homeList)
                // this.getUserDetail(userId)
                
            }
        }else {
            if(active) {
                
            }else{
                // this.getUserDetail(userId)
            }
            
            homeList[index].active = !homeList[index].active
            this.props.disCusList(homeList)
        }
    }

    // 列表删除
    handledelete(confirm, homeList) {
        let deleArr = [];
        let that = this;
        homeList.map((item, index) => (
            item.active?deleArr.push(item.customerId):""
        ))
        let params = {
            id:JSON.stringify(deleArr)
        }
        if(!deleArr.length) {
            return
        }
        confirm({
            title: '确认删除?',
            okText:"确定",
            cancelText:"取消",
            onOk() {
                handlecustomDelete(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('删除成功')
                        that.setState({
                            load:true,
                            pageNum:1,
                            pageSize:10
                        }, () => {
                            that.getListData()
                        })
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

     // 点击新建用户
     handleAdd(isAddAction) {
        this.setState({
            customerId:""
        },() => {
            let params = {
                isAdd:true
            }
            isAddAction(params)
        })
    }

  
}


const mapDispatch = (dispatch) => ({
    
    // 改变客户列表数据
    disCusList(data) {
        let action = actionCreators.getMiddleList(data)
        dispatch(action)
    },


    // 重新计算高度
    resetHeight() {
        let screen_height = document.body.clientHeight;
        let el = document.getElementsByClassName('editSrollBar')[0]
        el.style.height = (screen_height - 60) + 'px';
    },

    // 点击新建客户派发action
    isAddAction(params) {
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
    }

   
   
})

const mapState = (state) => ({
    customerList:state.getIn(['left', 'userInfo']).toJS().customerList,
    isAdd:state.getIn(['left', 'isAdd']),
    isEdit:state.getIn(['left', 'isEdit']),
    homeList:state.getIn(['left', 'homeList']).toJS()
})

export default connect(mapState, mapDispatch)(MiddleWrapper)