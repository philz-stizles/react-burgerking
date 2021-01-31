import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
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
        const { ingredients, match } = this.props

        return (
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancel={this.checkoutCancelHandler} 
                    checkoutContinue={this.checkoutContinueHandler}
                    />
                <Route 
                    path={`${match.path}/contact-data`} component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = ({ ingredients }) => ({
    ingredients
})

export default connect(mapStateToProps)(Checkout)