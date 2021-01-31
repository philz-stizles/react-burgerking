import React from 'react'
import './Button.css'

const Button = ({ children, click, btnType, disabled }) => {
    return (
        <button className={`Button${(btnType) ? ' ' + btnType : ''}`} onClick={click} disabled={disabled}>{children}</button>
    )
}

export default Button
