import React, { Component } from 'react'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Auxi from '../../hoc/Auxilliary/Auxilliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../api/axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        showModal: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                console.log(response)
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    addIngredientHandler = (type) => {
        const { ingredients, totalPrice } = this.state
        const updatedIngredients = {
            ...ingredients,
            [type]: ingredients[type] + 1
        }
        const count = this.updatePurchasable(updatedIngredients)
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice + INGREDIENT_PRICES[type],
            purchasable: (count <= 0) ? false : true
        })
    }

    removeIngredientHandler = (type) => {
        const { ingredients, totalPrice } = this.state
        const updatedIngredients = {
            ...ingredients,
            [type]: (ingredients[type] <= 0) ? 0 : ingredients[type] - 1
        }
        const count = this.updatePurchasable(updatedIngredients)
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice - INGREDIENT_PRICES[type],
            purchasable: (count <= 0) ? false : true
        })
    }

    updatePurchasable = (ingredients) => {
        return Object.keys(ingredients)
            .map(ingredientKey => ingredients[ingredientKey])
            .reduce((accumulator, ingredientValue) => accumulator + ingredientValue, 0)
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    orderCancel = () => {
        console.log('cancel')
        this.setState({showModal: false})
    }

    goToCheckout = () => {
        const { ingredients } = this.state
        const queryParams = Object.keys(ingredients)
            .map(ingredient => {
                return `${encodeURIComponent(ingredient)}=${encodeURIComponent(ingredients[ingredient])}`
            })
            .join('&')
        this.setState({showModal: false})
        this.props.history.push({
            pathname: '/checkout',
            search: queryParams
        })

        // this.setState({loading: true})

        // axios.post('/orders.json', ingredients)
        //     .then(response => {
        //         console.log(response)
        //         this.setState({loading: false, showModal: false})
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({loading: false, showModal: false})
        //     })
    }

    render() {
        const { ingredients, totalPrice, purchasable, showModal, loading, error } = this.state
        const disabledStates = {}
        for(let key in ingredients) {
            disabledStates[key] = (ingredients[key] <= 0 ) ? true : false
        }

        let burgerComponentsOrSpinner = error ? <p>Ingredients can't be loaded</p> : <Spinner />
        let modalComponent = null

        if(ingredients) {
            burgerComponentsOrSpinner = (
                <Auxi>
                    <Burger ingredients={ingredients}/>
                    <BuildControls 
                        purchasable={purchasable}
                        totalPrice={totalPrice}
                        onAddIngredient={this.addIngredientHandler} 
                        onRemoveIngredient={this.removeIngredientHandler}
                        disabledStates={disabledStates}
                        onShowModal={this.toggleModal}
                    />
                </Auxi>
            )

            modalComponent = <OrderSummary 
                ingredients={ingredients} 
                orderCancel={this.orderCancel} 
                orderContinue={this.goToCheckout}
                totalPrice={totalPrice}
            />

            if(loading) {
                modalComponent = <Spinner />
            }
        }

        return ( 
            <Auxi>
                <Modal show={showModal} onModalClose={this.closeModal}>
                    {modalComponent}
                </Modal>
                {
                    burgerComponentsOrSpinner
                }
            </Auxi>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)