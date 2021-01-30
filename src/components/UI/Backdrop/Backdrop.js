import React from 'react'
import Radium from 'radium'

const backdropStyle = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: 100,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
}

export const Backdrop = ({ show, clicked }) => (
    show ? <div className="Backdrop" style={backdropStyle} onClick={clicked}></div> : null
)

export default Radium(Backdrop)
