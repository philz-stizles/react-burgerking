import React from 'react'
import './Input.css'

const Input = (props) => {
    const { label, elementType, elementConfig, value, name, changed, valid, touched, shouldValidate } = props
    let inputElement = null
    const inputClasses = ['input-element']

    if(!valid && shouldValidate && touched) {
        inputClasses.push('invalid')
    }

    switch(elementType) {
        case ('input'):
            inputElement = <input 
                name={name}
                onChange={changed}
                className={inputClasses.join(' ')}
                {...elementConfig}
                value={value}/>
            break
        case ('textarea'):
            inputElement = <textarea 
                name={name}
                onChange={changed}
                className={inputClasses.join(' ')} 
                {...elementConfig}
                value={value}/>
            break
        case ('select'):
            inputElement = <select onChange={changed} name={name} className={inputClasses.join(' ')} value={value}>
                    {elementConfig.options.map(({name, value}) => {
                        return <option key={value} name={value}>{name}</option>
                    })}
                </select>
            break
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
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
