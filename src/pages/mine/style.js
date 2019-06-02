import styled from 'styled-components';

export const MineWrapepr = styled.div`
    display:flex;
    height:100%;
`;

export const MineCon = styled.div`
    height:100%;
    flex:2;
    display:flex;
`;

export const MineMiddle = styled.div`
    width:400px;
    height:100%;
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
    .mine-title{
        font-size:16px;
        color:#333;
        line-height:60px;
        padding-left:30px;
    }
    .empty{
        color:#999;
        font-size:12px;
    }
`;

export const MineMessage = styled.div`
    width:340px;
    margin:0 auto;
    padding:20px 30px 5px;
    background:#fff;
    border-radius:5px;
    box-shadow: 0 3px 5px 0px #dcdcdc;
`;

export const UserName = styled.span`
    font-size:20px;
    color:#55a12f;
`;

export const UserRole = styled.span`
    font-size:14px;
    color:#55a12f;
`;

export const UserNumberWrapper = styled.div`
    margin-top:35px;
    margin-bottom: 10px;
`;

export const UserNumPhone = styled.div`
    display:inline-block;
    font-size:14px;
    color:#999;
    margin-right:50px;
`;

export const UserNumIdcard = styled.div`
    display:inline-block;
    font-size:14px;
    color:#999;
`;

export const ToDealt = styled.div`
    font-size:16px;
    color:#333;
    margin-top:25px;
    padding-left:30px;
    margin-bottom:20px;
`;

export const ToDealtItem = styled.div`
    width:340px;
    margin:0 auto;
    padding:20px 30px 5px;
    background:#fff;
    border-radius:5px;
    position:relative;
    margin-bottom:30px;
    font-size:14px;
    color:#333;
    line-height:25px;
    .iconfont{
        display:block;
        position:absolute;
        color:#333;
        width:20px;
        height:20px;
        border-radius:50%;
        background:#dcdcdc;
        text-align:center;
        line-height:20px;
        transform:scale(1.3);
        right:-10px;
        top:-10px;
        cursor:default;
    }

    .todoTime,.todoSource{
        line-height:20px;
        padding:10px 0;
        margin-top:0px;
    }
    .todoTime{
        float:left;
        font-size:12px;
        color:#999;
    }
    .todoSource{
        float:right;
        font-size:12px;
        color:#999;
        span{
            font-size:14px;
            color:#333;
        }
    }
    .clear{
        clear:both;
    }
`;

export const MineRight = styled.div`
    padding:0 30px;
    flex:2;
    height:100%;
    .ant-tabs-nav .ant-tabs-tab:hover{
        color:#333;
    }
    .ant-tabs-nav .ant-tabs-tab-active{
        color:#333;
    }
    .ant-tabs-tab{
        color:#999;
    }
    .ant-tabs-bar{
        height:60px;
        border-bottom: 1px solid #f7f7f7;
    }
    .ant-tabs-extra-content button{
        width:70px;
        height:30px;
        margin-top:15px;
        background:#55a12f;
        color:#fff;
        &:focus{
            border:none;
        }
        &:hover{
            border:none;
        }
    }
    .ant-tabs-nav .ant-tabs-tab{
        padding:20px 16px;
    }
    .ant-tabs-ink-bar{
        background-color: #55a12f;
    }
`;

export const ChangePwoTitle = styled.p`
    font-size:14px;
    color:#333;
    margin-top:10px;
    margin-bottom:10px;
`;

export const ChangePanel = styled.div`
    .change-pwo-input{
        width:400px;
        height:40px;
        margin-bottom:10px;
        &:hover{
            border: 1px solid #55a12f;
        }
        &:focus{
            border: 1px solid #55a12f;
            box-shadow:none;
        }
        &::placeholder{
            font-size:14px;
        }
    }
`;

