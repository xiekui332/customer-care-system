import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from '../home/common/LeftWrapper'
import { sessionGetItem, checkmobile, checkidCard, createUser, userList } from '../../api'
import { Tooltip, Input, Select, message, Empty } from 'antd';

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
    MiddleChceckBox,
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
    StatusWrapper
    
} from './style'

class User extends PureComponent {
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
            edit:false
        }

        this.resetHeight = this.resetHeight.bind(this)
        this.getData = this.getData.bind(this)
    }

    render () {
        const { login, userList, add, search, edit } = this.state;
        const Option = Select.Option;
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
                                    <Tooltip title="新建用户" onClick={() => {this.handleAddMustor(this.addmustorEl)}}>
                                        <span className="iconfont">&#xe64c;</span>
                                    </Tooltip>
                                    <Tooltip title="搜索" onClick={() => {this.handleSearch(this.search)}}>
                                        <span className="iconfont">&#xe7c0;</span>
                                    </Tooltip>
                                    <Tooltip title="编辑" onClick={() => {}}>
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
                                    onClick={() => {}}>
                                    新建用户
                                </AddCustomerWrapper>

                                <SearchWrapper 
                                    ref={(search) => {this.search = search}}
                                >
                                    <SearchCondition>
                                        <span>用户名</span>
                                        <SearchInput placeholder="请输入用户名"></SearchInput>
                                    </SearchCondition>
                                    <SearchCondition>
                                        <span>手机号</span>
                                        <SearchInput placeholder="请输入手机号"></SearchInput>
                                    </SearchCondition>

                                    <AddButtonWrapper>
                                        <AddCusButton className="add-cancel">取消</AddCusButton>
                                        <AddCusButton className="add-save">保存</AddCusButton>
                                    </AddButtonWrapper>
                                </SearchWrapper> 

                                {
                                    userList.length > 0?
                                    userList.map((item, index) => {
                                        return (
                                            <MiddleList key={item.userId}>
                                                <MiddleChceckBox>
                                                    <span className="iconfont">&#xe617;</span>
                                                </MiddleChceckBox>
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
                                
                            </MiddleListWrapper>
                        </UserMiddle>

                        <UserRight>
                            <StatusWrapper className={add?"isShow":"isHide"}>
                                <AddCusHeadWrapper>
                                    <AddCusHeadText onClick={() => {this.handleAdd()}}>新建用户</AddCusHeadText>
                                    <AddButtonWrapper>
                                        <AddCusButton className="add-cancel">取消</AddCusButton>
                                        <AddCusButton className="add-save" onClick={() => {this.handleAddSave(this.name, this.idCard, this.mobile)}}>保存</AddCusButton>
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
                                                    value=''
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>身份证</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入身份证"
                                                    ref = {(input) => {this.idCard = input}}
                                                    value=''
                                                />
                                            <p></p>
                                        </AddItem>

                                        <AddItem>
                                            <AddTitle><span>*</span>手机号码</AddTitle>
                                                <Input 
                                                    className="add-input"
                                                    placeholder="请输入手机号码"
                                                    ref = {(input) => {this.mobile = input}}
                                                    value=''
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
                        
                            <Empty className="ant-empty" description={'暂无数据'} />
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
            let userInfo = this.state.userInfo;
            let params = {
                userName:userInfo.userName,
                mobilePhone:userInfo.mobilePhone,
                pageNum:this.state.pageNum,
                pageSize:this.state.pageSize
            }
            userList(params).then((res) => {
                let data = res.data;
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
            edit:false
        })
    }


    // methods
    
    // 新建用户
    handleAddMustor(addmustorEl) {
        addmustorEl.classList.add('add-customer-show')
    }

    // 重新计算高度
    resetHeight(el) {
        let screen_height = document.body.clientHeight;
        el.style.height = (screen_height - 60) + 'px';
    }

    // 搜索
    handleSearch(searchel) {
        searchel.classList.add('searchel-show')
    }

    // 保存用户
    handleAddSave(nameel, idCardel, mobileel) {
        let params = {
            name:'',
            idcard:'',
            mobilePhone:'',
            userType:'',
            remark:'',
            relationship:''
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
            params.name = nameel.input.value
            params.idcard = idCardel.input.value
            params.mobilePhone = mobileel.input.value
            params.userType = this.state.userType
            params.remark = ''
            params.relationship = ''
           
            createUser(params)
            .then((res) => {
                let data = res.data;
                console.log(data)
                if(data.code === 1 && data.msg === 'success') {
                    
                }else {
                    message.error(data.msg)
                }
            })
            .catch((err) => {
                message.error(err.msg)
            })
        }
    }

    // 用户类型
    userkind(value) {
        this.setState({
            userType:value
        })
    }
}

export default connect()(User)