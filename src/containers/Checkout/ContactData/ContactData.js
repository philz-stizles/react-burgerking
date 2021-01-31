import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { checkValidity } from '../../../utils/validation'
import axios from './../../../api/axios-orders'
import { purchaseOrderAsync } from '../../../store/actions/order'
import './ContactData.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component {
    state = {
        orderForm: {
            name: { 
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Name'},
                value: '',
                validations: { required: true },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Email'},
                value: '',
                validations: { required: true },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Street'},
                value: '',
                validations: { required: true },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'ZIP Code'},
                value: '',
                validations: { required: true, minLength: 5, maxLength: 5 },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Country'},
                value: '',
                validations: { required: true },
                valid: false,
                touched: false
            },
            deleveryMethod: {
                elementType: 'select',
                elementConfig: { type: 'text', placeholder: 'Delivery Method', options: [
                    { value: 'fastest', name: 'Fastest'},
                    { value: 'cheapest', name: 'Cheapest'}
                ]},
                value: 'cheapest',
                validations: { required: true },
                valid: false
            },
        },
        formIsValid: false
    }

    inputChangeHandler = (event) => {
        console.log(event.target.name, event.target.value)
        const { name, value} = event.target
        const { orderForm } = this.state

        const updatedOrderForm = {
            ...orderForm
        }

        const updatedFormField = {
            ...orderForm[name],
            value,
            valid: checkValidity(value, orderForm[name]['validations']),
            touched: true
        }

        updatedOrderForm[name] = updatedFormField

        let formIsValid = true
        for(let field in updatedOrderForm) {
            formIsValid = updatedOrderForm[field].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        }, () => console.log(this.state.orderForm))
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const { ingredients, totalPrice, token } = this.props
        const { orderForm } = this.state
        const orderData = Object.keys(orderForm).reduce((accumulator, field) => {
            accumulator[field] = orderForm[field]['value']
            return accumulator
        }, {})

        const newOrder = {
            ingredients,
            price: totalPrice,
            orderData
        }

        this.props.onPurchaseOrder(newOrder, token)
    }

    render() {
        const { orderForm, formIsValid } = this.state
        const { loading } = this.props

        let formOrSpinner = (<form onSubmit={this.orderHandler}>
            {
                Object.keys(orderForm).map((field, i) => {
                    return <Input 
                        key={i} 
                        shouldValidate={orderForm[field].validations}
                        {...orderForm[field]} 
                        name={field} 
                        changed={this.inputChangeHandler} />
                })
            }
            <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
        </form>)

        if(loading) {
            formOrSpinner = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {formOrSpinner}
            </div>
        )
    }
}

const mapStateToProps = ({ 
    burger: { ingredients, totalPrice }, 
    order: { loading},
    auth: { token }
}) => ({
    ingredients,
    totalPrice,
    loading,
    token
})

const mapDispatchToProps = dispatch => ({
    onPurchaseOrder: (newOrder, token) => dispatch(purchaseOrderAsync(newOrder, token))
})


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))