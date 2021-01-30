import React from 'react'
import './BuildControl.css'

const BuildControl = ({ label, onAddIngredient, onRemoveIngredient, isDisabled }) => {
    return (
        <div className="BuildControl">
            <div className="label">{label}</div>
            <button className="less" onClick={onRemoveIngredient} disabled={isDisabled} >Less</button>
            <button className="more" onClick={onAddIngredient}>More</button>
        </div>
    )
}

export default BuildControl
