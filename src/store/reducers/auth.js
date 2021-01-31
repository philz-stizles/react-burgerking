import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT } from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case AUTH_SUCCESS:
            const { userId, token } = payload
            return {
                ...state,
                loading: false,
                error: null,
                userId,
                token
            }
        case AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            }

        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state
    }
}

export default reducer