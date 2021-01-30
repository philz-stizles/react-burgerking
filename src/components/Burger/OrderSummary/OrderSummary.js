import React, { Component } from 'react'
import Auxi from '../../../hoc/Auxilliary/Auxilliary'
import Button from './../../UI/Button/Button'

class OrderSummary extends Component {

    render() {
        const { ingredients, totalPrice, orderCancel, orderContinue } = this.props
        const ingredientSummary = Object.keys(ingredients)
            .map((ingredientKey, i) => <li key={ingredientKey}><span style={{
                textTransform: 'capitalize'
            }}>{ingredientKey}</span>: {ingredients[ingredientKey]}</li>)

        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
                <Button click={orderCancel} btnType="Danger">CANCEL</Button>
                <Button click={() => orderContinue() } btnType="Success">CONTINUE</Button>
                {/* <Button click={() => orderContinue(ingredients) } btnType="Success">CONTINUE</Button> */}
                {/* <Button click={() => orderContinue({
                    ingredients: ingredients,
                    price: totalPrice
                    
                })} btnType="Success">CONTINUE</Button> */}
            </Auxi>
        )
    }
}

// OrderSummary.prototype = {
    
// }

export default OrderSummary