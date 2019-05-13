import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LeftCon from './common/LeftWrapper'
import MiddleWrapper from './common/MiddleWrapper'
import RightWrapper from './common/RightWrapper'
import { 
    ConWrapper,
    RightCon
 } from './style'

class Home extends PureComponent {
    render () {
        const { login } = this.props;
        if(login){
            return (
                <ConWrapper>
                    <LeftCon/>
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
    login:state.getIn(['login', 'isLogin'])
})

export default connect(mapState, null)(Home) 