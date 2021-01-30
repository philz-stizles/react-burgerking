import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigationItem.css'

const NavigationItem = ({ children, link, exact }) => {
    return (
        // <li className="NavigationItem"><a href={link} className={(active) ? 'active' : null} >{children}</a></li>
        <li className="NavigationItem">
            <NavLink 
                exact={exact}
                activeClassName="active"
                to={link}>{children}</NavLink>
        </li>
    )
}

export default NavigationItem