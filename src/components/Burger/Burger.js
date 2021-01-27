import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    const { ingredients } = props
    const transformedIngredients = Object.keys(ingredients).map(ingredient => {
        return [...Array(ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient key={`${ingredient}${i}`} type={ingredient} />
        })
    })
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger