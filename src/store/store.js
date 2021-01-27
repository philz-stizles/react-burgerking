import { createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'

const middlewares = []
// const middlewares = [thunk] // Add thunk to be able to handle asyn calls

if(process.env.NODE_ENV === 'development') { // Log redux activity only in development
    middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store