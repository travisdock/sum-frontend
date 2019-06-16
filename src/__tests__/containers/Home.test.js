import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router';
import { Home } from '../../containers/Home';

jest.mock('../../components/Login');
jest.mock('../../components/Signup');

const props = {
    current_user: {user_id: null},
    match: {isExact: true, url: "app.com/"},
};

describe('Routes correctly', () => {
    it('accurately routes to Login page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/login' ]}>
              <Home {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Login')).toHaveLength(1);
        expect(wrapper.find('Signup')).toHaveLength(0);
        expect(wrapper.find('About')).toHaveLength(0);
    });
    it('accurately routes to Signup page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/signup' ]}>
              <Home {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Signup')).toHaveLength(1);
        expect(wrapper.find('Login')).toHaveLength(0);
        expect(wrapper.find('About')).toHaveLength(0);
    });
    it('accurately routes to About page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/about' ]}>
              <Home {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('About')).toHaveLength(1);
        expect(wrapper.find('Signup')).toHaveLength(0);
        expect(wrapper.find('Login')).toHaveLength(0);
    });
    it('homepage defaults to Signup', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/' ]}>
              <Home {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Signup')).toHaveLength(1);
        expect(wrapper.find('About')).toHaveLength(0);
        expect(wrapper.find('Login')).toHaveLength(0);
    });
    it('redirects if userid is present', () => {
        const props = {
            current_user: {user_id: 1},
            match: {isExact: true, url: "app.com/"},
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/' ]}>
              <Home {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('About')).toHaveLength(0);
        expect(wrapper.find('Signup')).toHaveLength(0);
        expect(wrapper.find('Login')).toHaveLength(0);
        expect(wrapper.containsMatchingElement(<Redirect to="/dashboard/form" />)).toEqual(true)
    });
});
