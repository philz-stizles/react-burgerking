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
import { purchaseOrderInit, setAuthRedirectPath } from '../../store/actions'
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

    purchaseOrderHandler = () => {
        const { isAuthenticated, history, onSetAuthRedirectPath } = this.props

        if (isAuthenticated) {
            this.setState({ showModal: !this.state.showModal })
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
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
        const { purchaseOrderInit, history } = this.props

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
                        onPurchaseOrder={this.purchaseOrderHandler}
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
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))