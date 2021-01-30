import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxi from '../Auxilliary/Auxilliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {  //Recomended to be in the constructor
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            const { error } = this.state

            return (
                <Auxi>
                    <Modal show={error} onModalClose={this.errorConfirmedHandler}>
                        {!error ? null : error.message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxi>
            )
        }
    }
}

export default withErrorHandler