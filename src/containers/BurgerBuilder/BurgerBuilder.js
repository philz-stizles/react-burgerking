import React, { Component } from 'react'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Auxi from '../../hoc/Auxilliary/Auxilliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../api/axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { INGREDIENTS_ADD, INGREDIENTS_REMOVE } from '../../store/actions/actionTypes'
import { connect } from 'react-redux'
import { initIngredientsAsync } from '../../store/actions/burger'
import { purchaseOrderInit } from '../../store/actions'
export class BurgerBuilder extends Component {
    state = {
        showModal: false,
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    checkIsPurchasable = (ingredients) => {
        return ((Object.keys(ingredients)
            .map(ingredientKey => ingredients[ingredientKey])
            .reduce((accumulator, ingredientValue) => accumulator + ingredientValue, 0)
        ) <= 0) ? false : true
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
        const { isAuthenticated, purchaseOrderInit, history } = this.props
        if(isAuthenticated) {
            history.push('/auth')
        }

        purchaseOrderInit()
        history.push('/checkout')
    }

    render() {
        const { showModal } = this.state
        const { isAuthenticated, ingredients, error, totalPrice, onIngredientAdd, onIngredientRemove } = this.props

        const disabledStates = {}
        for(let key in ingredients) {
            disabledStates[key] = (ingredients[key] <= 0 ) ? true : false
        }

        let burgerComponentsOrSpinner = error ? <p>Ingredients can't be loaded</p> : <Spinner />
        let modalComponent = null

        if(ingredients) {
            const purchasable = this.checkIsPurchasable(ingredients)
            burgerComponentsOrSpinner = (
                <Auxi>
                    <Burger ingredients={ingredients}/>
                    <BuildControls 
                        isAuthenticated={isAuthenticated}
                        purchasable={purchasable}
                        totalPrice={totalPrice}
                        onAddIngredient={onIngredientAdd} 
                        onRemoveIngredient={onIngredientRemove}
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
        }

        return ( 
            <Auxi>
                <Modal show={showModal} onModalClose={this.closeModal}>
                    {modalComponent}
                </Modal>
                { burgerComponentsOrSpinner }
            </Auxi>
        )
    }
}

const mapStateToProps = ({ 
    burger: { ingredients, totalPrice, purchasable, error },
    auth: { token }
}) => ({
    ingredients,
    totalPrice,
    purchasable,
    error,
    isAuthenticated: token !== null
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdd: (ingredientName) => dispatch({type: INGREDIENTS_ADD, payload: {ingredientName}}),
    onIngredientRemove: (ingredientName) => dispatch({type: INGREDIENTS_REMOVE, payload: {ingredientName}}),
    onInitIngredients: () => dispatch(initIngredientsAsync()),
    purchaseOrderInit: () => dispatch(purchaseOrderInit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))