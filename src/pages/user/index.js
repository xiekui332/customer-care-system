import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { sessionGetItem, sessionSetItem, checkmobile, createUser, userList, userDetail, userDelete } from '../../api'
import { Tooltip, Input, Select, message, Empty, Modal, Spin  } from 'antd';

import {
    UserWrapper,
    UserCon,
    UserMiddle,
    UserRight,
    MiddleHeader,
    OperateWrapper,
    MiddleListWrapper,
    AddCustomerWrapper,
    MiddleList,
    CustomerInfo,
    AddCusHeadWrapper,
    AddButtonWrapper,
    AddCusHeadText,
    AddCusButton,
    AddContent,
    AddItem,
    AddTitle,
    SearchWrapper,
    SearchCondition,
    SearchInput,
    StatusWrapper,
    UserListWapper,
    UserOprate,
    EditItem,
    MiddleChceckBoxSmall
    
} from './style'

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            login:sessionGetItem('token'),
            userList:[],
            userType:'',
            userInfo:sessionGetItem('user'),
            pageNum:1,
            pageSize:10,
            load:true,
            add:false,
            nodata:true,
            search:false,
            edit:false,
            spin:true,
            userName:'',
            cabinetNo:'',
            mobilePhone:'',
            userId:'',
            userDetail:{},
            saveDetail:{},
            isLook:false,
            isbtn:false,
            activeId:''
        }

        this.resetHeight = this.resetHeight.bind(this)
        this.getData = this.getData.bind(this)
        this.getUserDetail = this.getUserDetail.bind(this)
    }

    render () {
        const { login, userList, add, edit, userId, nodata, userDetail, spin, userType, saveDetail, isbtn } = this.state;
        // console.log(saveDetail)
        const Option = Select.Option;
        const confirm = Modal.confirm;
        let src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556782759160&di=2e2df9eae570460adfc6bec7e2887d3c&imgtype=0&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20120208%2F20120208165308-1774101526.jpg";

        if(login) {
            return (
                <UserWrapper>
                    <LeftCon></LeftCon>
                    <UserCon>
                        <UserMiddle>
                            <MiddleHeader>
                                <span>用户管理</span>
                                <OperateWrapper>
                                    <Tooltip title="新建用户" onClick={() => {this.handleAddMustor(this.addmustorEl, this.searchEl)}}>
                                        <span className="iconfont">&#xe64c;</span>
                                    </Tooltip>
                                    <Tooltip title="搜索" onClick={() => {this.handleSearch(this.searchEl, this.addmustorEl)}}>
                                        <span className="iconfont">&#xe7c0;</span>
                                    </Tooltip>
                                    <Tooltip title="编辑" onClick={() => {this.handleUserEdit(this.useroparateel, this.userlistwrapper)}}>
                                        <span className="iconfont">&#xe693;</span>
                                    </Tooltip>
                                </OperateWrapper>
                            </MiddleHeader>

                            <MiddleListWrapper
                                className="editSrollBar"
                                ref = {(listWrapper) => {this.listWrapper = listWrapper}}
                            >
                                <AddCustomerWrapper 
                                    ref={(addmustorEl) => {this.addmustorEl = addmustorEl}}
                                    onClick={() => {this.handleAdd(this.addmustorEl)}}>
                                    新建用户
                                </AddCustomerWrapper>

                                <SearchWrapper 
                                    ref={(search) => {this.searchEl = search}}
                                >
                                    <SearchCondition>
                                        <span>柜员号</span>
                                        <SearchInput placeholder="请输入柜员号" 
                                            ref={(input) => {this.guiyuanEl = input}}
                                        ></SearchInput>
                                    </SearchCondition>
                                    {/* <SearchCondition>
                                        <span>用户名</span>
                                        <SearchInput placeholder="请输入用户名" 
                                            ref={(input) => {this.searchNameEl = input}}
                                        ></SearchInput>
                                    </SearchCondition> */}
                                    <SearchCondition>
                                        <span>手机号</span>
                                        <SearchInput placeholder="请输入手机号"
                                            ref={(input) => {this.searchMobileEl = input}}
                                        ></SearchInput>
                                    </SearchCondition>

                                    <AddButtonWrapper>
                                        <AddCusButton className="add-cancel" onClick={() => {this.handleCancel(this.searchEl)}}>取消</AddCusButton>
                                        <AddCusButton className="add-save" onClick={() => {this.handleSave(this.guiyuanEl, this.searchNameEl, this.searchMobileEl, this.searchEl)}}>搜索</AddCusButton>
                                    </AddButtonWrapper>
                                </SearchWrapper> 

                                <UserListWapper ref={(userlistwrapper) => {this.userlistwrapper = userlistwrapper}}>
                                    {
                                        userList.length > 0?
                                        userList.map((item, index) => {
                                            return (
                                                <MiddleList 
                                                    className={item.active?"selected":""}
                                                    key={item.userId}
                                                    onClick={() => {this.handleList(this.userlistwrapper, index, item.userId, edit, item.active, this.addmustorEl)}}
                                                >
                                                    
                                                    {/* <MiddleChceckBoxSmall className={edit?"middleChceckBox":" "}>
                                                        <span className={edit && item.active?"iconfont isShow":"iconfont isHide"}>&#xe617;</span>
                                                    </MiddleChceckBoxSmall> */}
                                                    <span className={edit && item.active?'iconfont same-active same-active2 click-active same-active3':'iconfont same-active same-active2'}>&#xe617;</span>
                                                    <MiddleChceckBoxSmall className={edit?'same-active same-active1 click-active':'same-active same-active1'}></MiddleChceckBoxSmall>
                                                    

                                                    {
                                                        item.src?
                                                        <img src={src} alt="" />
                                                        :
                                                        <div className="moren-img"></div>
                                                        // <span className="iconfont">&#xe633;</span>
                                                    }
                                                    
                                                    <CustomerInfo >
                                                        <p>
                                                            <span>{item.name }</span>
                                                            <span>{item.mobilePhone }</span>
                                                        </p>
                                                        <p>
                                                        {item.cabinetNo}
                                                        </p>
                                                    </CustomerInfo>
                                                </MiddleList>
                                            )
                                        })
                                        :<Empty className='empty' description={'暂无数据'}/>
                                    }
 
                                    {   
                                        // spin?
                                        // <Spin size="large" className="spin" />
                                        // :''
                                    }

                                    
                                </UserListWapper>

                                <UserOprate 
                                    ref={(useroparateel) => {this.useroparateel = useroparateel}}    
                                >
                                    {/* <EditItem onClick={() => {this.usertransfer()}}>
                                        <span className="iconfont">&#xe60c;</span>
                                        <p>移交</p>
                                    </EditItem> */}
                                    <EditItem onClick={() => {this.handleuserdelete(confirm)}}>
                                        <span className="iconfont">&#xe619;</span>
                                        <p>删除</p>
                                    </EditItem>
                                </UserOprate>
                            </MiddleListWrapper>
                        </UserMiddle>

                        <UserRight className="editSrollBar">
                            <StatusWrapper 
                                className={add?"isShow":"isHide"}
                                >
                                <AddCusHeadWrapper>
                                    {
                                        this.state.isLook?
                                        <AddCusHeadText>编辑用户</AddCusHeadText>
                                        :
                                        <AddCusHeadText>新建用户</AddCusHeadText>
                                    }
                                    
                                    <AddButtonWrapper>
                                        {
                                            isbtn?
                                            <Fragment>
                                            <AddCusButton className="add-cancel" onClick={() => {this.handleAddCancel(saveDetail, this.addmustorEl)}}>取消</AddCusButton>
                                            <AddCusButton className="add-save" onClick={() => {this.handleAddSave(this.name, this.idCard, this.mobile, userId, this.organNum, this.organName)}}>保存</AddCusButton>
                                            </Fragment>
                                            :""
                                        }
                                        
                                    </AddButtonWrapper>
                                </AddCusHeadWrapper>
                                
                                
                                
                                <AddContent>
                                    <Fragment>

                                        <AddItem>
                                            <AddTitle><span>*</span>柜员号</AddTitle>
                                                <Input 
                                                    className="add-input add-input-cabinetNo"
                                                    placeholder="请输入柜员号"
                                                    ref = {(input) => {this.idCard = input}}
                                                    value={userDetail.cabinetNo}
                                                    type='number'
                                                    onChange={() => {this.handleChange(this.idCard, 1)}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>用户姓名</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入姓名"
                                                    ref = {(input) => {this.name = input}}
                                                    value={userDetail.name}
                                                    onChange={() => {this.handleChange(this.name, 2)}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>手机号码</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入手机号码"
                                                    ref = {(input) => {this.mobile = input}}
                                                    value={userDetail.mobilePhone}
                                                    onChange={() => {this.handleChange(this.mobile, 3)}}
                                                />
                                            <p></p>
                                        </AddItem>


                                        <AddItem>
                                            <AddTitle><span>*</span>用户类别</AddTitle>
                                            <Select
                                                showSearch
                                                style={{ width: 400 }}
                                                placeholder="请选择用户类别"
                                                optionFilterProp="children"
                                                onChange={(value) => {this.userkind(value, 2)}}
                                                value={userType}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="2">客户经理</Option>
                                                <Option value="3">审核员</Option>
                                                <Option value="4">业务管理员</Option>
                                            </Select>
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>机构号</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入机构号"
                                                    ref = {(input) => {this.organNum = input}}
                                                    value={userDetail.orgNo}
                                                    onChange={() => {this.handleChange(this.organNum, 4)}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>机构名称</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入机构名称"
                                                    ref = {(input) => {this.organName = input}}
                                                    value={userDetail.orgName}
                                                    onChange={() => {this.handleChange(this.organName, 5)}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        
                                    </Fragment>
                                </AddContent>
                            </StatusWrapper>
                        
                            <Empty className={nodata?"ant-empty isShow":"ant-empty isHide"} description={'暂无数据'} />
                        </UserRight>
                    </UserCon>
                </UserWrapper>
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }
    }

    // 获取页面顶部被卷起来的高度函数
    scrollTop(){
        let el = this.listWrapper;
        return Math.max(
         //chrome
         el.scrollTop);
    }
    
    // 获取页面文档的总高度
    documentHeight(){
        let el = this.listWrapper;
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(el.scrollHeight);
    }

    // 获取页面浏览器视口的高度
    windowHeight(){
        let el = this.listWrapper;
        //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (el.compatMode === "CSS1Compat")?
        el.clientHeight:
        el.clientHeight;
    }

    componentDidMount() {
        if(this.state.login) {
            this.resetHeight(this.listWrapper)
            this.getData();
            let el = this.listWrapper;

            // 滚动翻页
            el.addEventListener('scroll', () => {
                if(this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 50/*滚动响应区域高度取50px*/)) {
                    this.getData('concatList')
                }
            })
        }
        
        
    }

    componentWillUnmount() {
        let el = this.listWrapper;
        el.onscroll = ''
    }

    componentDidUpdate() {
        if(this.state.login) {
            this.resetHeight(this.listWrapper)
            
        }
    }

    // getList methods
    getData(condition) {
        // console.log(this.state.load)
        if(this.state.load) {
            let params = {
                cabinetNo:this.state.cabinetNo,
                mobilePhone:this.state.mobilePhone,
                pageNum:this.state.pageNum,
                pageSize:this.state.pageSize
            }
            this.setState({
                load:false
            }, () => {
                userList(params).then((res) => {
                    let data = res.data;
                    this.setState({
                        spin:true
                    })
                    data.data.list.map((item, index) => (
                        item.active = false
                    ))
                    if(this.state.activeId) {
                        data.data.list.map((item, index) => (
                            item.userId == this.state.activeId?item.active = true:''
                        ))
                    }
                    
                    if(data.code === 1 && data.msg === 'success') {
                        if(data.data && data.data.list) {
    
                            let newhomeList = this.state.userList
                            // 滚动加载的数据
                            if(condition === 'concatList') {
                                this.setState({
                                    userList:newhomeList.concat(data.data.list),
                                    spin:false
                                })
                            }else{
                                this.setState({
                                    userList:data.data.list,
                                    spin:false
                                })
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
    
                        }else{
                            message.error('暂无数据')
                            this.setState({
                                load:false
                            })
                        }
                        
                    }else{
                        this.setState({
                            load:false
                        })
                    }
    
                })
                .catch((err) => {
                    this.setState({
                        load:false
                    })
                })
            })
            
        }
        
    }


    // 点击新建用户
    handleAdd(addmustorEl) {
        let params = {
            cabinetNo: "",
            createTime: "",
            mobilePhone: "",
            name: "",
            orgName: "",
            orgNo: "",
            remark: "",
            userId:'',
            userType: ''
        }
        this.setState({
            add:true,
            search:false,
            userId:"",
            nodata:false,
            userDetail:params,
            userType:undefined,
            isLook:false,
            activeId:''
        },() => {
           
        })
        addmustorEl.classList.remove('add-customer-show')
    }


    // methods
    
    // 新建用户
    handleAddMustor(addmustorEl, searchEl) {
        if(addmustorEl.classList.contains('add-customer-show')) {
            addmustorEl.classList.remove('add-customer-show')
        }else{
            addmustorEl.classList.add('add-customer-show')
        }
        searchEl.classList.remove('searchel-show')
        this.setState({
            isbtn:true
        })
    }

    // 重新计算高度
    resetHeight(el) {
        let screen_height = document.body.clientHeight;
        el.style.height = (screen_height - 60) + 'px';
    }

    // 搜索
    handleSearch(searchEl, addmustorEl) {
        if(searchEl.classList.contains('searchel-show')) {
            searchEl.classList.remove('searchel-show')
        }else{
            searchEl.classList.add('searchel-show')
        }
        
        addmustorEl.classList.remove('add-customer-show')
    }

    // 取消
    handleCancel(searchEl) {
        searchEl.classList.remove('searchel-show')
    }

    // 确定
    handleSave(guiyuanEl, searchNameEl, searchMobileEl, searchEl) {
        this.setState({
            // userName:searchNameEl.value,
            cabinetNo:guiyuanEl.value,
            mobilePhone:searchMobileEl.value,
            pageNum:1,
            pageSize:10,
            load:true,
            userList:[]
        }, () => {
            
            // 收起搜索
            searchEl.classList.remove('searchel-show')
            this.getData()
        })
        

    }

    // 保存用户
    handleAddSave(nameel, idCardel, mobileel, userId, organNum, organName) {
        
        let params = {}
        if(userId) {
            params = {
                userId:"",
                name:'',
                cabinetNo:'',
                mobilePhone:'',
                userType:'',
                remark:'',
                // relationship:'',
                orgNo:'',
                orgName:''
            }
        }else{
            params = {
                name:'',
                cabinetNo:'',
                mobilePhone:'',
                userType:'',
                remark:'',
                // relationship:'',
                orgNo:'',
                orgName:''
            }
        }

        if(!idCardel.input.value) {
            message.error('请填写正确柜员号')
        }else if(!nameel.input.value) {
            message.error('请填写用户名')
        }else if(!mobileel.input.value || !checkmobile.test(mobileel.input.value)) {
            message.error('请填写正确手机号码')
        }else if(!this.state.userType) {
            message.error('请选择用户类别')
        }else if(!organNum.input.value) {
            message.error('请填写机构号')
        }else if(!organName.input.value) {
            message.error('请填写机构名称')
        }
        else {

            if(userId) {
                // console.log(this.state.userType)
                params.userId = userId
                params.userType = this.state.userType
                
                
            }else{
                
                params.userType = this.state.userType
            }
            params.name = nameel.input.value
            params.cabinetNo = idCardel.input.value
            params.mobilePhone = mobileel.input.value
            
            params.remark = ''
            // params.relationship = ''
            params.orgNo = organNum.input.value
            params.orgName = organName.input.value
            
            createUser(params)
            .then((res) => {
                let data = res.data;
                if(data.code === 1 && data.msg === 'success') {
                   if(userId) {
                        message.success('编辑成功')
                        this.setState({
                            activeId:userId
                        })
                   }else{
                        message.success('新建成功')
                   }
                    
                    nameel.input.value = ''
                    idCardel.input.value = ''
                    mobileel.input.value = ''
                    
                    this.setState({
                        load:true,
                        pageNum:1,
                        pageSize:10,
                        cabinetNo:'',
                        mobilePhone:''
                    }, () => {
                        this.getData() 
                    })
                }else {
                    message.error(data.msg)
                }
            })
            .catch((err) => {
                message.error(err.msg)
            })
        }
    }

    // 取消保存用户
    handleAddCancel(saveDetail, addmustorEl) {
        addmustorEl.classList.remove('add-customer-show')

        // if(saveDetail.cabinetNo) {
            
        //     // 有详情
        //     this.setState({
        //         add:true,
        //         nodata:false,
        //         userDetail:sessionGetItem('saveDetail'),
        //         isbtn:false
        //     })
        // }else{
        //     // 无详情
        //     this.setState({
        //         add:false,
        //         nodata:true
        //     })
        // }
         // 无详情
         this.setState({
            add:false,
            nodata:true
        })
        
    }

    // 点击用户列表
    handleList(boxel, index, id, edit, active, addmustorEl) {
        let userdata = this.state.userList;
        addmustorEl.classList.remove('add-customer-show')
        if(!edit) {
            if(active) {
                return 
            }else{
                for(let i = 0; i < userdata.length; i ++) {
                    userdata[i].active = false
                }
                userdata[index].active = true;
                this.setState({
                    userList:userdata,
                    isLook:true,
                    isbtn:false
                })

                this.getUserDetail(id)
                
            }
            
        }else{
            if(active) {
                
            }else{
                this.getUserDetail(id)
            }
            
            userdata[index].active = !userdata[index].active
            this.setState({
                userList:userdata,
                isLook:true,
                isbtn:false
            })
            
        }
        
        
    }


    // 获取用户详情的方法
    getUserDetail(id) {
        userDetail({userId:id}).then((res) => {
            let data = res.data;
            
            if(data.code === 1 && data.msg === 'success') {
                if(data.data) {
                    this.userkind(data.data.userType.toString(), 1)
                    let part = '';
                    if(data.data.userType === 1) {
                        part = "用户管理员"
                    }else if(data.data.userType === 2) {
                        part = "客户经理"
                    }else if(data.data.userType === 3) {
                        part = "审核员"
                    }else if(data.data.userType === 4) {
                        part = "业务管理员"
                    }
                    sessionSetItem('saveDetail',data.data )
                    this.setState({
                        add:true,
                        userId:id,
                        nodata:false,
                        userDetail:data.data,
                        saveDetail:data.data,
                        userType:part
                    }, () => {
                        // console.log(this.state.saveDetail)
                    })
                    
                }else{
                    this.setState({
                        add:false,
                        nodata:true
                    })
                }

            }
        })
    }

    // 用户类型
    userkind(value, type) {
        if(type === 2){
            this.setState({
                isbtn:true
            })
        }
        this.setState({
            userType:value
        }, () => {
            // console.log(value)
        })
    }


    // 编辑用户
    handleUserEdit(useroparateel, userlistwrapper) {
        this.setState({
            edit:!this.state.edit
        }, () => {
            let userdata = this.state.userList;
            if(!this.state.edit) {
                for(let i = 0; i < userdata.length; i ++) {
                    userdata[i].active = false
                }
                this.setState({
                    userList:userdata
                })
                // 编辑时底部弹出
                useroparateel.classList.remove('useroparate-active')
                userlistwrapper.classList.remove('padding-active')
            }else{
                // 编辑时底部弹出
                useroparateel.classList.add('useroparate-active')
                userlistwrapper.classList.add('padding-active')
            }

            
        })
        
    }

    // 移交用户
    usertransfer() {
        
    }

    // 删除用户
    handleuserdelete(confirm) {
        let data = this.state.userList,
            deleArr = [];
            let that = this;
        data.map((item, index) => (
            item.active?deleArr.push(item.userId):""
        ))
        let params = {
            userIds:deleArr.join(',')
        }
        if(!deleArr.length) {
            return
        }
        confirm({
            title: '删除操作后不可以恢复, 确认删除?',
            okText:"确定",
            cancelText:"取消",
            onOk() {
                userDelete(params).then((res) => {
                    let data = res.data
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('删除成功')
                        that.setState({
                            userList:[],
                            load:true,
                            pageNum:1,
                            pageSize:10,
                            add:false,
                            nodata:true,
                            cabinetNo:'',
                            mobilePhone:''
                        }, () => {
                            that.getData() 
                        })
                    }else{
                        // message.error(data.msg)
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        
    }

    // input onchange
    handleChange(el, type) {
        let userDetail = this.state.userDetail

        if(type === 1) {
            userDetail.cabinetNo = el.input.value
        }else if(type === 2) {
            userDetail.name = el.input.value
        }else if(type === 3) {
            userDetail.mobilePhone = el.input.value
        }else if(type === 4) {
            userDetail.orgNo = el.input.value
        }else if(type === 5) {
            userDetail.orgName = el.input.value
        }
        this.setState({
            userDetail:userDetail,
            isbtn:true
        }, () => {
            // console.log(this.state.saveDetail)
        })
    }

}

export default connect()(User)