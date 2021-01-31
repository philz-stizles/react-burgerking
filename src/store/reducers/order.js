import { 
    ORDERS_FETCH_START, ORDERS_FETCH_SUCCESS, ORDERS_FETCH_FAILURE,
    ORDER_PURCHASE_START, ORDER_PURCHASE_INIT, ORDER_PURCHASE_SUCCESS, ORDER_PURCHASE_FAILURE
} from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case ORDER_PURCHASE_START:
            return {
                ...state,
                loading: true,
            }
        case ORDER_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(payload)
            }
        case ORDER_PURCHASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case ORDER_PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case ORDERS_FETCH_START:
            return {
                ...state,
                loading: true
            }
        case ORDERS_FETCH_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false
            }
        case ORDERS_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export default reducer