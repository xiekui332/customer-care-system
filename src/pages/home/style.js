import styled from 'styled-components';

export const ConWrapper = styled.div`
    display:flex;
    flex-flow:row;
    height:100%;
`;

export const LeftWrapper = styled.div`
    width:200px;
    height:100%;
    float:left;
    position:relative;
    border-right:1px solid #f7f7f7;
    box-sizing: content-box;
`;

// left
export const LeftTop = styled.div`
    width:100%;
    height:60px;
    background:#55a12f;
    text-align:center;
    color:#fff;
    p{  
        font-size:16px;
        height:30px;
        letter-spacing:2px;
        margin:0;
    }
    p:first-child{
        line-height:35px;
    }
    p:nth-child(2){
        line-height:25px;
    }
`;

export const LeftCustomer = styled.div`
    img{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
    }
    span{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
        font-size:60px;
        color:#DDD;
        margin:30px auto 10px;
        line-height: 60px;
    }
    p{
        font-size:14px;
        color:#999999;
        text-align:center;
    }
`;

export const LeftItemUl = styled.ul`
    width:160px;
    margin:45px auto 0;
`;

export const LeftItemLi = styled.li`
    width:100%;
    overflow:hidden;
    height:40px;
    margin-bottom:10px;
    cursor:pointer;
    span{
        display:inline-block;
        color:#333;
        font-size:14px;
        float:left;
        line-height:40px;
        position:relative;
        i{
            display:block;
            position:absolute;
            top:5px;
            right:-15px;
            width:10px;
            height:10px;
            background:#f99377;
            border-radius:50%;
        }
    }
    img{
        display:inline-block;
        width:20px;
        margin:10px 10px 0 35px;
        float:left;
    }
    &:hover{
        background:#fafafa;
    }
`;

export const LeftButton = styled.div`
    width:100%;
    position:absolute;
    bottom:0;
    left:0;
    display:flex;
    div{
        flex:1;
        cursor:pointer;
    }
    div span{
        font-size:14px;
        line-height:50px;
        text-align:center;
    }
    div:nth-child(1) span:nth-child(1){
        margin:0 5px 0 20px;
    }
    div:nth-child(2) span:nth-child(1){
        margin:0 5px 0 0px;
    }
`;

// 客户管理和详情整个部分
export const RightCon = styled.div`
    height:100%;
    flex:1;
    float:left;
    display:flex;
`;

export const Customer = styled.div`
    flex:1;
`;

export const DetailWrapper = styled.div`
    flex:2;
    background:#fff;
    overflow-y:auto;
    &::-webkit-scrollbar-track-piece { 
        background-color:#f7f7f7;
    }
    &::-webkit-scrollbar{
        width: 8px;
    }
    &::-webkit-scrollbar-thumb
    {
        background-color:#dbdbdb;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    & .iconfont{
        font-size:20px;
        cursor:pointer;
        margin-top:20px;
    }
    & .transferIcon{
        margin-right:30px;
        margin-left:20px;
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

// 搜索部分
export const SearchWrapper = styled.div`
    background:#f7f7f7;
    height:270px;
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
        background-color:#dbdbdb;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
`;

// 新建客户部分
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
`;

export const MiddleList = styled.div`
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


// RightWrapper details

export const RightHeaderWrapper = styled.div`
    width:100%;
    height:60px;
    border-bottom:1px solid #f7f7f7;
    display:flex;
    justify-content:flex-end;

    &.isOpacity{
        opacity:0;
        display:block;
        width:0;
    }
`;

export const RightWrapper = styled.div`
    width:90%;
    margin:30px auto;
    
    .example {
        width:80px;
        margin:30px auto;
        font-size:30px;
        text-align: center;
        border-radius: 4px;
    }
`;

export const RightContentWrapper = styled.table`
    width:100%;  
    border:1px solid #f7f7f7;
    tr{
        height:50px;
        line-height:50px;
        border-bottom:1px solid #f7f7f7;
    }
    tr:last-child{
        border-bottom:none;
    }
    tr td:nth-child(1){
        color:#333;
        font-size:14px;
        padding-left:15px;
        width:40%;
    }
    tr td:nth-child(2){
        color:#666666;
        font-size:14px;
        padding-left:10px;
        border-left:1px solid #f7f7f7;
        width:60%;
    }
`;

export const RightCarousel = styled.div`
    width:100%;
    height:95px;
    
    margin:30px auto;
    &.swiper-container{
        width:100%;
        margin:30px auto;
        .iconfont{
            position:absolute;
        }
        .iconfont:nth-child(1){
            top:15px;
            left:0;
        }
        .iconfont:nth-child(2){
            right:0;
            top:15px;
        }
        .swiper-button-next, .swiper-button-prev{
            background:none;
        }
        .swiper-pagination-bullet-active{
            background: #55a12f;
        }
    }
    .swiper-slide{
        
    }
    & .swiper-wrapper{
        width:0;
    }
`;

export const FileWrapper = styled.div`
    oveflow:hidden;
`;

export const FileItem = styled.div`
    cursor:pointer;
    display:inline-block;
    height:35px;
    line-height:35px;
    & .iconfont{
        margin-right:10px;
        font-size:16px;
    }
    padding:0 20px;
    margin:5px 10px;
    border-radius:3px;
    border:1px solid #dcdcdc;
`;
