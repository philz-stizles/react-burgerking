import React from 'react'
import './Order.css'

const Order = ({ ingredients, price }) => {
    let transformedIngredients = Object.keys(ingredients)
        .map(ingredient => {
            return <span style={{ 
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ingredient} ({ingredients[ingredient]})</span>
        })

    return (
        <div className="Order">
            <p>Ingredients: {transformedIngredients }</p>
            <p>Price: <strong>USD {price}</strong></p>
        </div>
    )
}

export default Order
