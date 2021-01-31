import { 
    ORDERS_FETCH_START, ORDERS_FETCH_SUCCESS, ORDERS_FETCH_FAILURE,
    ORDER_PURCHASE_START, ORDER_PURCHASE_INIT, ORDER_PURCHASE_SUCCESS, ORDER_PURCHASE_FAILURE
} from './actionTypes'
import axios from '../../api/axios-orders'

const purchaseOrderStart = () => {
    return {
        type: ORDER_PURCHASE_START
    }
}

const purchaseOrderSuccess = (newOrder) => {
    return {
        type: ORDER_PURCHASE_SUCCESS,
        payload: newOrder
    }
}

const purchaseOrderFailure = (error) => {
    return {
        type: ORDER_PURCHASE_FAILURE,
        payload: error
    }
}

export const purchaseOrderInit = () => {
    return {
        type: ORDER_PURCHASE_INIT
    }
}

export const purchaseOrderAsync = (orderData, token) => {
    console.log(token, orderData)
    return dispatch => {
        dispatch(purchaseOrderStart())
        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                console.log(response)
                dispatch(purchaseOrderSuccess({
                    ...orderData,
                    id: response.data.name,
                }))
            })
            .catch(error => {
                console.log(error.message)
                if(error.response){
                    dispatch(purchaseOrderFailure(error.response.data.error));
                } else {
                    dispatch(purchaseOrderFailure(error));
                }
            })
    }
}

const fetchOrdersStart = () => {
    return {
        type: ORDERS_FETCH_START
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: ORDERS_FETCH_SUCCESS,
        payload: orders
    }
}

const fetchOrdersFailure = (error) => {
    return {
        type: ORDERS_FETCH_FAILURE,
        payload: error
    }
}

export const fetchOrdersAsync = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get(`/orders.json?auth=${token}`)
            .then(response => {
                let flattenedData = []
                console.log(response)
                if(!response.data){
                    console.log('No data', response.data)
                } else {
                    const data = response.data
                    flattenedData = Object.keys(data)
                        .map(key => {
                            return {
                                id: key,
                                ...data[key]
                            }
                        })
                    console.log(flattenedData)
                }

                dispatch(fetchOrdersSuccess(flattenedData))
            })
            .catch(error => {
                console.log(error.message)
                if(error.response){
                    dispatch(fetchOrdersFailure(error.response.data.error));
                } else {
                    dispatch(fetchOrdersFailure(error));
                }
            })
    }
}

// Using getState
// export const fetchOrdersAsync = () => {
//     return (dispatch, getState ) => {
//         dispatch(fetchOrdersStart())
//         axios.get(`/orders.json?auth=${token}`)
//             .then(response => {
//                 let flattenedData = []
//                 console.log(response)
//                 if(!response.data){
//                     console.log('No data', response.data)
//                 } else {
//                     const data = response.data
//                     flattenedData = Object.keys(data)
//                         .map(key => {
//                             return {
//                                 id: key,
//                                 ...data[key]
//                             }
//                         })
//                     console.log(flattenedData)
//                 }

//                 dispatch(fetchOrdersSuccess(flattenedData))
//             })
//             .catch(error => {
//                 console.log(error.message)
//                 if(error.response){
//                     dispatch(fetchOrdersFailure(error.response.data.error));
//                 } else {
//                     dispatch(fetchOrdersFailure(error));
//                 }
//             })
//     }
// }