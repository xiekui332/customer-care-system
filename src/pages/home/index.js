import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import LeftCon from './common/LeftWrapper'
import MiddleWrapper from './common/MiddleWrapper'
import RightWrapper from './common/RightWrapper'
import { 
    ConWrapper,
    RightCon
 } from './style'

class Home extends PureComponent {
    render () {
        return (
            <ConWrapper>
                <LeftCon />
                <RightCon>
                    <MiddleWrapper />
                    <RightWrapper />
                </RightCon>
            </ConWrapper>
        )
    }
}

export default connect(null, null)(Home) 