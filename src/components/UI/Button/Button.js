import React from 'react'
import './Button.css'

const Button = ({ children, click, btnType }) => {
    return (
        <button className={`Button${(btnType) ? ' ' + btnType : ''}`} onClick={click}>{children}</button>
    )
}

export default Button
