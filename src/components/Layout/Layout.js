import React from 'react'
import Auxi from './../../hoc/Auxi'

import './Layout.css'

const Layout = (props) => {
    return (
        <Auxi>
            <div>ToolBar, SideDrawer, BackDrop</div>
            <main class="Content">{props.children}</main>
        </Auxi>
    )
}

export default Layout