import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOGOUT, AUTH_SET_REDIRECT_PATH } from './actionTypes'
import axios from 'axios'

const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:'

const authStart = () => {
    return {
        type: AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        payload: { token, userId }
    }
}

const authFailure = (error) => {
    return {
        type: AUTH_FAILURE,
        payload: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT
    }
}

const setAuthTimeoutAsync = (expiresInMilliseconds) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresInMilliseconds)
    }
}

export const authenticateAsync = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = `${baseUrl}signUp?key=AIzaSyBFl7EoYEm4-ShideBuzO4lPUyz50ICmY0`
        if (!isSignup) {
            url = `${baseUrl}signInWithPassword?key=AIzaSyBFl7EoYEm4-ShideBuzO4lPUyz50ICmY0`
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expiresInMilliseconds = response.data.expiresIn * 1000
            const expirationDate = new Date(new Date().getTime() + expiresInMilliseconds);

            // Store auth credentials in local storage
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);

            // Store credentials in redux
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(setAuthTimeoutAsync(expiresInMilliseconds))
        })
        .catch(err => {
            console.log(err.message)
            if(err.response){
                dispatch(authFailure(err.response.data.error));
            } else {
                dispatch(authFailure(err));
            }
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = localStorage.getItem('expirationDate')
            const currentDate = new Date()
            if(expirationDate >  currentDate) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                const expiresInMilliseconds = expirationDate.getTime() - currentDate.getTime()
                dispatch(setAuthTimeoutAsync(expiresInMilliseconds))
            } else {
                dispatch(logout())
            }
        }
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: AUTH_SET_REDIRECT_PATH,
        payload: path
    }
}