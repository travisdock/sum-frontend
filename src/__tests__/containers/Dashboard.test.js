import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Redirect } from 'react-router';
import { Dashboard } from '../../containers/Dashboard';

jest.mock('../../components/InputForm');
jest.mock('../../components/Chart');
jest.mock('../../components/Table');
jest.mock('../../components/ImportPage');
jest.mock('../../components/Settings');

const props = {
    current_user: {user_id: 1},
    match: {isExact: true, url: "app.com/dashboard"},
};

describe('Routes correctly', () => {
    it('accurately routes to InputForm page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/form' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('InputForm')).toHaveLength(1);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
    });
    it('accurately routes to Chart page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/charts' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Chart')).toHaveLength(1);
        expect(wrapper.find('InputForm')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
    });
    it('accurately routes to Table page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/entries' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Table')).toHaveLength(1);
        expect(wrapper.find('InputForm')).toHaveLength(0);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
    });
    it('accurately routes to Import page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/import' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('ImportPage')).toHaveLength(1);
        expect(wrapper.find('InputForm')).toHaveLength(0);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
    });
    it('accurately routes to Import page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/settings' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('Settings')).toHaveLength(1);
        expect(wrapper.find('InputForm')).toHaveLength(0);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
    });
    it('defaults to Input page if no path', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('InputForm')).toHaveLength(1);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
    });
    it('redirects to login if userid is not present', () => {
        const props = {
            current_user: {user_id: null},
            match: {isExact: true, url: "app.com/dashboard"},
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={[ 'app.com/dashboard/' ]}>
              <Dashboard {...props} />
            </MemoryRouter>
        );

        expect(wrapper.find('InputForm')).toHaveLength(0);
        expect(wrapper.find('Chart')).toHaveLength(0);
        expect(wrapper.find('Table')).toHaveLength(0);
        expect(wrapper.find('Settings')).toHaveLength(0);
        expect(wrapper.find('ImportPage')).toHaveLength(0);
        expect(wrapper.containsMatchingElement(<Redirect to="/login" />)).toEqual(true)
    });
});
