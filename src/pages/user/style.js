import styled from 'styled-components'

export const Large = styled.div`
    
`;

export const UserWrapper = styled.div`
    display:flex;
    height:100%;
`;

export const UserCon = styled.div`
    height:100%;
    flex:2;
    display:flex;
`;

export const UserMiddle = styled.div`
    width:400px;
    height:100%;
    position:relative;
`;

export const UserRight = styled.div`
    padding:0 30px;
    flex:2;
    height:100%;
    .ant-empty{
        margin-top:50px;
    }
`;

export const MiddleHeader = styled.div`
    height:60px;
    background:#f7f7f7;
    >span{
        display:block;
        float:left;
        line-height:60px;
        padding-left:30px;
        font-size:16px;
        color:#333;
    }
`;

export const OperateWrapper = styled.div`
    display:flex;
    justify-content: flex-end;
    padding-right:30px;
    span{
        line-height:30px;
        padding:0 10px;
        padding-top:15px;
        font-size:20px;
        cursor:default;
        color:#999;
    }
    span:hover{
        color:#333;
    }
`;

export const MiddleListWrapper = styled.div`
    overflow-y:auto;
    background:#f7f7f7;
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &.editSrollBar::-webkit-scrollbar{
        width: 8px;
    }
    &.editSrollBar::-webkit-scrollbar-thumb
    {
        background-color:#f6f6f6;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    &.MiddleListWrapper-active{
        padding-bottom:75px;
    }
`;

// 新建用户部分
export const AddCustomerWrapper = styled.div`
    height:0px;
    overflow:hidden;
    background:#fff;
    color:#999;
    font-size:14px;
    text-align:center;
    line-height:80px;
    cursor:default;
    transition:all ease-in .2s;
    &.add-customer-show{
        height:80px;
    }
`;

export const MiddleList = styled.div`
    clear:both;
    height:80px;
    border-left:4px solid #f7f7f7;
    cursor:default;
    box-sizing: content-box;
    img{
        display:block;
        width:40px;
        height:40px;
        border-radius:50%;
        float:left;
        margin:20px 15px 20px 25px;
    }
    border-bottom:1px solid #f3f3f3;

    &.selected{
        background:#fff;
        border-left:4px solid #55a12f;
        box-sizing: content-box;
    }
    .iconfont{
        display:block;
        font-size:40px;
        color:#DDD;
        float:left;
        margin:9px 15px 20px 25px;
    }
`;

export const MiddleChceckBox = styled.div`
    width:0;
    opacity:0;
    border-radius:50%;
    border:1px solid #dcdcdc;
    background:#fff;
    float:left;
    margin:30px -5px 0 15px;
    position:relative;
    span{
        color:#55a12f;
        position:absolute;
        top: -5px;
        left: -1px;
        font-size: 19px;
        display:none;
    }
    &.middle-check-box-show{
        width:20px;
        height:20px;
        opacity:1;
        span{
            display:block;
        }
    }
    &.middleChceckBox-show{
        display:block;
        width:20px;
        height:20px;
        opacity:1;
    }
    transition:all ease-in .2s;
`;

export const CustomerInfo = styled.div`
    float:left;
    p:nth-child(1) span:nth-child(1){
        font-size:16px;
        color:#333;
    }
    p:nth-child(1) span:nth-child(2){
        font-size:16px;
        color:#999;
        margin-left:20px;
    }
    p:nth-child(1){
        margin-top:15px;
    }
    p:nth-child(2){
        font-size:14px;
        color:#999;
        margin-top:-12px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
`;

// 右边部分
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
    margin:30px 0 50px 50px;
`;

export const AddItem = styled.div`
    margin:30px 0;
    &>.add-input{
        width:400px;
        font-size:14px;
        outline:none;
        height:30px;
        border:1px solid #dcdcdc;
        border-radius:4px;
        padding:0 10px;
    }
    &>.add-input::placeholder{
        color:#ccc;
        font-size:12px;
    }
        
    &>.add-input:hover{
        border:1px solid #55a12f;
    }
    &>.add-input:focus{
        border:1px solid #55a12f;
        box-shadow:none;
    }
    transition:all ease-in .1s;

    .add-number{
        float:right;
        line-height:30px;
        margin-right:50px;
    }
    .ant-select-selection__placeholder{
        font-size:12px;
    }
    .ant-select-selection:hover{
        border:1px solid #55a12f;
    }
    .ant-select-focused{
        box-shadow:none;
    }
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

// 搜索部分
export const SearchWrapper = styled.div`
    height:0;
    overflow:hidden;
    background:#f7f7f7;
    input{
        outline:none;
        border:1px solid #dcdcdc;
        border-radius:5px;
        padding:0 10px;
    }
    input:focus{
        border:1px solid #55a12f;
    }
    input::placeholder{
        font-size:12px;
        color:#999;
    }
    transition:all ease-in .2s;
    &.searchel-show{
        height:160px;
    }
`;

export const SearchCondition = styled.div`
    display:block;
    width:340px;
    margin:0px auto;
    overflow:hidden;
    span{
        display:block;
        float:left;
        font-size:13px;
        color:#666;
        line-height:30px;
        margin-top:20px;
        margin-right:10px;
    }
`;

export const SearchInput = styled.input`
    display:block;
    width:200px;
    height:30px;
    float:left;
    margin-top:20px;
`;

export const StatusWrapper = styled.div`
    
`;

export const UserListWapper = styled.div`
    
`;