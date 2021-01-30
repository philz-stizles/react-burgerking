import React from 'react'
import burgerLogo from './../../assets/images/burger-logo.png' // BurgerLogo will recieve the path 
// where webpack has stored the optimized
import './Logo.css'

const Logo = ({ height }) => {
    return (
        <div className="Logo" style={{
            height: height
        }}>
            <img src={burgerLogo} alt="BurgerKing Logo" />
        </div>
    )
}

export default Logo
