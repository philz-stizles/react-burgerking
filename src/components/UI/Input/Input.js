import React from 'react'
import './Input.css'

const Input = (props) => {
    const { label, elementType, elementConfig, value } = props
    let inputElement = null

    switch(elementType) {
        case ('input'):
            inputElement = <input 
                className="input-element"
                {...elementConfig}
                value={value}/>
            break
        case ('textarea'):
            inputElement = <textarea 
                className="input-element" 
                {...elementConfig}
                value={value}/>
            break
        default:
            inputElement = <input 
                className="input-element" 
                {...elementConfig}
                value={value}/>
    }
    return (
        <div className="Input">
            <label>{label}</label>
            {inputElement}
        </div>
    )
}

export default Input
