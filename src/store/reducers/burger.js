import { INGREDIENTS_ADD, INGREDIENTS_REMOVE, INGREDIENTS_FETCH_SUCCESS, INGREDIENTS_FETCH_FAILURE } from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 0,
    purchasable: 0,
    error: null
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
        case INGREDIENTS_FETCH_SUCCESS:
            return {
                ...state,
                ingredients: {
                    salad: payload.salad,
                    bacon: payload.bacon,
                    cheese: payload.cheese,
                    meat: payload.meat
                },
                totalPrice: 0,
                error: null
            }
        case INGREDIENTS_FETCH_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}

export default reducer