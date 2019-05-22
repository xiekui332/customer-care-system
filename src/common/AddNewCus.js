import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal, Radio  } from 'antd';
import "antd/dist/antd.css";
import { actionCreators } from '../pages/home/store'
import {
    AddWrapper,
    AddCusHeadWrapper,
    AddCusHeadText,
    AddCusButton,
    AddButtonWrapper,
    AddContent,
    AddTitle,
    AddItem,
    SelectBox,
    AddUl,
    AddLi,
    AddUpload,
    AddUploadWrapper,
    AddFileWrapper,
    AddFile,
    FileName
} from './style'

class AddNewCus extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            value:1
        }

    }

    render() {
        const { isAdd, inputBlur, addSelectDown, addClickLi, 
                previewVisible, previewImage, fileList,
                handlecusCancel
        } = this.props;
        const RadioGroup = Radio.Group;

        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

        return(
            <AddWrapper className={isAdd?"isShow":"isHide"}>
                <AddCusHeadWrapper>
                    <AddCusHeadText>新建客户</AddCusHeadText>
                    <AddButtonWrapper>
                        <AddCusButton className="add-cancel" onClick={() => {
                            handlecusCancel(this.cusNameEl, this.cusIdcardEl, this.cusMobileEl, this.cusAddressEl, this.cusConEl, this.cusKindEl, this.cusMoneyEl)}}
                        >取消</AddCusButton>
                        <AddCusButton className="add-save" onClick={() => {

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
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>身份证号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入身份证号码"
                                    ref = {(input) => {this.cusIdcardEl = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>手机号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入手机号码"
                                    ref = {(input) => {this.cusMobileEl = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>常住地址</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入常住地址"
                                    ref = {(input) => {this.cusAddressEl = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>经营内容</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入经营内容"
                                    ref = {(input) => {this.cusConEl = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>是否有经营合伙人</AddTitle>
                            <RadioGroup onChange={(e) => {this.changeRadio(e)}} value={this.state.value}>
                                <Radio value={0}>无</Radio>
                                <Radio value={1}>有</Radio>
                            </RadioGroup>
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>行业名称</AddTitle>
                            <SelectBox onClick={addSelectDown}>
                                <input
                                    className="add-input"
                                    placeholder="请输入行业名称"
                                    ref = {(input) => {this.cusKindEl = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                    disabled="disabled"
                                />
                                
                                <p></p>
                                <span className="iconfont">&#xe612;</span>

                                
                            </SelectBox>
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
                                    onBlur={() => {inputBlur(this.input)}}
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
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                            {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                        </AddUploadWrapper>
                    </AddUpload>

                    <AddFileWrapper>
                        <AddTitle><span></span>附件上传</AddTitle>
                        <AddFile>
                            <FileName></FileName>
                            <span className="iconfont">&#xe619;</span>
                        </AddFile>
                    </AddFileWrapper>
                </AddContent>
            </AddWrapper>
            
        )
    }


    // 经营合伙人
    changeRadio(e) {
        this.setState({
            value: e.target.value,
        });
    }
}

const mapDispatch = (dispatch) => ({

    inputBlur(input) {
        let value = input.value
        console.log(value)
    },

    // 下拉
    addSelectDown() {
        let el = document.getElementsByClassName('add-ul')[0]
            el.classList.add('add-ul-show')
    },

    // 选择li
    addClickLi(kind) {
        let el = document.getElementsByClassName('add-ul')[0]
            el.classList.remove('add-ul-show')
    },

    handleCancel () {

    },

    handlePreview() {

    },

    handleChange(fileList ) {

    },

    // 取消
    handlecusCancel(cusNameEl, cusIdcardEl, cusMobileEl, cusAddressEl, cusConEl, cusKindEl, cusMoneyEl) {
        cusNameEl.value = ''
        cusIdcardEl.value = ''
        cusMobileEl.value = ''
        cusAddressEl.value = ''
        cusConEl.value = ''
        cusMoneyEl.value = ''
        let params = {
            isAdd:false
        }
        let action = actionCreators.changeIsAdd(params)
        dispatch(action)
    },

    //  保存
    handlecusSave() {
        
    }
    
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    previewVisible:state.getIn(['left', 'previewVisible']),
    previewImage:state.getIn(['left', 'previewImage']),
    fileList:state.getIn(['left', 'fileList']).toJS()
})

export default connect(mapState, mapDispatch)(AddNewCus)
