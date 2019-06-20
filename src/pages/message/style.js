import styled from 'styled-components';

export const MessagePage = styled.div`
    display:flex;
    height: 100%;
`;

export const MessageWrapper = styled.div`
    height:100%;
    float:left;
    flex:2;
    display:flex;
    .ant-empty{
        margin:15% auto 0;
    }
`;

export const MessageMiddle = styled.div`
    width:400px;
    position:relative;
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
`;


export const MessageTitle = styled.p`
    height:60px;
    font-size:16px;
    color:#333;
    padding-left:35px;
    line-height:60px;
`;

export const MessageLargeBtn = styled.div`
    width:340px;
    height:50px;
    background:#55a12f;
    text-align:center;
    line-height:50px;
    color:#fff;
    font-size:16px;
    margin:30px auto;
    cursor:pointer;
    border-radius:5px;
`;

export const MessageItem = styled.div`
    width:340px;
    margin: 20px auto;
    background:#fff;
    border-radius:5px;
    padding:25px;
    >p{
        font-size:16px;
        color:#333;
        margin-bottom:10px;
        font-weight:500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    >div{
        padding-bottom:20px;
        span{
            display:block;
            line-height:30px;
        }
        span:nth-child(1) {
            float:left;
            color:#55a12f;
            font-size:16px;
        }
        span:nth-child(2) {
            float:right;
            color:#999;
            font-size:12px;
        }
    }
`;

export const MessageContent = styled.div`
    font-size:14px;
    color:#999;
    line-height: 22px;
`;



// 右边详情部分
export const MsgHead = styled.div`
    height:60px;
    border-bottom:1px solid #f7f7f7;
    padding:0 30px;
`;

export const MessageRightDetail = styled.div`
    flex:2;
    position:relative;
`;

export const MegRightTitle = styled.div`
    height:60px;
    font-size:16px;
    color:#333;
    line-height:60px;
    float:left;
`;

export const MegRightBtn = styled.div`
    float:right;
    display:flex;
    justify-content:flex-end;
    .iconfont{
        cursor:pointer;
        font-size:20px;
        margin-right:20px;
        margin-top:20px;
    }
`;

export const MsgBtn = styled.div`
    width:70px;
    height:35px;
    border-radius:2px;
    text-align:center;
    line-height:35px;
    margin-top:12px;
    cursor:pointer;
    &.msgSave{
        background:#55a12f;
        color:#fff;
    }
    &.msgCancel{
        color:#333;
    }
`;

export const MsgContent = styled.div`
    padding:0 30px;
`;

export const MsgTextWrapper = styled.div`
    >p{
        font-size:14px;
        color:#333;
        margin-top:30px;
        margin-bottom:10px;
    }

    .msg-textarea{
        width:400px;
        background:#f7f7f7;
    }
    .msg-textarea:focus{
        border:1px solid #55a12f;
        box-shadow:none;
    }
    .msg-textarea:hover{
        border:1px solid #55a12f;
    }
`;

export const MsgSelect = styled.div`
    width:400px;
    position:relative;
    &>.iconfont{
        font-size:20px;
        position:absolute;
        right:10px;
        top:5px;
        cursor:pointer;
    }
    input{
        background:#f7f7f7;
    }
    input:focus{
        border:1px solid #55a12f;
        box-shadow:none;
    }
    input:hover{
        border:1px solid #55a12f;
    }
`;

export const MsgInput = styled.input`
    width:90%;
    height:100%;
    background:#f7f7f7;
    border:none;
    padding-left:10px;
    &::placeholder{
        font-size:12px;
    }
    &:focus{
        border:none;
    }
`;

export const MsgText = styled.div`
    line-height:40px;
    padding-left:10px;
    font-size:14px;
    &.isgray{
        color:#999;
        font-size:12px;
    }
`;

export const MsgItem = styled.ul`
    width:100%;
    position:absolute;
    background:#f7f7f7;
    top:45px;
    left:0;
    z-index:1;
    transition:all ease-in .2s;
    box-shadow: 0 0 5px #dcdcdc;
    >li{
        width:100%;
        height:40px;
        padding-left:10px;
        font-size:14px;
        border-bottom:1px solid #dcdcdc;
        line-height:40px;
        transition:all ease-in .1s;
    }
    >li:hover{
        background:#55a12f;
        color:#fff;
    }
    &.isShow, &.isHide{
        transition:all ease-in .1s;
    }
`;


export const PreviewMessage = styled.div`
    width:300px;
    background:#fff;
    position:absolute;
    right:-300px;
    top:60px;
    transition:all ease-in .2s;
    box-shadow: -4px 0 5px -3px #eee;  
    &.active{
        right:0px;
    }
    >p{
        padding:20px; 
        font-size:14px;
        color:#333;
    }
    >div{
        width:250px;
        margin:5px auto;
        border:1px solid #e5e5e5;
        padding:20px 10px;
        border-radius:3px;
        font-size: 13px;
        line-height: 18px;
    }
`;


// PreviewMessage
