import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import burgerReducer from './reducers/burger'
import orderReducer from './reducers/order'
import authReducer from './reducers/auth'

const middlewares = [thunk] // Add thunk to be able to handle asyn calls

if(process.env.NODE_ENV === 'development') { // Log redux activity only in development
    // middlewares.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer
}), /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middlewares)
))

export default store