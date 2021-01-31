import { INGREDIENTS_FETCH_START, INGREDIENTS_FETCH_SUCCESS, INGREDIENTS_FETCH_FAILURE } from './actionTypes'
import axios from '../../api/axios-orders'

// const fetchIngredientsStart = () => {
//     return {
//         type: INGREDIENTS_FETCH_START
//     }
// }

const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: INGREDIENTS_FETCH_SUCCESS,
        payload: ingredients
    }
}

const fetchIngredientsFailure = (error) => {
    return {
        type: INGREDIENTS_FETCH_FAILURE,
        payload: error
    }
}

export const initIngredientsAsync = (token) => {
    return dispatch => {
        // dispatch(fetchIngredientsStart())
        axios.get(`/ingredients.json`)
            .then(response => {
                let data = {}
                console.log(response)
                if(!response.data){
                    console.log('No data', response.data)
                } else {
                    data = response.data
                }

                dispatch(fetchIngredientsSuccess(data))
            })
            .catch(error => {
                console.log(error.message)
                if(error.response){
                    dispatch(fetchIngredientsFailure(error.response.data.error));
                } else {
                    dispatch(fetchIngredientsFailure(error));
                }
            })
    }
}