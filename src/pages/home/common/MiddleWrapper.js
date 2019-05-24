import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Tooltip, Modal, message } from 'antd';
import "antd/dist/antd.css";
import { handlecustomDelete, getCustomerList, getCustomerDetail } from '../../../api'
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
    EditItem,
    TransferWrapper,
    PositionWrapper,
    Tolist,
    TotransferItem,
    ToTraItem,
    TotransferButton

} from '../style'

class MiddleWrapper extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            isAdd:false,
            search:false,
            edit:false,
            visible:true,
            user:JSON.parse(sessionStorage.getItem("user")),
            load:true,
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
            customerId:'',
            changeData:this.props.changeAddStatus,
            totransfer:[
                {
                    id:1,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                },
                {
                    id:2,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                },
                {
                    id:3,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                },
                {
                    id:4,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                },
                {
                    id:5,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                },
                {
                    id:6,
                    name:'小菜',
                    mobile:18334974858,
                    idCard:142603199303283737
                }

            ]
        }
    }

    render () {
        const { 
                handleCancelCustomer,
                isAddAction

        } = this.props;
        let homeList = []
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        const { isAdd, search, edit, totransfer } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        // console.log(homeList)
        const confirm = Modal.confirm;
        
        return (
            <Customer className="customer" ref={(middleWrapper) => {this.modalWrapper = middleWrapper}}>
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
                                        {item.companyName || '暂无公司信息'}
                                    </p>
                                </CustomerInfo>
                            </MiddleList>
                        ))
                    }
                    
                    
                </MiddleListWrapper>

                {/* 底部批量操做部分 */}
                <EditWrapper ref={(editWrapper) => {this.editWrapperEl = editWrapper}}>
                    {
                        user.userType === 2?
                        <EditItem onClick={() => {this.handleToTransfer(this.transferWrapEl, homeList)}}>
                            <span className="iconfont">&#xe60c;</span>
                            <p>移交</p>
                        </EditItem>
                        :""
                    }
                    
                    <EditItem onClick={() => {this.handledelete(confirm, homeList)}}>
                        <span className="iconfont">&#xe619;</span>
                        <p>删除</p>
                    </EditItem>
                    {/* <EditItem>
                        <span className="iconfont">&#xe60a;</span>
                        <p>资料备份</p>
                    </EditItem> */}
                </EditWrapper>
                

                {/* 点击移交出现 */}
                <TransferWrapper ref={(transferWrap) => {this.transferWrapEl = transferWrap}}>
                    <PositionWrapper>
                        <div className="top-wrapper" onClick={() => {this.hideTotransfer(this.transferWrapEl)}}></div>
                        <Tolist className="editSrollBar">
                            {
                                totransfer.map((item, index) => (
                                    <TotransferItem className='active' key={item.id}>
                                        <ToTraItem>
                                            <span className="title">{item.name}</span>
                                            <span className="mobile">{item.mobile}</span>
                                        </ToTraItem>
                                        <ToTraItem>
                                            <span className="idCard">{item.idCard}</span>
                                        </ToTraItem>
                                    </TotransferItem>
                                ))
                            }
                           
                        </Tolist>
                        <div className="botton-wrapper">
                            <TotransferButton>确认移交</TotransferButton>
                        </div>
                    </PositionWrapper>
                    
                </TransferWrapper>
            </Customer>
        )
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.changeAddStatus === true) {
            this.getListData()
        }
        
    }

    componentDidUpdate() {
        if(this.state.changeData) {
            this.getListData()
        }
    }


    componentDidMount() {
        this.props.resetHeight()
        this.getListData()
        
        let el = this.middleListWrapperEl;
        el.addEventListener('scroll', () => {
            if(el.scrollTop + el.clientHeight === el.scrollHeight) {
                this.setState({
                    pageNum: this.state.pageNum + 1
                }, () => {
                    this.getListData('concatList')
                })
            }
        })

    }

    

    componentWillUnmount() {
        let el = this.middleListWrapperEl;
        el.onscroll = ''
    }

    // 获取list
    getListData(condition) {
        // console.log(this.state.changeData)
        // console.log(this.state.load)
        if(this.state.load) {

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

                    if(data.data.list) {
                        data.data.list.map((item, index) => (
                            item.active = false
                        ))
                        let newhomeList = this.props.homeList
                        // 滚动加载的数据
                        if(condition === 'concatList') {
                            // console.log(newhomeList.concat(data.data.list))
                            this.props.disCusList(newhomeList.concat(data.data.list))
                        }else{
                            // console.log(data.data.list)
                            this.props.disCusList(data.data.list)
                        }
                        this.props.handleChangeStatus()
                        if(data.data.hasNextPage) {
                            this.setState({
                                load:true
                            })
                        }else {
                            this.setState({
                                load:false
                            })
                        }
                    }
                }else{
                    message.error(data.msg);
                }
            })

        }
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
        let params = {
            isAdd:false
        }
        this.props.isAddAction(params)
        
        if(!edit) {
            if(active) {
                return 
            }else{
                for(let i = 0; i < homeList.length; i ++) {
                    homeList[i].active = false
                }
                homeList[index].active = true;
                this.props.disShowDetail(true)
                this.props.disSpin(true)
                
                this.props.disCusList(homeList)
                let params = {
                    id:customerId
                }
                getCustomerDetail(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        if(data.data) {
                            console.log(data.attachs)
                            this.props.disCusDetail(data.data)
                            this.props.disSpin(false)
                        }
                    }
                })
                
            }
        }else {
            if(active) {
                
            }else{
                homeList[index].active = !homeList[index].active
                this.props.disCusList(homeList)
                this.props.disShowDetail(true)
                this.props.disSpin(true)
                let params = {
                    id:customerId
                }
                getCustomerDetail(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        if(data.data) {
                            console.log(data)
                            this.props.disCusDetail(data.data)
                            this.props.disSpin(false)
                        }
                    }
                })
            }
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
            this.props.disShowDetail(false)
        })
    }


    // 点击移交
    handleToTransfer(transferWrapEl, homeList) {
        let data = []
        homeList.map((item, index) => (
            item.active === true?data.push(item):''
        ))
        if(data.length) {
            transferWrapEl.classList.add('active')
        }else{
            message.info('请先选择要移交的客户')
        }
        
    }

    // 隐藏移交列表
    hideTotransfer(transferWrapEl) {
        transferWrapEl.classList.remove('active')
    }



  
}


const mapDispatch = (dispatch) => ({
    // 改变客户列表数据
    disCusList(data) {
        // debugger
        let action = actionCreators.getMiddleList(data)
        dispatch(action)

        let action_two = actionCreators.changeAddStatus(false)
        dispatch(action_two)

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
    },


    // 派发客户详情action
    disCusDetail(data) {
        let action = actionCreators.changeCusDetail(data)
        dispatch(action)
    },

    // 派发展示客户详情状态
    disShowDetail(bool) {
        let action = actionCreators.changeShowDetail(bool)
        dispatch(action)
    },

    // 派发加载中
    disSpin(bool) {
        let action = actionCreators.changeSpin(bool)
        dispatch(action)
    },

    //  改变新增客户后的状态
    handleChangeStatus() {
        let action = actionCreators.changeAddStatus(false)
        dispatch(action)
    }

   
   
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    isEdit:state.getIn(['left', 'isEdit']),
    homeList:state.getIn(['left', 'homeList']),
    changeAddStatus:state.getIn(['left', 'changeAddStatus'])
})

export default connect(mapState, mapDispatch)(MiddleWrapper)