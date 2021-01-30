import React from 'react'
import { shallow } from 'enzyme'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

describe('<NavigationItems />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItems /> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three <NavigationItems /> if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({
            isAuthenticated: true
        })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
})