import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = ({ isAuthenticated }) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            {(!isAuthenticated) ? null : (<NavigationItem link="/orders">Orders</NavigationItem>)}
            {
                (!isAuthenticated) 
                ? (<NavigationItem link="/auth">Sign in</NavigationItem>)
                : (<NavigationItem link="/logout">Logout</NavigationItem>)
            }
        </ul>
    )
}

export default NavigationItems