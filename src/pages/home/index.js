import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from './common/LeftWrapper'
import MiddleWrapper from './common/MiddleWrapper'
import RightWrapper from './common/RightWrapper'
import { sessionGetItem } from '../../api'
import { 
    ConWrapper,
    RightCon
 } from './style'

class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            login:sessionGetItem('token'),
            
        }
    }
    render () {
        const { login } = this.state;
        if(login){
            let user = JSON.parse(sessionStorage.getItem("user"))
            // console.log(user.userType)
            if(user && user.userType === 1) {
                return <Redirect to="/user"></Redirect>
            }
            return (
                <ConWrapper>
                    <LeftCon />
                    <RightCon>
                        <MiddleWrapper />
                        <RightWrapper />
                    </RightCon>
                </ConWrapper>
            )
        }else{
            return <Redirect to="/login"></Redirect>
        }
        
    }

    
}

const mapState = (state) => ({
    
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, mapDispatch)(Home) 