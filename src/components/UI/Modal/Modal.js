import React, { Component } from 'react'
import './Modal.css'
import Backdrop from './../../../components/UI/Backdrop/Backdrop'
import Auxi from '../../../hoc/Auxilliary/Auxilliary'

class Modal extends Component {

    // Optimization - to prevent unnecessary re-rendering
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show || this.props.children !== nextProps.children
    }

    render() {
        const { show, children, onModalClose } = this.props
        console.log(show)

        return (
            <Auxi>
                <Backdrop show={show} clicked={onModalClose}/>
                <div className="Modal" style={{
                    transform: (show) ? 'translateY(0)' : 'translateY(-100vh)' ,
                    opacity: (show) ? '1' : '0'
                }}>
                    {children}
                </div>
            </Auxi>
        )
    }
}

export default Modal