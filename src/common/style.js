import styled from 'styled-components';

export const AddWrapper = styled.div`
    margin-bottom:50px;
`;

export const AddCusHeadWrapper = styled.div`
    height:60px;
    border-bottom:1px solid #f7f7f7;
    overflow:hidden;
`;

export const AddCusHeadText = styled.span`
    display:block;
    line-height:60px;
    font-size:16px;
    color:#333;
    float:left;
    margin-left:30px;
`;

export const AddButtonWrapper = styled.div`
    float:right;
    display:flex;
    justify-content:flex-end;
`;

export const AddCusButton = styled.div`
    width:70px;
    height:30px;
    border-radius:2px;
    font-size:14px;
    text-align:center;
    line-height:30px;
    margin:15px 0;
    cursor:pointer;
    &.add-save{
        background:#55a12f;
        color:#FFF;
        margin-right:30px;
    }
    &.add-cancel{
        color:#666;
    }
`;

export const AddContent = styled.div`
width:600px;
    margin:30px auto 50px;
`;


export const AddTitle = styled.div`
    float:left;
    line-height:30px;
    color:#333;
    margin-right:20px;
    span{
        display:inline-block;
        line-height:30px;
        color:red;
        margin-right:5px;
    }
    min-width:90px;
    text-align:right;
`;

export const AddItem = styled.div`
    .ant-select-selection__placeholder, .ant-select-search__field__placeholder{
        font-size:13px;
    }
    &>.active{
        border:1px solid red!important;
    }
    
    &>.add-input{
        width: 60%;
        font-size:14px;
        outline:none;
        height:30px;
        border:1px solid #dcdcdc;
        border-radius:4px;
        padding:0 10px;
    }
    &>.add-input::placeholder{
        color:#999;
    }
        
    &>.add-input:hover{
        border:1px solid #55a12f;
    }
    &>.add-input:focus{
        border:1px solid #55a12f;
    }
    transition:all ease-in .1s;
    >.add-input::placeholder{
        font-size:12px;
    }

    .add-number{
        float:right;
        line-height:30px;
        margin-right:50px;
    }
    .radio-group{
        margin-top:5px;
    }
    .ant-radio-checked .ant-radio-inner{
        border-color:#55a12f;
    }
`;

export const SelectBox = styled.div`
    width:400px;
    height:30px;
    position:relative;
    float:left;
    transition:all ease-in .1s;
    .add-input{
        border:none;
        width:400px;
        height:30px;
        padding:0 10px;
        border-radius:4px;
        outline:none;
        border:1px solid #dcdcdc;
        background:#fff;
    }
    .add-input::placeholder{
        font-size:12px;
        color:#999;
    }
    .add-input:focus{
        border:1px solid #55a12f;
    }
    & .add-input:hover{
        border:1px solid #55a12f;
    }
    >.iconfont{
        position:absolute;
        right:5px;
        top:-20px;
    }
`;


export const AddUl = styled.ul`
    width:400px;
    border:1px solid #dcdcdc;
    margin-top:-15px;
    margin-left: 110px;
    height:0px;
    overflow:hidden;
    transition: all ease-in .1s;
    opacity:0;
    box-shadow:0px 1px 4px rgba(0,0,0,0.3);
    border-radius:1px;
    &.add-ul-show{
        height:auto;
        opacity:1;
    }
`;

export const AddLi = styled.li`
    width:100%;
    height:30px;
    color:#666;
    font-size:12px;
    padding-left:20px;
    line-height:30px;
    border-bottom:1px solid #dcdcdc;
    &:last-child{
        border-bottom:none;
    }
    &:hover{
        background:#55a12f;
        color:#FFF;
    }
`;


// upload

export const AddUpload = styled.div`
    overflow:hidden;
`;

export const AddUploadWrapper = styled.div`
    width:460px;
    min-height:100px;
    margin-left: 110px;
    .uploadButton{
        margin-top:0px;
    }
    .clearfix-two{
        width:350px;
        .ant-upload-list-text{
            display:none;
        }
    }
`;

export const AddFileWrapper = styled.div`
    overflow:hidden;
    margin-top:10px;
`;

export const AddFile = styled.div`
    width:400px;
    overflow:hidden;
    & .iconfont{
        display:block;
        float:left;
        margin:0 0 0 30px;
    }
`;
export const FileName = styled.div`
    width:300px;
    border:1px solid #dcdcdc;
    border-radius:5px;
    line-height:30px;
    float:left;
    font-size:13px;
    padding-left:10px;
`;