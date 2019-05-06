import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import "antd/dist/antd.css";
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

    render() {
        const { isAdd, inputBlur, addSelectDown, addClickLi, 
                previewVisible, previewImage, fileList 
        } = this.props;

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
                        <AddCusButton className="add-cancel">取消</AddCusButton>
                        <AddCusButton className="add-save">保存</AddCusButton>
                    </AddButtonWrapper>
                </AddCusHeadWrapper>

                <AddContent>
                    <Fragment>
                        <AddItem>
                            <AddTitle><span>*</span>客户姓名</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入姓名"
                                    ref = {(input) => {this.input = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>身份证号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入身份证号码"
                                    ref = {(input) => {this.input = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span>*</span>手机号码</AddTitle>
                                <input
                                    className="add-input"
                                    placeholder="请输入手机号码"
                                    ref = {(input) => {this.input = input}}
                                    onBlur={() => {inputBlur(this.input)}}
                                />
                            <p></p>
                        </AddItem>
                        <AddItem>
                            <AddTitle><span></span>行业名称</AddTitle>
                            <SelectBox onClick={addSelectDown}>
                                <input
                                    className="add-input"
                                    placeholder="请输入行业名称"
                                    ref = {(input) => {this.input = input}}
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
                                    ref = {(input) => {this.input = input}}
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

    }
})

const mapState = (state) => ({
    isAdd:state.getIn(['left', 'isAdd']),
    previewVisible:state.getIn(['left', 'previewVisible']),
    previewImage:state.getIn(['left', 'previewImage']),
    fileList:state.getIn(['left', 'fileList']).toJS()
})

export default connect(mapState, mapDispatch)(AddNewCus)
