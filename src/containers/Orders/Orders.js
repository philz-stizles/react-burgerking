import React, { Component } from 'react'
import axios from './../../api/axios-orders'
import Order from '../../components/Order/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        console.log('here')
        axios.get('/orders.json')
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

                this.setState({
                    orders: flattenedData,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render() {
        const { orders, loading } = this.state

        let ordersOrSpinner = <Spinner />

        if(!loading) {
            ordersOrSpinner = orders.map((order, i) => {
                return <Order key={i} {...order}/>
            })
        }

        return (
            <div>
                { ordersOrSpinner }
            </div>
        )
    }
}

export default Orders