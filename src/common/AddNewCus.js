import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal, Radio, Select, message, Button, Input } from 'antd';
import "antd/dist/antd.css";
import { actionCreators } from '../pages/home/store'
import { handleUpload, getsystemData, addCustom, checkidCard, checkmobile, editCustom, changeattachDel } from '../api'
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
            attachFile:[],
            savefileList:[],
            saveattachFile:[],
            loading:false,
            systemData:{},
            kindSelected:undefined,
            customerDetail:{},
            noupdate1:false,
            noupdate2:false,
            isdemand:undefined,
            iskindtype:undefined,
            isbeizhu:'',
            isy:false,
            isloading:false
        }
        this.clearData = this.clearData.bind(this)
        this.getBase64 = this.getBase64.bind(this)
    }
 
    render() {
        const { 
            isAdd, addClickLi, cusEdit, homeList
        } = this.props;
        
        const { 
            previewVisible, previewImage, 
            // fileList, 
            // attachFile, 
            systemData,
            
            
        } = this.state;
        
        let customerDetail = {};
        customerDetail = this.props.customerDetail
        let customerId = ''
        let isbeizhu = this.state.isbeizhu
        let chvalue = this.state.value
        let kindSelected = this.state.kindSelected
        let isdemand = this.state.isdemand
        let iskindtype = this.state.iskindtype
        
        const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/
        let fileList = this.state.fileList
        let attachFile = this.state.attachFile
        let changefileList = []
        let changeattachFile = []
        let changeNewattachFile = []
        if(isAdd && !cusEdit) {
            fileList = []
            attachFile = []
        }

        // 从展示页点击编辑进来
        if(cusEdit) {
            
            customerId = customerDetail.customerId
            isbeizhu = customerDetail.relatRemark
            chvalue = customerDetail.isBusinessPartner
            
            // 行业名称
            if(customerDetail.industryClass) {
                kindSelected = customerDetail.industryClass
            }else{
                kindSelected = undefined
            }
            // 有无融资需求
            // console.log(customerDetail.financialDemand)
            if(customerDetail.financialDemand == undefined) {
                isdemand = undefined
            }else if(customerDetail.financialDemand.toString() == '1') {
                isdemand = '1'
            }else if(customerDetail.financialDemand.toString() == '0') {
                isdemand = '0'
            }


            // 发生业务种类
            
            if(customerDetail.existingBusinessType) {
                iskindtype = customerDetail.existingBusinessType
            }else{
                iskindtype = undefined
            }

            fileList = []
            attachFile = []
            
            if(customerDetail.attachs.length) {
                for(let i = 0; i < customerDetail.attachs.length; i ++) {
                    let obj = {}
                    obj.origName = customerDetail.attachs[i].origName
                    obj.attachPath =customerDetail.attachs[i].attachPath
                    obj.attachId = customerDetail.attachs[i].attachId
                    obj.uid = customerDetail.attachs[i].attachId
                    obj.name = customerDetail.attachs[i].origName
                    obj.status = 'done'
                    obj.attachSuffix = customerDetail.attachs[i].attachSuffix
                    obj.url = customerDetail.attachHost + customerDetail.attachs[i].attachPath
                    changeNewattachFile.push(obj)

                }

                for(let i = 0; i < changeNewattachFile.length; i ++) {
                    if(PICTURE_EXPRESSION.test(changeNewattachFile[i].attachSuffix)) {
                        changefileList.push(changeNewattachFile[i])
                    }else{
                        changeattachFile.push(changeNewattachFile[i])
                    }
                }
                
                if(this.state.noupdate1) {
                    fileList = this.state.fileList
                }else{
                    fileList = changefileList.concat(this.state.fileList)
                    // fileList = changefileList
                }

                if(this.state.noupdate2) {
                    attachFile = this.state.attachFile
                }else{
                    attachFile = changeattachFile.concat(this.state.attachFile)
                }
                
                

            }else{
                fileList = this.state.fileList
                attachFile = this.state.attachFile
            }

            
            
        }else{
            
            // kindSelected = this.state.kindSelected
            fileList = this.state.fileList
            attachFile = this.state.attachFile
        }
        
        // console.log(fileList)
        // console.log(attachFile)
        // console.log(kindSelected)
        // console.log(isdemand)
        // console.log(iskindtype)

        const RadioGroup = Radio.Group;
        const Option = Select.Option;
        const { TextArea } = Input;

        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
        </div>
        );

        return(
            <AddWrapper className={isAdd || cusEdit?"isShow overflow":"isHide overflow"}>
                <AddCusHeadWrapper>
                    <AddCusHeadText>新建客户</AddCusHeadText>
                    <AddButtonWrapper>
                        <AddCusButton className="add-cancel" onClick={() => {
                            this.handlecusCancel(homeList)}}
                        >取消</AddCusButton>
                        <AddCusButton className="add-save" onClick={() => {
                            this.handleSaveData(
                                this.cusNameEl,
                                this.cusIdcardEl,
                                this.cusMobileEl,
                                this.cusAddressEl,
                                this.cusConEl,
                                this.cusCompanyEl,
                                chvalue,
                                kindSelected,
                                this.cusMoneyEl,
                                fileList,
                                attachFile,
                                customerId,
                                // 新增
                                this.cusadddizhiEl,
                                this.cusaddryEl,
                                this.cusaddmjEl,
                                this.cusaddyyEl,
                                this.cusaddzcEl,
                                this.cusaddxyEl,
                                isdemand,
                                this.cusaddxqEl,
                                iskindtype,
                                this.cusaddywEl,
                                this.cusaddxmEl,
                                this.cusaddsfzEl,
                                this.cusaddgxEl,
                                this.cusaddlxEl,
                                this.cusaddbzEl
                                )
                        }}>保存</AddCusButton>
                    </AddButtonWrapper>
                </AddCusHeadWrapper>

                <AddContent>
                    <Fragment>
                        <AddItem className='clear-fix'>
                            <AddTitle><span>*</span>客户姓名</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusNameEl = input}}
                                    value={customerDetail && customerDetail.name?customerDetail.name:""}
                                    onChange={() => {this.setValue(this.cusNameEl, 1)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem className='clear-fix'>
                            <AddTitle><span>*</span>身份证号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusIdcardEl = input}}
                                    value={customerDetail && customerDetail.idcard?customerDetail.idcard:""}
                                    onChange={() => {this.setValue(this.cusIdcardEl, 2)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem className='clear-fix'>
                            <AddTitle><span>*</span>手机号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusMobileEl = input}}
                                    value={customerDetail && customerDetail.mobilePhone?customerDetail.mobilePhone:""}
                                    onChange={() => {this.setValue(this.cusMobileEl, 3)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem className='clear-fix'>
                            <AddTitle><span>*</span>常住地址</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusAddressEl = input}}
                                    value={customerDetail && customerDetail.address?customerDetail.address:""}
                                    onChange={() => {this.setValue(this.cusAddressEl, 4)}}
                                />
                            <p></p>
                        </AddItem>

                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>行业分类</AddTitle>
                            
                            <Select
                                showSearch
                                style={{ width: '60%', marginBottom:20 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={(value) => {this.customkind(value, customerDetail)}}
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
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>公司(店铺)名称</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusCompanyEl = input}}
                                    value={customerDetail && customerDetail.companyName?customerDetail.companyName:""}
                                    onChange={() => {this.setValue(this.cusCompanyEl, 6)}}
                                />
                            <p></p>
                        </AddItem>

                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>经营内容</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusConEl = input}}
                                    value={customerDetail && customerDetail.businessContent?customerDetail.businessContent:""}
                                    onChange={() => {this.setValue(this.cusConEl, 5)}}
                                />
                            <p></p>
                        </AddItem>

                        {/* 新增字段 */}
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>经营地址</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusadddizhiEl = input}}
                                    value={customerDetail && customerDetail.businessAddress?customerDetail.businessAddress:""}
                                    onChange={() => {this.setValue(this.cusadddizhiEl, 8)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>工作人员数量</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusaddryEl = input}}
                                    value={customerDetail && customerDetail.staffNum?customerDetail.staffNum:""}
                                    onChange={() => {this.setValue(this.cusaddryEl, 9)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>生产经营面积</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusaddmjEl = input}}
                                    value={customerDetail && customerDetail.businessArea?customerDetail.businessArea:""}
                                    onChange={() => {this.setValue(this.cusaddmjEl, 10)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>年营业额(近三年平均)</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusaddyyEl = input}}
                                    value={customerDetail && customerDetail.yearlyTurnover?customerDetail.yearlyTurnover:""}
                                    onChange={() => {this.setValue(this.cusaddyyEl, 11)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>资产情况(万元)</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusaddzcEl = input}}
                                    value={customerDetail && customerDetail.property?customerDetail.property:""}
                                    onChange={() => {this.setValue(this.cusaddzcEl, 12)}}
                                />
                            <p></p>
                        </AddItem>
                        

                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>负债情况(万元)</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusMoneyEl = input}}
                                    value={customerDetail && customerDetail.liabilities?customerDetail.liabilities:""}
                                    onChange={() => {this.setValue(this.cusMoneyEl, 7)}}
                                />
                                {/* <span className="add-number">万</span> */}
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>信用情况(人品、口碑)</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    ref = {(input) => {this.cusaddxyEl = input}}
                                    value={customerDetail && customerDetail.creditInfo?customerDetail.creditInfo:""}
                                    onChange={() => {this.setValue(this.cusaddxyEl, 13)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>有无融资需求</AddTitle>
                            
                            <Select
                                style={{ width: '60%', marginBottom:20 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={(value) => {this.customrz(value, customerDetail)}}
                                value={isdemand}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key={'1'}>有</Option>
                                <Option key={'0'}>无</Option>
                                
                            </Select>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>需求金额(万元)</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusaddxqEl = input}}
                                    value={customerDetail && customerDetail.demandAmount?customerDetail.demandAmount:""}
                                    onChange={() => {this.setValue(this.cusaddxqEl, 14)}}
                                />
                            <p></p>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>已与我行发生业务种类</AddTitle>
                            
                            <Select
                                style={{ width: '60%', marginBottom:20 }}
                                placeholder="请选择"
                                optionFilterProp="children"
                                onChange={(value) => {this.customkindtype(value, customerDetail)}}
                                value={iskindtype}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    // 要做容错处理
                                    systemData.existingBusinessType && systemData.existingBusinessType.map((item, index) => {
                                        return (
                                            <Option key={item}>{item}</Option>
                                        )
                                        
                                    })
                                }
                                
                            </Select>
                        </AddItem>
                        
                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>已发生业务金额</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入"
                                    type='number'
                                    ref = {(input) => {this.cusaddywEl = input}}
                                    value={customerDetail && customerDetail.existingBusinessAmount?customerDetail.existingBusinessAmount:""}
                                    onChange={() => {this.setValue(this.cusaddywEl, 15)}}
                                />
                            <p></p>
                        </AddItem>

                        <AddItem className='clear-fix'>
                            <AddTitle><span></span>是否有经营合伙人</AddTitle>
                            <RadioGroup 
                                    className="radio-group"
                                    onChange={(e) => {this.changeRadio(e, customerDetail, cusEdit)}} 
                                    value={chvalue}>
                                <Radio value={1}>有</Radio>
                                <Radio value={0}>无</Radio>
                            </RadioGroup>
                            <p></p>
                        </AddItem>

                        {/* 调整 */}
                        {
                            
                            <div className={chvalue == 1?'isShow':'isHide'}>
                                <AddItem className='clear-fix clear-fix-new'>
                                    <AddTitle className="addnew-title"><span></span>关联人相关信息</AddTitle>
                                    
                                    <p></p>
                                </AddItem>
                                
                                <AddItem className='clear-fix'>
                                    <AddTitle><span></span>关联人姓名</AddTitle>
                                        <input
                                            className="add-input"
                                            placeholder="请输入"
                                            ref = {(input) => {this.cusaddxmEl = input}}
                                            value={customerDetail && customerDetail.relatName?customerDetail.relatName:""}
                                            onChange={() => {this.setValue(this.cusaddxmEl, 16)}}
                                        />
                                    <p></p>
                                </AddItem>
                                
                                <AddItem className='clear-fix'>
                                    <AddTitle><span></span>关联人身份证号码</AddTitle>
                                        <input
                                            className="add-input"
                                            placeholder="请输入"
                                            ref = {(input) => {this.cusaddsfzEl = input}}
                                            value={customerDetail && customerDetail.relatIdcard?customerDetail.relatIdcard:""}
                                            onChange={() => {this.setValue(this.cusaddsfzEl, 17)}}
                                        />
                                    <p></p>
                                </AddItem>
                                
                                <AddItem className='clear-fix'>
                                    <AddTitle><span></span>关联人关系</AddTitle>
                                        <input
                                            className="add-input"
                                            placeholder="请输入"
                                            ref = {(input) => {this.cusaddgxEl = input}}
                                            value={customerDetail && customerDetail.relatRelationship?customerDetail.relatRelationship:""}
                                            onChange={() => {this.setValue(this.cusaddgxEl, 18)}}
                                        />
                                    <p></p>
                                </AddItem>
                                
                                <AddItem className='clear-fix'>
                                    <AddTitle><span></span>关联人联系电话</AddTitle>
                                        <input
                                            className="add-input"
                                            placeholder="请输入"
                                            ref = {(input) => {this.cusaddlxEl = input}}
                                            value={customerDetail && customerDetail.relatPhone?customerDetail.relatPhone:""}
                                            onChange={() => {this.setValue(this.cusaddlxEl, 19)}}
                                        />
                                    <p></p>
                                </AddItem>
                                
                                <AddItem className='clear-fix'>
                                    <AddTitle><span></span>关联人备注</AddTitle>
                                    <TextArea rows={4} value={isbeizhu} className="msg-textarea"
                                                    ref={(input) => {this.cusaddbzEl = input}}
                                                    onChange={() => {this.setValue(this.cusaddbzEl, 20, cusEdit)}}
                                                />
                                    <p></p>
                                </AddItem>
                            </div>
                        }
                        
                        {/* 新增字段 */}


                        <AddUpload>
                        <AddTitle><span></span>图片上传</AddTitle>
                        <AddUploadWrapper>
                        
                        <div className="clearfix">
                            <Upload
                                accept=".jpg, .jpeg, .png"
                                customRequest={(file) => {this.customRequest(file)}}
                                listType="picture-card"
                                fileList={fileList}
                                multiple={true}
                                onPreview={(file) => {this.handlePreview(file)}}
                                onChange={(file, fileList, event) => {this.handleChange(file, fileList, event)}}
                                onRemove={(file) => {this.handleonRemove(file, customerDetail, fileList, 1 )}}
                                beforeUpload={(file, fileList) => {this.beforeUpload(file, fileList)}}
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
                                    <span className="iconfont" onClick={() => { this.handleonRemove(item, customerDetail,attachFile, 2 ) }}>&#xe619;</span>
                                </AddFile>
                            ))
                            
                        }
                        <AddUploadWrapper>
                            {/* <form encType="multipart/form-data"> */}
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
                            {/* </form> */}
                        </AddUploadWrapper>
                    </AddFileWrapper>
                



                    </Fragment>

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
                // value:this.props.customerDetail.isBusinessPartner,
                kindSelected:this.props.customerDetail.industryClass?this.props.customerDetail.industryClass:""
            }, () => {
                // console.log(this.state.value)
            })
        }

        if(this.props.customerDetail) {
            let type = ''
            if(!this.props.customerDetail.industryClass) {
                type = undefined
            }else{
                type = this.props.customerDetail.industryClass
            }
            this.setState({
                kindSelected:type
            })
        }
        
    }

    beforeUpload(file, fileList) {
        // file.status = 'uploading'
        // console.log(file)
        // console.log(fileList)
    }


    // 经营合伙人
    changeRadio(e, customerDetail, cusEdit) {
        
        
        // console.log(e.target.value)
        if(cusEdit) {
            customerDetail.isBusinessPartner = e.target.value
            this.props.disCusDetail(customerDetail)
        }else{
            this.setState({
                value:e.target.value
            })
        }
        
    }

    // 行业分类
    customkind(value, customerDetail) {
        if(this.props.cusEdit) {
            customerDetail.industryClass = value
            this.props.disCusDetail(customerDetail)
        }else{
            this.setState({
                kindSelected:value
            })
        }
        
    }

    // 新建客户保存
    handleSaveData(
            cusNameEl, cusIdcardEl, cusMobileEl, cusAddressEl, cusConEl, cusCompanyEl, value, kindSelected, cusMoneyEl, fileList, attachFile, 
            customerId,  
            cusadddizhiEl,
            cusaddryEl,
            cusaddmjEl,
            cusaddyyEl,
            cusaddzcEl,
            cusaddxyEl,
            isdemand,
            cusaddxqEl,
            iskindtype,
            cusaddywEl,
            cusaddxmEl,
            cusaddsfzEl,
            cusaddgxEl,
            cusaddlxEl,
            cusaddbzEl
        ) {
        
        let params = {

        }

        // test
        // cusNameEl.value = 'aa'
        // cusIdcardEl.value = '142603199303283734'
        // cusMobileEl.value = '18334794859'
        // cusAddressEl.value = 'bb'
        // cusaddbzEl.textAreaRef.value = 'cc'

        params.attachs = [{}]
        let arr = fileList.concat(attachFile);
        let val = ''
        for(let i = 0; i < arr.length; i ++) {
            
            val = arr[i].uid
            
            // so longer
            params['attachs[' + i + '].attachId'] = val
            
        }
        
        
        
        

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
            // 新增
            params.businessAddress = cusadddizhiEl.value
            params.businessArea = cusaddmjEl.value
            params.staffNum = cusaddryEl.value
            params.yearlyTurnover = cusaddyyEl.value
            params.property = cusaddzcEl.value
            params.creditInfo = cusaddxyEl.value
            params.financialDemand = isdemand
            params.demandAmount = cusaddxqEl.value
            params.existingBusinessType = iskindtype
            params.existingBusinessAmount = cusaddywEl.value
            params.relatName = cusaddxmEl.value
            params.relatIdcard = cusaddsfzEl.value
            params.relatRelationship = cusaddgxEl.value
            params.relatPhone = cusaddlxEl.value
            params.relatRemark = cusaddbzEl.textAreaRef.value
            
            // console.log(value)
            if(value == 0) {
                params.relatName = ''
                params.relatIdcard = ''
                params.relatRelationship = ''
                params.relatPhone = ''
                params.relatRemark = ''
            }else{
                if(cusaddsfzEl.value) {
                    if(!checkidCard.test(cusaddsfzEl.value)) {
                        message.error('请输入关联人正确身份证号码')
                        return
                    }
                    
                }else if(cusaddlxEl.value) {
                    if(!checkmobile.test(cusaddlxEl.value)) {
                        message.error('请输入关联人正确电话号码')
                        return
                    }
                    
                }
            }
            // console.log(cusaddbzEl)
            // return
            if(customerId) {
                params.customerId = customerId
                editCustom(params).then((res) => {
                    let data = res.data;
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('编辑成功')
                        
                        console.log(this.props.customerDetail)
                        // this.props.handleCusEdit(false)
                        // this.props.handleAddStatus(true)
                    }else{
                        message.error(data.msg)
                    }
                })
            }else{
                // console.log(params)
                addCustom(params).then((res) => {
                    let data = res.data;
                    if(data.code === 1 && data.msg === 'success') {
                        message.success('添加成功')
                        let obj = {}
                        this.props.disCusDetail(obj)
                        this.setState({
                            kindSelected:undefined,
                            isdemand:undefined,
                            iskindtype:undefined,
                            isbeizhu:'',
                            fileList:[],
                            attachFile:[]
                        })
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

    // 点击取消
    handlecusCancel(homeList) {
        // 清空
        this.clearData()
        this.props.dishandlecusCancel(homeList)
    }

    // 清空方法
    clearData() {
        // debugger
        let customerDetail = this.props.customerDetail
        customerDetail.name = ''
        customerDetail.idcard = ''
        customerDetail.mobilePhone = ''
        customerDetail.address = ''
        customerDetail.businessContent = ''
        customerDetail.companyName = ''
        customerDetail.liabilities = ''
        customerDetail.businessAddress = ''
        customerDetail.staffNum = ''
        customerDetail.businessArea = ''
        customerDetail.yearlyTurnover = ''
        customerDetail.property = ''
        customerDetail.creditInfo = ''
        customerDetail.demandAmount = ''
        customerDetail.existingBusinessAmount = ''
        customerDetail.relatName = ''
        customerDetail.relatIdcard = ''
        customerDetail.relatRelationship = ''
        customerDetail.relatPhone = ''
        customerDetail.attachs = []
        this.setState({
            isbeizhu:'',
            customerDetail:customerDetail,
            kindSelected:undefined,
            isdemand:undefined,
            iskindtype:undefined,
            fileList: [],
            attachFile:[]
        })
    }

    handleCancel = (file) => {
        this.setState({ previewVisible: false })
    };
    

    // 预览图片
    handlePreview = file => {
        // if (!file.url && !file.preview) {
        //     file.preview = await this.getBase64(file.originFileObj);
        // }

        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });

        
    };
    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
      

    handleChange = (file, fileList, event ) => {
        
    };

    // onRemove  
    handleonRemove(file, customerDetail, fileList, type) {
        
        let params = {
            attachId:file.uid
        }

        if(customerDetail && customerDetail.attachs) {
            for(let i = 0; i < customerDetail.attachs.length;i ++){
                if(customerDetail.attachs[i].attachId === file.attachId) {
                    customerDetail.attachs.splice(i, 1)
                    this.props.disCusDetail(customerDetail)
                }
            }
            // console.log(customerDetail)

        }
        if(customerDetail && customerDetail.customerId) {
           
            fileList.map((item, index) => (
                item === file?fileList.splice(index, 1):''
            ))
            
            if(type === 1){
                this.setState({
                    fileList:fileList,
                    noupdate1:true
                }, () => {
                   
                })
            }else if(type === 2) {
                this.setState({
                    attachFile:fileList,
                    noupdate2:true
                }, () => {
                   
                })
            }
        }
       
        if(!customerDetail || !customerDetail.customerId) {
            fileList.map((item, index) => (
                item === file?fileList.splice(index, 1):''
            ))
            if(type === 1){
                this.setState({
                    fileList:fileList
                }, () => {
                   
                })
            }else if(type === 2) {
                this.setState({
                    attachFile:fileList
                }, () => {
                    
                })
            }
            
        }
        
        
        
        
        changeattachDel(params).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.success('删除成功')
                
                this.props.disCusDetail(customerDetail)
                
            }else {
                message.error(data.msg)
            }
        })
        
    }


    


    // 自定义上传
    customRequest(option) {
        // if(!this.state.isy) {
        //     return
        // }
        message.loading('上传中...', 0)

        
        
        const formData = new FormData();
        const fileUrl = '/attach/upload';
        let newFiles = []
        let obj = {}
        formData.append('file',option.file);
        
        handleUpload(fileUrl, formData).then((res) => {
            
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.destroy();
                message.success('上传成功')
                let newFile = this.state.fileList
                obj.origName = data.data.list[0].origName
                obj.attachPath = data.data.list[0].attachPath
                obj.attachId = data.data.list[0].attachId
                obj.uid = data.data.list[0].attachId
                obj.name = data.data.list[0].origName
                obj.status = 'done'
                obj.url = data.data.attachHost + data.data.list[0].attachPath
                newFiles.push(obj)

                this.setState({
                    fileList: newFile.concat(newFiles)
                })
                
            }else{
                message.destroy();
                message.success('上传失败')
            }
        })
        .catch((err) => {
            message.destroy();
            // message.error('网络故障')
        })

    }

    // 附件自定义上传 file, fileList
    attachRequest(option) {
        message.loading('上传中...', 0)
        const formData = new FormData();
        const fileUrl = '/attach/upload';
        let newFiles = []
        let obj = {}
        formData.append('file',option.file);
        handleUpload(fileUrl, formData).then((res) => {
            let data = res.data
            if(data.code === 1 && data.msg === 'success') {
                message.destroy();
                message.success('上传成功')
                let newFile = this.state.attachFile
                obj.origName = data.data.list[0].origName
                obj.attachPath = data.data.list[0].attachPath
                obj.attachId = data.data.list[0].attachId
                obj.uid = data.data.list[0].attachId
                obj.name = data.data.list[0].origName
                obj.status = 'done'
                obj.url = data.data.attachHost + data.data.list[0].attachPath
                newFiles.push(obj)
                this.setState({
                    attachFile: newFile.concat(newFiles)
                }, () => {
                    // console.log(this.state.attachFile)
                })
            }else{
                message.destroy();
                message.success('上传失败')
            }
        })
        .catch((err) => {
            message.destroy();
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
    setValue(el, type, cusEdit) {
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
        }else if(type === 8) {
            customerDetail.businessAddress = el.value
        }else if(type === 9) {
            customerDetail.staffNum = el.value
        }else if(type === 10) {
            customerDetail.businessArea = el.value
        }else if(type === 11) {
            customerDetail.yearlyTurnover = el.value
        }else if(type === 12) {
            customerDetail.property = el.value
        }else if(type === 13) {
            customerDetail.creditInfo = el.value
        }else if(type === 14) {
            customerDetail.demandAmount = el.value
        }else if(type === 15) {
            customerDetail.existingBusinessAmount = el.value
        }else if(type === 16) {
            customerDetail.relatName = el.value
        }else if(type === 17) {
            customerDetail.relatIdcard = el.value
        }else if(type === 18) {
            customerDetail.relatRelationship = el.value
        }else if(type === 19) {
            customerDetail.relatPhone = el.value
        }else if(type === 20) {
            if(cusEdit) {
                customerDetail.relatRemark = el.textAreaRef.value
            }else{
                this.setState({
                    isbeizhu:el.textAreaRef.value
                })
            }
            
        }

        this.setState({
            customerDetail: customerDetail
        }, () => {
            // console.log(this.state.customerDetail)
        })
    }

    // 选择融资需求
    customrz(value, customerDetail) {
        if(this.props.cusEdit) {
            customerDetail.financialDemand = value
            this.props.disCusDetail(customerDetail)
        }else{
            this.setState({
                isdemand:value
            })
        }
        
    }

    // 发生业务种类
    customkindtype(value, customerDetail) {
        if(this.props.cusEdit) {
            customerDetail.existingBusinessType = value
            this.props.disCusDetail(customerDetail)
        }else{
            this.setState({
                iskindtype:value
            })
        }
        
    }

    
}

const mapDispatch = (dispatch) => ({


    // 选择li
    addClickLi(kind) {
        let el = document.getElementsByClassName('add-ul')[0]
            el.classList.remove('add-ul-show')
    },

    // 取消
    dishandlecusCancel(homeList) {
        let list = homeList.toJS()
        for(let i = 0; i < list.length; i ++ ) {
            list[i].active = false
        }
        
        let params = {
            isAdd:false
        }
        let action_two = actionCreators.changeCusEdit(false)
        dispatch(action_two)
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
        let action_th = actionCreators.getMiddleList(list)
        dispatch(action_th)
        
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
    },

    // 派发客户详情action
    disCusDetail(data) {
        // debugger
        let action = actionCreators.changeCusDetail(data)
        dispatch(action)
    },
    
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    customerDetail:state.getIn(['left', 'customerDetail']).toJS(),
    cusEdit:state.getIn(['left', 'cusEdit']),
    homeList:state.getIn(['left', 'homeList'])
})

export default connect(mapState, mapDispatch)(AddNewCus)
