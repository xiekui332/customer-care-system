import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal, Radio, Select, message, Button } from 'antd';
import "antd/dist/antd.css";
import { actionCreators } from '../pages/home/store'
import { handleUpload, getsystemData, addCustom, checkidCard, checkmobile, editCustom } from '../api'
import {
    AddWrapper,
    AddCusHeadWrapper,
    AddCusHeadText,
    AddCusButton,
    AddButtonWrapper,
    AddContent,
    AddTitle,
    AddItem,
    AddUl,
    AddLi,
    AddUpload,
    AddUploadWrapper,
    AddFileWrapper,
    AddFile,
    FileName
} from './style'

class AddNewCus extends Component{
    constructor(props) {
        super(props)
        this.state = {
            value:0,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            loading:false,
            attachFile:[],
            systemData:{},
            kindSelected:undefined,
            customerDetail:{}
        }

    }
 
    render() {
        const { 
            isAdd, addClickLi, handlecusCancel, cusEdit
        } = this.props;
        
        const { 
            previewVisible, previewImage, fileList, attachFile, systemData
        } = this.state;
        
        let customerDetail = {};
        let customerId = ''
        let kindSelected = undefined
        if(cusEdit) {
            customerDetail = this.props.customerDetail
            customerId = customerDetail.customerId
            if(!customerDetail.industryClass) {
                kindSelected = undefined
            }else{
                kindSelected = customerDetail.industryClass
            }
            
        }
        
        console.log(customerDetail)

        const RadioGroup = Radio.Group;
        const Option = Select.Option;

        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
        </div>
        );

        return(
            <AddWrapper className={isAdd?"isShow":"isHide"}>
                <AddCusHeadWrapper>
                    <AddCusHeadText>新建客户</AddCusHeadText>
                    <AddButtonWrapper>
                        <AddCusButton className="add-cancel" onClick={() => {
                            handlecusCancel()}}
                        >取消</AddCusButton>
                        <AddCusButton className="add-save" onClick={() => {
                            this.handleSaveData(
                                this.cusNameEl,
                                this.cusIdcardEl,
                                this.cusMobileEl,
                                this.cusAddressEl,
                                this.cusConEl,
                                this.cusCompanyEl,
                                this.state.value,
                                kindSelected,
                                this.cusMoneyEl,
                                fileList,
                                attachFile,
                                customerId
                                )
                        }}>保存</AddCusButton>
                    </AddButtonWrapper>
                </AddCusHeadWrapper>

                <AddContent>
                    <Fragment>
                        <AddItem>
                            <AddTitle><span>*</span>客户姓名</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入姓名"
                                    ref = {(input) => {this.cusNameEl = input}}
                                    value={customerDetail && customerDetail.name?customerDetail.name:""}
                                    onChange={() => {this.setValue(this.cusNameEl, 1)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>身份证号</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入身份证号"
                                    ref = {(input) => {this.cusIdcardEl = input}}
                                    value={customerDetail && customerDetail.idcard?customerDetail.idcard:""}
                                    onChange={() => {this.setValue(this.cusIdcardEl, 2)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>手机号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入手机号码"
                                    ref = {(input) => {this.cusMobileEl = input}}
                                    value={customerDetail && customerDetail.mobilePhone?customerDetail.mobilePhone:""}
                                    onChange={() => {this.setValue(this.cusMobileEl, 3)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>常住地址</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入常住地址"
                                    ref = {(input) => {this.cusAddressEl = input}}
                                    value={customerDetail && customerDetail.address?customerDetail.address:""}
                                    onChange={() => {this.setValue(this.cusAddressEl, 4)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>经营内容</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入经营内容"
                                    ref = {(input) => {this.cusConEl = input}}
                                    value={customerDetail && customerDetail.businessContent?customerDetail.businessContent:""}
                                    onChange={() => {this.setValue(this.cusConEl, 5)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>公司名称</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入公司名称"
                                    ref = {(input) => {this.cusCompanyEl = input}}
                                    value={customerDetail && customerDetail.companyName?customerDetail.companyName:""}
                                    onChange={() => {this.setValue(this.cusCompanyEl, 6)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>是否有经营合伙人</AddTitle>
                            <RadioGroup 
                                    className="radio-group"
                                    onChange={(e) => {this.changeRadio(e)}} 
                                    value={this.state.value}>
                                <Radio value={0}>无</Radio>
                                <Radio value={1}>有</Radio>
                            </RadioGroup>
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>行业名称</AddTitle>
                            <Select
                                showSearch
                                style={{ width: '60%', marginBottom:20 }}
                                placeholder="请选择行业名称"
                                optionFilterProp="children"
                                onChange={(value) => {this.customkind(value)}}
                                value={kindSelected}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    // 要做容错处理
                                    systemData.industryClass && systemData.industryClass.map((item, index) => {
                                        return (
                                            <Option key={item}>{item}</Option>
                                        )
                                        
                                    })
                                }
                                
                            </Select>
                            <AddUl className="add-ul">
                                <AddLi 
                                    onClick={() => {addClickLi(2)}}
                                    >1</AddLi>
                            </AddUl>
                        </AddItem>

                        <AddItem>
                            <AddTitle><span></span>负债情况</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusMoneyEl = input}}
                                    value={customerDetail && customerDetail.liabilities?customerDetail.liabilities:""}
                                    onChange={() => {this.setValue(this.cusMoneyEl, 7)}}
                                />
                                <span className="add-number">万</span>
                            <p></p>
                        </AddItem>
                    </Fragment>

                    <AddUpload>
                        <AddTitle><span></span>图片上传</AddTitle>
                        <AddUploadWrapper>

                        <div className="clearfix">
                            <Upload
                                accept=".jpg, .jpeg, .png"
                                customRequest={(file) => {this.customRequest(file)}}
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={(file) => {this.handlePreview(file)}}
                                onChange={(file, fileList, event) => {this.handleChange(file, fileList, event)}}
                                onRemove={(file) => {this.handleonRemove(file)}}
                                >
                                {fileList.length >= 9 ? null : uploadButton}
                            </Upload>

                            <Modal visible={previewVisible} footer={null} onCancel={(file) => {this.handleCancel(file)}}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        </AddUploadWrapper>
                    </AddUpload>

                    <AddFileWrapper>
                        <AddTitle><span></span>附件上传</AddTitle>
                        {
                            attachFile.map((item, index) => (
                                <AddFile key={item.uid}>
                                    <FileName>{item.name}</FileName>
                                    <span className="iconfont" onClick={() => { this.handleAttachDel(item, attachFile) }}>&#xe619;</span>
                                </AddFile>
                            ))
                            
                        }
                        <AddUploadWrapper>
                            <div className="clearfix clearfix-two">
                                <Upload 
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    customRequest={(file) => { this.attachRequest(file) }}
                                    fileList={attachFile}
                                    
                                >
                                <Button className="uploadButton">
                                    <Icon type="upload" /> 附件上传
                                </Button>
                                </Upload>
                            </div>
                        </AddUploadWrapper>
                    </AddFileWrapper>
                </AddContent>
            </AddWrapper>
            
        )
    }

    componentDidMount() {
        getsystemData().then((res) => {
            let data = res.data;
            if(data.code === 1 && data.msg === 'success') {
                this.setState({
                    systemData:data.data
                }, () => {
                    // console.log(this.state.systemData)
                })
            }
        })

        if(this.props.cusEdit) {
            this.setState({
                value:this.props.customerDetail.isBusinessPartner,
                kindSelected:this.props.customerDetail.industryClass?this.props.customerDetail.industryClass:""
            })
        }
    }


    // 经营合伙人
    changeRadio(e) {
        this.setState({
            value: e.target.value,
        });
    }

    // 行业分类
    customkind(value) {
        this.setState({
            kindSelected:value
        })
    }

    // 新建客户保存
    handleSaveData(cusNameEl, cusIdcardEl, cusMobileEl, cusAddressEl, cusConEl, cusCompanyEl, value, kindSelected, cusMoneyEl, fileList, attachFile, customerId) {
        let params = {}
        let attachs = []
        let arr = fileList.concat(attachFile);
        arr.map((item, index) => {
            return (
                attachs.push(
                    {
                        attachId: item.uid
                    }
                )
            )
            
        })
        // console.log(attachs)
        // test
        // cusNameEl.value = '小菜d'
        // cusIdcardEl.value = 142603199303283737
        // cusMobileEl.value = 18334794858
        // cusAddressEl.value = '象牙公寓'

        if(!cusNameEl.value) {
            message.error('请输入客户姓名')
        }else if(!cusIdcardEl.value || !checkidCard.test(cusIdcardEl.value)) {
            message.error('请输入正确身份证号码')
        }else if(!cusMobileEl.value || !checkmobile.test(cusMobileEl.value)) {
            message.error('请输入正确电话号码')
        }else if(!cusAddressEl.value) {
            message.error('请输入常住地址')
        }
        
        else{

            params.name = cusNameEl.value
            params.idcard = cusIdcardEl.value
            params.mobilePhone = cusMobileEl.value
            params.address = cusAddressEl.value
            params.businessContent = cusConEl.value   // 经营内容
            params.companyName = cusCompanyEl.value   // 公司名称
            params.isBusinessPartner = value          // 是否有经营合伙人（0无 1有）
            params.industryClass = kindSelected       // 所属行业
            params.liabilities = cusMoneyEl.value     // 负债（万元）
            params.attachs = attachs
            
            // console.log(params)
            // return
            if(customerId) {
                params.customerId = customerId
                editCustom(params).then((res) => {
                    let data = res.data;
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('编辑成功')
                        // console.log(data)
                        this.props.handleCusEdit(false)
                        this.props.handleAddStatus(true)
                    }else{
                        message.error(data.msg)
                    }
                })
            }else{
                addCustom(params).then((res) => {
                    let data = res.data;
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('添加成功')
                        // console.log(data)
                        this.props.handleCusEdit(false)
                        this.props.handleAddStatus(true)
                    }else{
                        message.error(data.msg)
                    }
                })
            }
            
        }
    }

    handleCancel = (file) => {
        this.setState({ previewVisible: false })
    };

    // 预览图片
    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = (file, fileList, event ) => {
        
    };

    // onRemove  
    handleonRemove(file) {
        let fileList = this.state.fileList
        fileList.map((item, index) => (
            item === file?fileList.splice(index, 1):''
        ))
        this.setState({
            fileList:fileList
        }, () => {
            
        })
    }


    // 自定义上传
    customRequest(option) {
        const formData = new FormData();
        const fileUrl = '/attach/upload';
        let newFiles = []
        let obj = {}
        formData.append('file',option.file);
        handleUpload(fileUrl, formData).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('上传成功')
                obj.name = data.data.attach.origName
                obj.uid =  data.data.attach.attachId 
                obj.status = 'done'
                obj.url = data.data.attachHost + data.data.attach.attachPath
                newFiles.push(obj)
                let newFile = this.state.fileList
                this.setState({
                    fileList: newFile.concat(newFiles)
                }, () => {
                    console.log(this.state.fileList)
                })
            }else{
                message.success('上传失败')
            }
        })
        .catch((err) => {
            message.error(err.msg)
        })

    }

    // 附件自定义上传 file, fileList
    attachRequest(option) {
        const formData = new FormData();
        const fileUrl = '/attach/upload';
        let newFiles = []
        let obj = {}
        formData.append('file',option.file);
        handleUpload(fileUrl, formData).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('上传成功')
                obj.name = data.data.attach.origName
                obj.uid =  data.data.attach.attachId 
                obj.status = 'done'
                obj.url = data.data.attachHost + data.data.attach.attachPath
                newFiles.push(obj)
                let newFile = this.state.attachFile
                this.setState({
                    attachFile: newFile.concat(newFiles)
                }, () => {
                    // console.log(this.state.attachFile)
                })
            }else{
                message.success('上传失败')
            }
        })
        .catch((err) => {
            message.error(err.msg)
        })
    }


    // 附件上传删除
    handleAttachDel(file, attachFile) {
        attachFile.map((item, index) => (
            item === file?attachFile.splice(index, 1):''
        ))

        this.setState({
            attachFile:attachFile
        })
    }


    // 编辑赋值
    setValue(el, type) {
        let customerDetail = this.props.customerDetail
        if(type === 1) {
            customerDetail.name = el.value
        }else if(type === 2) {
            customerDetail.idcard = el.value
        }else if(type === 3) {
             customerDetail.mobilePhone = el.value
        }else if(type === 4) {
            customerDetail.address = el.value
        }else if(type === 5) {
           customerDetail.businessContent = el.value
        }else if(type === 6) {
            customerDetail.companyName = el.value
        }else if(type === 7) {
            customerDetail.liabilities = el.value
        }

        this.setState({
            customerDetail: customerDetail
        })
    }



    
}

const mapDispatch = (dispatch) => ({


    // 选择li
    addClickLi(kind) {
        let el = document.getElementsByClassName('add-ul')[0]
            el.classList.remove('add-ul-show')
    },

    // 取消
    handlecusCancel() {
        
        let params = {
            isAdd:false
        }
        let action_two = actionCreators.changeCusEdit(false)
        dispatch(action_two)
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
    },


    // 编辑客户
    handleCusEdit(bool) {
        let action = actionCreators.changeCusEdit(bool)
        dispatch(action)
    },

    //  保存
    handleAddStatus(bool) {
        let action = actionCreators.changeAddStatus(bool)
        dispatch(action)
    }
    
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    customerDetail:state.getIn(['left', 'customerDetail']).toJS(),
    cusEdit:state.getIn(['left', 'cusEdit'])
})

export default connect(mapState, mapDispatch)(AddNewCus)
