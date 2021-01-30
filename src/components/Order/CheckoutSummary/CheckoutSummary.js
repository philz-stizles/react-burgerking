import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'

const CheckoutSummary = ({ ingredients, checkoutCancel, checkoutContinue }) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div className="burgerWrapper" >
                <Burger ingredients={ingredients}/>
            </div>
            <Button btnType="Danger" click={checkoutCancel}>CANCEL</Button>
            <Button btnType="Success" click={checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary
