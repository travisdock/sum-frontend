import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components
import { MemoryRouter, NavLink } from 'react-router';

import Navbar from '../../src/components/navbar';

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: {}}
const store = mockStore(initialState);

// props for no redux
const userProp = {user_id: null}
const historyProp = {push: jest.fn()}

describe('Navbar', () => {
    it('renders the component', () => {
        const wrapper = mount(
            <MemoryRouter 
              // this fakes the key in history to be testKey every time so it doesn't mess
              // up the snapshot.
              // https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
              initialEntries={[ { pathname: '/', key: 'testKey' } ]}
            >
                <Navbar store={store} current_user={userProp} />
            </MemoryRouter>
        );


        expect(toJson(wrapper)).toMatchSnapshot();
        // expect(wrapper.find(NavLink).props().to).toBe('/login');
    });
});