import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { sessionGetItem, checkmobile, checkidCard, createUser, userList, userDetail, userDelete } from '../../api'
import { Tooltip, Input, Select, message, Empty, Modal } from 'antd';

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
            search:false,
            edit:false,
            userName:'',
            mobilePhone:'',
            userId:'',
            userDelArr:[]
        }

        this.resetHeight = this.resetHeight.bind(this)
        this.getData = this.getData.bind(this)
        this.getUserDetail = this.getUserDetail.bind(this)
    }

    render () {
        const { login, userList, add, edit, userId } = this.state;
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
                                    <Tooltip title="编辑" onClick={() => {this.handleUserDelete(this.useroparateel, this.userlistwrapper)}}>
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
                                    onClick={() => {this.handleAdd()}}>
                                    新建用户
                                </AddCustomerWrapper>

                                <SearchWrapper 
                                    ref={(search) => {this.searchEl = search}}
                                >
                                    <SearchCondition>
                                        <span>用户名</span>
                                        <SearchInput placeholder="请输入用户名" 
                                            ref={(input) => {this.searchNameEl = input}}
                                        ></SearchInput>
                                    </SearchCondition>
                                    <SearchCondition>
                                        <span>手机号</span>
                                        <SearchInput placeholder="请输入手机号"
                                            ref={(input) => {this.searchMobileEl = input}}
                                        ></SearchInput>
                                    </SearchCondition>

                                    <AddButtonWrapper>
                                        <AddCusButton className="add-cancel" onClick={() => {this.handleCancel(this.searchEl)}}>取消</AddCusButton>
                                        <AddCusButton className="add-save" onClick={() => {this.handleSave(this.searchNameEl, this.searchMobileEl)}}>确定</AddCusButton>
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
                                                    onClick={() => {this.handleList(this.userlistwrapper, index, item.userId, edit, item.active)}}
                                                >
                                                    
                                                    <MiddleChceckBoxSmall className={edit?"middleChceckBox":" "}>
                                                        <span className={edit && item.active?"iconfont isShow":"iconfont isHide"}>&#xe617;</span>
                                                    </MiddleChceckBoxSmall>
                                                    

                                                    {
                                                        item.src?
                                                        <img src={src} alt="" />
                                                        :<span className="iconfont">&#xe61a;</span>
                                                    }
                                                    
                                                    <CustomerInfo >
                                                        <p>
                                                            <span>{item.name }</span>
                                                            <span>{item.mobilePhone }</span>
                                                        </p>
                                                        <p>
                                                        {item.idcard}
                                                        </p>
                                                    </CustomerInfo>
                                                </MiddleList>
                                            )
                                        })
                                        :""
                                    }

                                    
                                </UserListWapper>

                                <UserOprate 
                                    ref={(useroparateel) => {this.useroparateel = useroparateel}}    
                                >
                                    {/* <EditItem onClick={() => {this.usertransfer()}}>
                                        <span className="iconfont">&#xe60c;</span>
                                        <p>移交</p>
                                    </EditItem> */}
                                    <EditItem onClick={() => {this.userdelete(confirm)}}>
                                        <span className="iconfont">&#xe619;</span>
                                        <p>删除</p>
                                    </EditItem>
                                </UserOprate>
                            </MiddleListWrapper>
                        </UserMiddle>

                        <UserRight>
                            <StatusWrapper 
                                className={add?"isShow":"isHide"}
                                >
                                <AddCusHeadWrapper>
                                    <AddCusHeadText>新建用户</AddCusHeadText>
                                    <AddButtonWrapper>
                                        <AddCusButton className="add-cancel" onClick={() => {this.handleAddCancel()}}>取消</AddCusButton>
                                        <AddCusButton className="add-save" onClick={() => {this.handleAddSave(this.name, this.idCard, this.mobile, userId)}}>保存</AddCusButton>
                                    </AddButtonWrapper>
                                </AddCusHeadWrapper>
                                
                                
                                
                                <AddContent>
                                    <Fragment>
                                        <AddItem>
                                            <AddTitle><span>*</span>用户姓名</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入姓名"
                                                    ref = {(input) => {this.name = input}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>身份证</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入身份证"
                                                    ref = {(input) => {this.idCard = input}}
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>手机号码</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入手机号码"
                                                    ref = {(input) => {this.mobile = input}}
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
                                                onChange={(value) => {this.userkind(value)}}
                                                value={this.state.userType}
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

                                        
                                    </Fragment>
                                </AddContent>
                            </StatusWrapper>
                        
                            <Empty className={add?"ant-empty isHide":"ant-empty isShow"} description={'暂无数据'} />
                        </UserRight>
                    </UserCon>
                </UserWrapper>
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }
    }

    componentDidMount() {
        if(this.state.login) {
            this.resetHeight(this.listWrapper)
            this.getData();
            let el = this.listWrapper;

            // 滚动翻页
            el.addEventListener('scroll', () => {
                if(el.scrollTop + el.clientHeight + 1 > el.scrollHeight) {
                    this.setState({
                        pageNum: this.state.pageNum + 1
                    }, () => {
                        this.getData()
                    })
                }
            })
        }
        
        
    }

    componentDidUpdate() {
        if(this.state.login) {
            this.resetHeight(this.listWrapper)
            
        }
    }

    // getList methods
    getData() {
        if(this.state.load) {
            let params = {
                userName:this.state.userName,
                mobilePhone:this.state.mobilePhone,
                pageNum:this.state.pageNum,
                pageSize:this.state.pageSize
            }
            userList(params).then((res) => {
                let data = res.data;
                data.data.list.map((item, index) => (
                    item.active = false
                ))
                
                if(data.code === 1 && data.msg === 'success') {
                    this.setState({
                        userList:this.state.userList.concat(data.data.list)
                    }, () => {
                        if(data.data.list.length < this.state.pageSize || !data.data.list.length) {
                            this.setState({
                                load:false
                            })
                        }
                    })
                }

            })
            .catch((err) => {
                message.error(err.msg)
            })
        }
        
    }


    // 点击新建用户
    handleAdd() {
        this.setState({
            add:true,
            search:false,
            userId:""
        },() => {
           
        })
    }


    // methods
    
    // 新建用户
    handleAddMustor(addmustorEl, searchEl) {
        addmustorEl.classList.add('add-customer-show')
        searchEl.classList.remove('searchel-show')
    }

    // 重新计算高度
    resetHeight(el) {
        let screen_height = document.body.clientHeight;
        el.style.height = (screen_height - 60) + 'px';
    }

    // 搜索
    handleSearch(searchEl, addmustorEl) {
        searchEl.classList.add('searchel-show')
        addmustorEl.classList.remove('add-customer-show')
    }

    // 取消
    handleCancel(searchEl) {
        searchEl.classList.remove('searchel-show')
    }

    // 确定
    handleSave(searchNameEl, searchMobileEl) {
        this.setState({
            userName:searchNameEl.value,
            mobilePhone:searchMobileEl.value,
            pageNum:1,
            pageSize:10,
            load:true,
            userList:[]
        }, () => {
            this.getData()
        })
        

    }

    // 保存用户
    handleAddSave(nameel, idCardel, mobileel, userId) {
        let params = {}
        if(userId) {
            params = {
                userId:"",
                name:'',
                idcard:'',
                mobilePhone:'',
                userType:'',
                remark:'',
                relationship:''
            }
        }else{
            params = {
                name:'',
                idcard:'',
                mobilePhone:'',
                userType:'',
                remark:'',
                relationship:''
            }
        }

        if(!nameel.input.value) {
            message.error('请填写用户名')
        }else if(!idCardel.input.value || !checkidCard.test(idCardel.input.value)) {
            message.error('请填写正确身份证')
        }else if(!mobileel.input.value || !checkmobile.test(mobileel.input.value)) {
            message.error('请填写正确手机号码')
        }else if(!this.state.userType) {
            message.error('请选择用户类别')
        }else {
            if(userId) {
                params.userId = userId
            }
            params.name = nameel.input.value
            params.idcard = idCardel.input.value
            params.mobilePhone = mobileel.input.value
            params.userType = this.state.userType
            params.remark = ''
            params.relationship = ''
           
            createUser(params)
            .then((res) => {
                let data = res.data;
                if(data.code === 1 && data.msg === 'success') {
                   
                    message.success('新建成功')
                    nameel.input.value = ''
                    idCardel.input.value = ''
                    mobileel.input.value = ''
                    
                    this.setState({
                        userList:[],
                        load:true,
                        pageNum:1,
                        pageSize:10,
                        userType:''
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
    handleAddCancel() {
        this.setState({
            add:false
        })
    }

    // 点击用户列表
    handleList(boxel, index, id, edit, active) {
        let userdata = this.state.userList;
        if(!edit) {
            if(active) {
                return 
            }else{
                for(let i = 0; i < userdata.length; i ++) {
                    userdata[i].active = false
                }
                userdata[index].active = true;
                this.setState({
                    userList:userdata
                })

                this.getUserDetail(id)
                
            }
            
        }else{
            if(active) {
                
            }else{
                this.getUserDetail(id)
            }
            
            userdata[index].active = !userdata[index].active
            this.state.userDelArr.push(id)
            this.setState({
                userList:userdata
            })
            
        }
        
        
    }


    // 获取用户详情的方法
    getUserDetail(id) {
        userDetail({userId:id}).then((res) => {
            let data = res.data;
            
            if(data.code === 1 && data.msg === 'success') {
                this.setState({
                    add:true,
                    userId:id
                }, () => {
                    if(data.data){
                        this.name.input.value = data.data.name
                        this.idCard.input.value = data.data.idcard
                        this.mobile.input.value = data.data.mobilePhone
                        this.userkind(data.data.userType.toString())
                    }
                    
                })

            }
        })
    }

    // 用户类型
    userkind(value) {
        this.setState({
            userType:value
        })
    }


    // 编辑用户
    handleUserDelete(useroparateel, userlistwrapper) {
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
        console.log(this.state.userDelArr)
    }

    // 删除用户
    userdelete(confirm) {
        let data = this.state.userList,
            deleArr = [];
            let that = this;
        data.map((item, index) => (
            item.active?deleArr.push(item.userId):""
        ))
        let params = {
            userId:JSON.stringify(deleArr)
        }
        if(!deleArr.length) {
            return
        }
        confirm({
            title: '确认删除?',
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
                            pageSize:10
                        }, () => {
                            that.getData() 
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

}

export default connect()(User)