import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from './../../Logo/Logo'
import { ToolbarContainer } from './Toolbar.styles'

const Toolbar = () => {
    return (
        <ToolbarContainer>
            <div>MENU</div>
            <div className="logo-wrapper">
                <Logo />
            </div>
            <nav className="desktop-only">
                <NavigationItems />
            </nav>
        </ToolbarContainer>
    )
}

export default Toolbar