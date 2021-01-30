import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = () => {
    return (
        <ul className="NavigationItems">
            {/* <NavigationItem link="/" active>Burger Builder</NavigationItem> */}
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            {/* <NavigationItem link="/">Checkout</NavigationItem> */}
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems