import { INGREDIENTS_ADD, INGREDIENTS_REMOVE } from '../actions/actionTypes'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0,
    purchasable: 0
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case INGREDIENTS_ADD:
            const { ingredients } = state
            const { ingredientName } = payload

            return {
                ...state,
                ingredients: {
                    ...ingredients,
                    [ingredientName]: state.ingredients[ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
            }
        case INGREDIENTS_REMOVE:
            const currentValue = state.ingredients[payload.ingredientName]
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [payload.ingredientName]: (currentValue > 0) ? (currentValue - 1) : 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredientName]
            }
        default:
            return state
    }
}

export default reducer