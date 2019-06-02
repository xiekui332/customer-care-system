import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Tooltip, Modal, message, Select  } from 'antd';
import "antd/dist/antd.css";
import { handlecustomDelete, getCustomerList, getCustomerDetail, toTransfer, sureToTransfer } from '../../../api'
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
    TotransferButton,
    SearchMoreCodition

} from '../style'

class MiddleWrapper extends Component{
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
            totransfer:[]
        }

        this.handleCancelSearch = this.handleCancelSearch.bind(this)
    }

    render () {
        const { isAddAction } = this.props;
        const Option = Select.Option;
        let homeList = []
        if(this.props.homeList) {
            homeList = this.props.homeList.toJS()
        }
        const { isAdd, search, edit, totransfer, yearlyTurnoverSymbol, propertySymbol, liabilitiesSymbol, demandAmountSymbol } = this.state;
        const user = JSON.parse(sessionStorage.getItem("user"))
        // console.log(totransfer)
        const confirm = Modal.confirm;
        
        return (
            <Customer className="customer" ref={(middleWrapper) => {this.modalWrapper = middleWrapper}}>
                <MiddleHeader>
                    {
                        user.userType === 3?
                        <span>客户审核</span>
                        :
                        <Fragment>
                            <span>客户管理</span>
                            <OperateWrapper>
                                {
                                    user.userType === 4?
                                    <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer(search)}}>
                                        <span className="iconfont">&#xe7c0;</span>
                                    </Tooltip>
                                    :
                                    <Fragment>
                                        <Tooltip title="新建客户" onClick={() => {this.addCustomer(isAdd)}}>
                                            <span className="iconfont iconfont-add">&#xe64c;</span>
                                        </Tooltip>
                                        <Tooltip title="搜索" onClick={() => {this.handleSearchCustomer(search)}}>
                                            <span className="iconfont">&#xe7c0;</span>
                                        </Tooltip>
                                        <Tooltip title="管理" onClick={() => {this.handleEditCustomer(edit, homeList, this.editWrapperEl, this.middleListWrapperEl)}}>
                                            <span className="iconfont">&#xe693;</span>
                                        </Tooltip>
                                    </Fragment>
                                }
                                
                            </OperateWrapper>
                        </Fragment>
                    }
                    
                </MiddleHeader>
                   

                <MiddleListWrapper className="editSrollBar" ref={(middleListWrapper) => {this.middleListWrapperEl = middleListWrapper}}>
                    {/* 新建客户 */}
                    <AddCustomerWrapper 
                        className={isAdd?"addcustomer-show":""}
                        ref={(addcusEl) => { this.addcusEl = addcusEl}}
                        onClick={() => {this.handleAdd(isAddAction, homeList)}}>
                        新建客户
                    </AddCustomerWrapper>

                    {/* 搜索 */}
                    <SearchWrapper className={search?"searchWrapper":''}>
                        <SearchCondition>
                            <div className="condition-select">
                                <p>客户姓名</p>
                                <SearchInput 
                                    placeholder="请输入客户姓名"
                                    ref={(input) => {this.cusName = input}}
                                ></SearchInput>
                            </div>
                            <div className="condition-select">
                                <p>公司名称</p>
                                <SearchInput 
                                    placeholder="请输入公司名称"
                                    ref={(input) => {this.cusCompanyName = input}}
                                ></SearchInput>
                            </div>
                        </SearchCondition>
                       
                        <SearchMoreCodition>
                            <div className="condition-select">
                                <p>年营业额</p>
                                <Select
                                    style={{ width: '50%' }}
                                    showSearch
                                    placeholder="请选择"
                                    onChange={(value) => {this.handleyearlyTurnoverEl(value)}}
                                    value={yearlyTurnoverSymbol}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <SearchInput 
                                    className="small-input"
                                    placeholder="年营业额(万元)"
                                    ref={(input) => {this.yearlyTurnoverEl = input}}
                                ></SearchInput>
                            </div>
                            <div className="condition-select">
                                <p>资产情况</p>
                                <Select
                                    style={{ width: '50%' }}
                                    showSearch
                                    placeholder="请选择"
                                    onChange={(value) => {this.handlepropertyEl(value)}}
                                    value={propertySymbol}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <SearchInput 
                                    className="small-input"
                                    placeholder="资产情况(万元)"
                                    ref={(input) => {this.propertyEl = input}}
                                ></SearchInput>
                            </div>
                        </SearchMoreCodition>
                        <SearchMoreCodition>
                            <div className="condition-select">
                                <p>负债情况</p>
                                <Select
                                    style={{ width: '50%' }}
                                    showSearch
                                    placeholder="请选择"
                                    onChange={(value) => {this.handleliabilitiesEl(value)}}
                                    value={liabilitiesSymbol}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <SearchInput 
                                    className="small-input"
                                    placeholder="负债情况(万元)"
                                    ref={(input) => {this.liabilitiesEl = input}}
                                ></SearchInput>
                            </div>
                            <div className="condition-select">
                                <p>需求金额</p>
                                <Select
                                    style={{ width: '50%' }}
                                    showSearch
                                    placeholder="请选择"
                                    onChange={(value) => {this.handledemandAmountEl(value)}}
                                    value={demandAmountSymbol}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=">">&gt;</Option>
                                    <Option value="<">&lt;</Option>
                                    <Option value="=">=</Option>
                                </Select>
                                <SearchInput 
                                    className="small-input"
                                    placeholder="需求金额(万元)"
                                    ref={(input) => {this.demandAmountEl = input}}
                                ></SearchInput>
                            </div>
                        </SearchMoreCodition>


                        <AddButtonWrapper>
                            <AddCusButton className="add-cancel" 
                                onClick={() => {this.handleCancelSearch(this.cusName, this.cusCompanyName)}}
                            >取消</AddCusButton>
                            <AddCusButton className="add-save"
                                onClick={() => {this.handleSaveSearch(this.cusName, this.cusCompanyName, this.yearlyTurnoverEl, this.propertyEl, this.liabilitiesEl, this.demandAmountEl)}}
                            >查询</AddCusButton>
                        </AddButtonWrapper>
                    </SearchWrapper> 

                    {
                        homeList && homeList.map((item, index) => (
                            <MiddleList 
                                className={item.active?"selected list":" list"}
                                onClick={() => {this.handleList(homeList, item, index, item.customerId, item.active, edit)}}
                                key={item.customerId}>
                                <MiddleChceckBox className={edit?"middleChceckBox":" "}>
                                    <span className={edit && item.active?"iconfont isShow":"iconfont isHide"}>&#xe617;</span>
                                </MiddleChceckBox>
                                {
                                    item.photo?<img src={item.photo} alt="" />:<span className="iconfont">&#xe633;</span>
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
                

                {/* 点击底部移交出现 */}
                <TransferWrapper ref={(transferWrap) => {this.transferWrapEl = transferWrap}}>
                    <PositionWrapper>
                        <div className="top-wrapper" onClick={() => {this.hideTotransfer(this.transferWrapEl)}}></div>
                        <Tolist className="editSrollBar">
                            {
                                totransfer && totransfer.map((item, index) => (
                                    <TotransferItem className={item.active?"active":""} key={item.cabinetNo}
                                        onClick={() => {this.handleTransfer(item, totransfer)}}
                                    >
                                        <ToTraItem>
                                            <span className="title">{item.name}</span>
                                            <span className="mobile">{item.cabinetNo}</span>
                                        </ToTraItem>
                                        <ToTraItem>
                                            {/* <span className="idCard"></span> */}
                                        </ToTraItem>
                                    </TotransferItem>
                                ))
                            }
                           
                        </Tolist>
                        <div className="botton-wrapper">
                            <TotransferButton onClick={() => {this.sureTransfer(totransfer, homeList, this.transferWrapEl)}}>确认移交</TotransferButton>
                        </div>
                    </PositionWrapper>
                    
                </TransferWrapper>
            </Customer>
        )
    }


    componentDidUpdate() {
        if(this.props.changeAddStatus) {
            this.setState({
                load:true,
                pageNum:1
            }, () => {
                this.getListData()
                return
            })
        }
    }



    componentDidMount() {
        this.props.resetHeight()
        this.getListData()
        
        let el = this.middleListWrapperEl;
        el.addEventListener('scroll', () => {

            if(this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 50/*滚动响应区域高度取50px*/)) {
                // console.log('bottom')
                this.getListData('concatList')
            }
        })
        // let listEl = document.getElementsByClassName('list')
        // let evn = new Event('click')
        // console.log(listEl)
        // listEl.dispatchEvent(evn)

    }

    // 获取页面顶部被卷起来的高度函数
    scrollTop(){
        let el = this.middleListWrapperEl;
        return Math.max(
         //chrome
         el.scrollTop);
    }
    
    // 获取页面文档的总高度
    documentHeight(){
        let el = this.middleListWrapperEl;
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(el.scrollHeight);
    }

    // 获取页面浏览器视口的高度
    windowHeight(){
        let el = this.middleListWrapperEl;
        //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (el.compatMode === "CSS1Compat")?
        el.clientHeight:
        el.clientHeight;
    }

    

    componentWillUnmount() {
        let el = this.middleListWrapperEl;
        el.onscroll = ''
    }

    // 年营业额
    handleyearlyTurnoverEl(value) {
        // console.log(value)
        this.setState({
            yearlyTurnoverSymbol:value
        })
    }

    // 资产情况
    handlepropertyEl(value) {
        this.setState({
            propertySymbol:value
        })
    }


    // 负债情况
    handleliabilitiesEl(value) {
        this.setState({
            liabilitiesSymbol:value
        })
    }

    // 需求金额
    handledemandAmountEl(value) {
        this.setState({
            demandAmountSymbol:value
        })
    }

    // 转义
    unhtml(str) {
        return str ? str.replace(/[<">']/g, (a) => {
            return {
                '<': '&lt;',
                '>': '&gt;',
            }[a]
        }) : '';
    }

    // 搜索取消
    handleCancelSearch(cusName, cusCompanyName) {
        this.setState({
            search:false
        }, () => {
            cusName.value = ''
            cusCompanyName.value = ''
        })
    }

    // 搜索查询数据
    handleSaveSearch(cusName, cusCompanyName, yearlyTurnoverEl, propertyEl, liabilitiesEl, demandAmountEl) {
        this.setState({
            name:cusName.value,
            companyName:cusCompanyName.value,
            yearlyTurnover:yearlyTurnoverEl.value,
            property:propertyEl.value,
            liabilities:liabilitiesEl.value,
            demandAmount:demandAmountEl.value,
            load:true,
            pageNum:1
        }, () => {
            this.getListData()
        })
    }

    // 获取list
    getListData(condition) {
        this.props.handleChangeStatus(false)
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
            this.setState({
                load:false
            }, () => {
                getCustomerList(params, urlType).then((res) => {
                    let data = res.data;
                    
                    if(data.code === 1 && data.msg === 'success') {
                        this.setState({
                            search:false
                        })
                        
                        if(data.data && data.data.list) {
                            data.data.list.map((item, index) => (
                                item.active = false
                            ))
                            
                            let newhomeList = this.props.homeList
                            // 滚动加载的数据
                            if(condition === 'concatList') {
                                this.props.disCusList(newhomeList.concat(data.data.list))
                            }else{
                                this.props.disCusList(data.data.list)
                            }
                            
                            if(data.data.hasNextPage) {
                                this.setState({
                                    load:true,
                                    pageNum:data.data.pageNum + 1
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
                            // console.log(data)
                            this.props.disCusDetail(data.data)
                            this.props.disSpin(false)
                        }else{
                            message.error('暂无数据')
                        }
                    }else{
                        message.error(data.msg)
                    }
                })
                
            }
        }else {
            homeList[index].active = !homeList[index].active
            this.props.disCusList(homeList)
            let arr = []
            homeList.map((item, index) => (
                item.active?arr.push(item.customerId):""
            ))
            if(arr.length) {
                this.props.disShowDetail(true)  
            }else{
                this.props.disShowDetail(false) 
            }

            let params = {}
            if(active) {
                if(arr.length) {
                    params = {
                        id:arr[arr.length - 1]
                    }
                }else {
                    return
                }
                
            }else {
                params = {
                    id:customerId
                }
            }
            this.props.disSpin(true)
            this.props.disShowDetail(true)
            getCustomerDetail(params).then((res) => {
                let data = res.data
                if(data.code === 1 && data.msg === 'success') {
                    if(data.data) {
                        // console.log(data)
                        this.props.disCusDetail(data.data)
                        this.props.disSpin(false)
                    }else{
                        message.error('暂无数据')
                    }
                }else{
                    message.error(data.msg)
                }
            })
            
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
            customerIds:deleArr.join(',')
        }
        if(!deleArr.length) {
            message.info('请先选择客户')
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
                            that.props.disShowDetail(false)
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
     handleAdd(isAddAction, homeList) {
        homeList.map((item, index) => (
            item.active = false
        ))
        this.props.disCusList(homeList)
        
        this.setState({
            customerId:"",
            isAdd:false
        },() => {
            let params = {
                isAdd:true
            }
            isAddAction(params)
            let obj = {}
            this.props.disShowDetail(false)
            this.props.handleCusEdit(false)
            this.props.disCusDetail(obj)
        })
    }


    // 要移交的客户经理列表handle
    handleTransfer(item, totransfer) {
        
        let newtotransfer = totransfer
        newtotransfer.map((item) => (
            item.active = false
        ))
        item.active = true
        this.setState({
            totransfer:newtotransfer
        }, () => {
            // console.log(this.state.totransfer)
        })
    }

    // 点击移交
    handleToTransfer(transferWrapEl, homeList) {
        let data = []
        homeList.map((item, index) => (
            item.active === true?data.push(item):''
        ))

        toTransfer().then((res) => {
            let data = res.data
            console.log(data)
            if(data.data) {
                data.data.map((item, index) => (
                    item.active = false
                ))
                this.setState({
                    totransfer:data.data
                })
            }else {
                message.error(data.msg)
            }
        })
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


    // 确认移交
    sureTransfer(totransfer, homeList, transferWrapEl) {
        let customerIds = []
        let newUserId = ''
        homeList.map((item) => {
            return (
                item.active?customerIds.push(item.customerId):""
            )
        })
        totransfer.map((item) => {
            return (
                item.active?newUserId = item.userId:""
            )
        })

        let params = {
            customerIds:customerIds.join(','),
            newUserId:newUserId
        }
        if(!newUserId) {
            message.info('请选择一个客户经理')
            return
        }
        sureToTransfer(params).then((res) => {
            let data = res.data;
            console.log(data)
            if(data.code === 1 && data.msg === 'success') {
                message.success('移交成功')
                transferWrapEl.classList.remove('active')
            }else{
                message.error(data.msg)
            }
        })
    }

  
}


const mapDispatch = (dispatch) => ({
    // 改变客户列表数据
    disCusList(data) {
        // debugger
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
    handleChangeStatus(bool) {
        let action = actionCreators.changeAddStatus(bool)
        dispatch(action)
    },


    // 编辑客户
    handleCusEdit(bool) {
        let action = actionCreators.changeCusEdit(bool)
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