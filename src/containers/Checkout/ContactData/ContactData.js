import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import axios from './../../../api/axios-orders'
import './ContactData.css'

export default class ContactData extends Component {
    state = {
        orderForm: {
            name: { 
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Name'},
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Email'},
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Street'},
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'ZIP Code'},
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Country'},
                value: ''
            },
            deleveryMethod: {
                elementType: 'select',
                elementConfig: { type: 'text', placeholder: 'Country', options: [
                    { value: 'fastest', name: 'Fastest'},
                    { value: 'cheapest', name: 'Cheapest'}
                ]},
                value: ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})

        axios.post('/orders.json', {})
            .then(response => {
                console.log(response)
                this.setState({loading: false, showModal: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false, showModal: false})
            })
    }

    render() {
        const { orderForm } = this.state
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                <form>
                    <Input inputtype="input" name="name" id="" placeholder="Your Name" type="text" value="" />
                    <Input inputtype="input" name="email" id="" placeholder="Your Email" type="email" value="" />
                    <Input inputtype="input" name="street" id="" placeholder="Street" type="text" value="" />
                    <Input inputtype="input" name="postalCode" id="" placeholder="Postal code" type="text" value="" />
                    <Button btnType="Success" >ORDER</Button>
                </form>
            </div>
        )
    }
}
