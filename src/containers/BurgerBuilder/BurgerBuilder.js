import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Auxi from './../../hoc/Auxi'

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 2,
            bacon: 3,
            cheese: 1,
            meat: 1
        }
    }

    render() {
        const { ingredients } = this.state
        return (
            <Auxi>
                <div><Burger ingredients={ingredients}/></div>
                <div>Burger Controls</div>
            </Auxi>
        )
    }
}

export default BurgerBuilder