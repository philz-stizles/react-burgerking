import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, AUTH_SET_REDIRECT_PATH } from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
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
        case AUTH_SET_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: payload
            }
        default:
            return state
    }
}

export default reducer