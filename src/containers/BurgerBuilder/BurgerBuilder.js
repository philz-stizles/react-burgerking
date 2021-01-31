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
class BurgerBuilder extends Component {
    state = {
        showModal: false,
        loading: false,
        error: false
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
        this.props.history.push('/checkout')
    }

    render() {
        const { showModal, loading, error } = this.state
        const { ingredients, totalPrice, onIngredientAdd, onIngredientRemove } = this.props
        const purchasable = this.checkIsPurchasable(ingredients)

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

            if(loading) {
                modalComponent = <Spinner />
            }
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

const mapStateToProps = ({ burger: { ingredients, totalPrice, purchasable } }) => ({
    ingredients,
    totalPrice,
    purchasable
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdd: (ingredientName) => dispatch({type: INGREDIENTS_ADD, payload: {ingredientName}}),
    onIngredientRemove: (ingredientName) => dispatch({type: INGREDIENTS_REMOVE, payload: {ingredientName}})
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))