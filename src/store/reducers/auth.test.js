import { AUTH_FAILURE, AUTH_START, AUTH_SUCCESS } from '../actions/actionTypes'
import reducer from './auth'

describe('Auth Reducer />', () => {
    let initialState 
    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            loading: false,
            error: null
        }
    })

    it('should return initial state', () => {
        expect(reducer(initialState, {})).toEqual(initialState)
    })

    it('should change loading state to true AUTH_START', () => {
        expect(reducer(initialState, {type: AUTH_START})).toEqual({
            token: null,
            userId: null,
            loading: true,
            error: null
        })
    })

    it('should set auth credentials on AUTH_SUCCESS', () => {
        const updatedState = reducer(initialState, {type: AUTH_SUCCESS, payload: { userId: 333, token: 'eiitppr' }})
        const expectedState = {
            token: 'eiitppr',
            userId: 333,
            loading: false,
            error: null
        }
        expect(updatedState).toEqual(expectedState)
    })

    it('should set auth error on AUTH_FAILURE', () => {
        const updatedState = reducer(initialState, {type: AUTH_FAILURE, payload: { message: 'Error' }})
        const expectedState = {
            token: null,
            userId: null,
            loading: false,
            error: { message: 'Error' }
        }
        expect(updatedState).toEqual(expectedState)
    })

})