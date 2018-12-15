import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import Settings from '../../src/components/Settings';

// Setup Store
const mockStore = configureStore();
const userState = {current_user: {user_id: 1, year_view: 2018, years: [2018]}}
const userStore = mockStore(userState);
const noUserState = {current_user: {}};
const noUserStore = mockStore(noUserState);

describe ('<Settings />', () => {
    it('renders the component correctly', () => {
        const wrapper = shallow(<Settings store={ userStore }/>);
        const component = wrapper.dive();

        expect(toJson(component)).toMatchSnapshot();
    });
});