import React, {Component} from 'react'
import { connect } from 'react-redux'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import { Backdrop } from '../../components/UI/Backdrop/Backdrop'
import Auxi from '../Auxilliary/Auxilliary'

import './Layout.css'
class Layout extends Component {
    render() {
        const { isAuthenticated, children } = this.props
        console.log(isAuthenticated)
        return (
            <Auxi>
                <Toolbar isAuthenticated={isAuthenticated} />
                <SideDrawer isAuthenticated={isAuthenticated} />
                <Backdrop />
                <main className="Content">{children}</main>
            </Auxi>
        )
    }
}

const mapStateToProps = ({ auth: { token } }) => ({
    isAuthenticated: token !== null,
})

export default connect(mapStateToProps)(Layout)