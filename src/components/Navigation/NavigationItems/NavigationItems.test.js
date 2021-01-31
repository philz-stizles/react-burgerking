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
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render <NavigationItem link="/logout">Logout</NavigationItem> if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })

    it('should not render <NavigationItem link="/logout">Logout</NavigationItem> if authenticated', () => {
        wrapper.setProps({isAuthenticated: false})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(false)
    })
})