import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import Settings from '../../src/components/Settings';
const settingsHelpers = require('../../src/components/helpers/settingsHelpers')
const modalHelpers = require('../../src/components/helpers/modalHelpers')


// Setup Store
const mockStore = configureStore();
const userState = {current_user: {user_id: 1, categories: [{id: 1, name: "category_1"}, {id: 2, name: "category_2"}], year_view: 2018, years: [2018]}}
const userStore = mockStore(userState);
const newUserState = {current_user: {user_id: 2, categories: [], year_view: '', years: []}}
const newUserStore = mockStore(newUserState);


describe ('<Settings />', () => {
    it('renders the component correctly with user with data', () => {
        const wrapper = shallow(<Settings store={ userStore }/>);
        const component = wrapper.dive();

        expect(toJson(component)).toMatchSnapshot();
    });

    it('renders component correctly with new user, no data', () => {
        const wrapper = shallow(<Settings store={ newUserStore }/>);
        const component = wrapper.dive();

        expect(toJson(component)).toMatchSnapshot();
    });

    it('calls handleUserUpdate', () => {
        settingsHelpers.handleUserUpdate = jest.fn();

        const wrapper = shallow(<Settings store={ userStore }/>);
        const component = wrapper.dive();

        const button = component.find('button.year_view')
        button.simulate('click', {});
        
        expect(settingsHelpers.handleUserUpdate).toHaveBeenCalled();
    });

    it('calls askIfSure', () => {
        modalHelpers.askIfSure = jest.fn();

        const wrapper = shallow(<Settings store={ userStore }/>);
        const component = wrapper.dive();

        const button = component.find('button.delete_category')
        button.simulate('click', {});
        
        expect(modalHelpers.askIfSure).toHaveBeenCalled();
    });

    it('calls askIfSure', () => {
        modalHelpers.openUpdateModal = jest.fn();

        const wrapper = shallow(<Settings store={ userStore }/>);
        const component = wrapper.dive();

        const button = component.find('button.update_category')
        button.simulate('click', {});
        
        expect(modalHelpers.openUpdateModal).toHaveBeenCalled();
    });



});