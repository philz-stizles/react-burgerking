import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import { SideDrawerContainer } from './SideDrawer.styles'

const SideDrawer = () => {
    return (
        <SideDrawerContainer>
            <div className="logo-wrapper">
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </SideDrawerContainer>
    )
}

export default SideDrawer