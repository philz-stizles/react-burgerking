import React, { Component } from 'react'
import Order from '../../components/Order/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { fetchOrdersAsync } from '../../store/actions/order'

class Orders extends Component {
    componentDidMount() {
        const { onFetchOrders, token } = this.props
        onFetchOrders(token)
    }

    render() {
        const { orders, loading } = this.props

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

const mapStateToProps = ({ order: { orders, loading, error }, auth: { token } }) => ({
    orders,
    token,
    loading,
    error
})

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(fetchOrdersAsync(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)