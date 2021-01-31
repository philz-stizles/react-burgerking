import React from 'react'
import { shallow } from 'enzyme'
import { BurgerBuilder } from './BurgerBuilder'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'

describe('<BurgerBuilders />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />)
    })

    it('should render <BurgerBuilder />', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    it('should render <BuildControls /> when ingredients exist', () => {
        wrapper.setProps({ingredients: {}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })

    // it('should render one <Burger />', () => {
    //     expect(wrapper.find(Burger)).toHaveLength(1)
    // })

    // it('has initial state', () => {
    //     expect(wrapper.state()).toEqual({
    //         ingredients: {
    //             salad: 0,
    //             bacon: 0,
    //             cheese: 0,
    //             meat: 0
    //         },
    //         totalPrice: 0,
    //         purchasable: false,
    //         showModal: false,
    //         loading: false
    //     })
    // })

    // it('initial state', () => {
    //     expect(wrapper.state()).toEqual({
    //     })
    // })
})