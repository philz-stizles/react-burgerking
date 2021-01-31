import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

export const BuildControls = ({ isAuthenticated, onAddIngredient, onRemoveIngredient, disabledStates, totalPrice, purchasable, onShowModal}) => {
    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            {
                controls.map((control,  i) => {
                    return <BuildControl key={i} 
                        {...control} 
                        onAddIngredient={() => onAddIngredient(control.type)} 
                        onRemoveIngredient={() => onRemoveIngredient(control.type)}
                        isDisabled={disabledStates[control.type]}
                    />
                })
            }
            <button onClick={onShowModal} className="OrderButton" disabled={!purchasable}>{(isAuthenticated)? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}
