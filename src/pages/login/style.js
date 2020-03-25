import styled from 'styled-components';
import backlogo from '../../statics/images/login-logo.jpg'

export const LoginWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
`;

export const BackLogo = styled.div`
    flex:3;
    width:825px;
    height:100%;
    background:#f7f7f7;
    background:url(${backlogo}) no-repeat;
    background-size: cover;
    float: left;
    margin-top:0px;
    margin-left:0;
`;

export const RightWrapper = styled.div`
    flex:2;
    height:100%;
    overflow-y:auto;
`;
export const LoginTitle = styled.p`
    font-size:26px;
    color:#333;
    text-align:center;
    margin:20% auto 55px;
`;
export const LoginInputWrapper = styled.div`
    width:270px;
    margin:0 auto 25px;
    >p{
        font-size:14px;
        color:#333;
        lien-height:25px;
        margin: 5px 0px 10px;
    }
`;

export const UserInput = styled.input`
    width:100%;
    height:40px;
    border:1px solid #dcdcdc;
    border-radius:2px;
    padding:0 0 0 10px;
    margin-top:0px;
    &:hover{
        border:1px solid #55a12f;
    }
    &:focus{
        border:1px solid #55a12f;
    }
    &::placeholder{
        font-size:12px;
        color:#999;
    }
    &:-ms-input-placeholder{
        font-size:12px;
        color:#999;
    }
`;

export const LoginButtonWapper = styled.div`
    width:270px;
    overflow:hidden;
    margin:0 auto;
`;

export const LoginYes = styled.div`
    width:135px;
    height:44px;
    background:#55a12f;
    font-size:14px;
    color:#fff;
    text-align:center;
    line-height:44px;
    cursor:pointer;
    float:left;
    border-radius:3px;
`;

export const LoginFind = styled.div`
    width:135px;
    height:44px;
    font-size:14px;
    color:#666;
    text-align:right;
    line-height:44px;
    cursor:pointer;
    float:right;
    border-radius:3px;
`;

export const LoginTips = styled.p`
    width:270px;
    color:red;
    opacity:0;
    margin:-15px auto 5px;
    font-size:12px;
    &.isOpacity{
        opacity:1;
    }
`;


// 找回密码部分

export const LoginCondition = styled.div`
    
`;

export const FindWrapper = styled.div`
    width:270px;
    margin:75px auto 0;
    >p{
        font-size:26px;
        color:#333;
        margin-bottom:30px;
    }
`;

export const MessageInput = styled.input`
    width:140px;
    height:40px;
    border:1px solid #dcdcdc;
    border-radius:2px;
    padding:0 0 0 10px;
    &:hover{
        border:1px solid #55a12f;
    }
    &:focus{
        border:1px solid #55a12f;
    }
    &::placeholder{
        font-size:12px;
    }
`;

export const MessageButton = styled.div`
    width:100px;
    height:40px;
    border:1px solid #dcdcdc;
    borrder-radius:2px;
    text-align:center;
    line-height:40px;
    font-size:14px;
    color:#55a12f;
    cursor:pointer;
    float:right;
`;

export const FindTips = styled.div`
    height:15px;
    font-size:12px;
    color:red;
    margin:-10px auto 10px;
`;
