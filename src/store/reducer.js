import { INGREDIENTS_ADD, INGREDIENTS_REMOVE } from './types'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case INGREDIENTS_ADD:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1
                }
            }
        case INGREDIENTS_REMOVE:
            const { ingredients } = state
            const currentValue = ingredients[payload.ingredientName]
            return {
                ...state,
                ingredients: {
                    ...ingredients,
                    [payload.ingredientName]: (currentValue > 0) ? (currentValue - 1) : 0
                }
            }
        default:
            return state
    }
}

export default reducer