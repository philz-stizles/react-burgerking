import React from 'react'
// import Radium from 'radium'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    const { ingredients } = props
    let transformedIngredients = Object.keys(ingredients).map(ingredient => {
        return [...Array(ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient key={`${ingredient}${i}`} type={ingredient} />
        })
    })

    const totalIngredients = transformedIngredients.reduce((accumulator, item) => {
        return accumulator + item.length
    }, 0)

    if(totalIngredients <= 0) {
        transformedIngredients = <p>Please start adding incredients</p>
    }
    
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger