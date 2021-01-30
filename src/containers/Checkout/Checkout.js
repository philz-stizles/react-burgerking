import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import './Checkout.css'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {
    state = {
        ingredients: {
            // salad: 1,
            // bacon: 1,
            // cheese: 1,
            // meat: 1
        }
    }

    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search)
        console.log(query)
        console.log(query.entries())
        const ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }

        this.setState({ingredients: ingredients}, () => console.log(this.state))
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        const { match } = this.props
        const { ingredients } = this.state
        console.log(ingredients)
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ingredients}
                    checkoutCancel={this.checkoutCancelHandler} 
                    checkoutContinue={this.checkoutContinueHandler}
                    />
                <Route path={`${match.path}/contact-data`} component={ContactData} />
            </div>
        )
    }
}
