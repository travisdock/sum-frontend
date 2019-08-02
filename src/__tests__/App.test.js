import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { App } from '../App';

jest.mock('../containers/Dashboard', () => () => 'Dashboard')
jest.mock('../containers/Home', () => () => 'Home')
jest.mock('../components/Navbar', () => () => 'Navbar')

// Mock fetch
function mockFetch(data) {
    return jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

const userProps = {
    current_user: {user_id: 1},
    load: false,
    login: jest.fn(),
    logout: jest.fn()
};
const loadProps = {
    current_user: {user_id: null},
    load: true,
    login: jest.fn(),
    logout: jest.fn()
}
const noUserProps = {
    current_user: {user_id: null},
    load: false,
    login: jest.fn(),
    logout: jest.fn()
}

describe('Snapshots', () => {
    it('renders a <App/> snapshot with no user', () => {
        const component = renderer.create(<App {...noUserProps} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a <App/> snapshot with user, dashboard', () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={[ '/dashboard' ]}>
                <App {...userProps} />
            </MemoryRouter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a <App/> snapshot with user, home', () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={[ '/' ]}>
                <App {...userProps} />
            </MemoryRouter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a <App/> snapshot with load', () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={[ 'app.com/login' ]}>
                <App {...loadProps} />
            </MemoryRouter>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Routes correctly', () => {
    it('logs in returning user', async () => {
        window.fetch = mockFetch('success')
        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockImplementation(() => 1)

        const wrapper = await mount(
            <MemoryRouter initialEntries={[ 'app.com/login' ]}>
              <App {...userProps} />
            </MemoryRouter>
        );
        await wrapper.update();

        expect(userProps.login).toHaveBeenCalledWith('success');
    });

    it('logs out returning user', async () => {
        window.fetch = mockFetch({error: 'error'})
        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockImplementation(() => 1)

        const wrapper = await mount(
            <MemoryRouter initialEntries={[ 'app.com/login' ]}>
              <App {...userProps} />
            </MemoryRouter>
        );
        await wrapper.update();

        expect(userProps.logout).toHaveBeenCalled();
    });
 
    it('logs out by default', async () => {
        // jest.spyOn(window.localStorage.__proto__, 'getItem')
        //     .mockImplementation(() => null)

        const wrapper = await mount(
            <MemoryRouter initialEntries={[ 'app.com/login' ]}>
              <App {...userProps} />
            </MemoryRouter>
        );
        await wrapper.update();

        expect(userProps.logout).toHaveBeenCalled();
    });
});
