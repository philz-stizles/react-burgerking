import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import './Checkout.css'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        const { ingredients, match, purchased } = this.props

        let checkoutSummaryOrRedirect = <Redirect to="/" />
        if(ingredients) {
            const purchasedRedirect = (purchased) ? <Redirect to="/" /> : null
            checkoutSummaryOrRedirect = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancel={this.checkoutCancelHandler} 
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path={`${match.path}/contact-data`} component={ContactData} />
                </div>
            )
        }

        return checkoutSummaryOrRedirect
    }
}

const mapStateToProps = ({ burger: { ingredients }, order: { purchased } }) => ({
    ingredients,
    purchased
})

export default connect(mapStateToProps)(Checkout)