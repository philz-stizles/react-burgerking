import React from 'react'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import { Backdrop } from '../../components/UI/Backdrop/Backdrop'
import Auxi from '../Auxilliary/Auxilliary'

import './Layout.css'

const Layout = (props) => {
    return (
        <Auxi>
            <Toolbar />
            <SideDrawer />
            <Backdrop />
            <main className="Content">{props.children}</main>
        </Auxi>
    )
}

export default Layout