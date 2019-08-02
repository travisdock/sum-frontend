import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../components/Navbar'

jest.mock('../../components/MoreMenu', () => () => 'MoreMenu')

const userProps = {
    current_user: {
        user_id: 1
    },
    logout: jest.fn(),
    history: {
        push: jest.fn()
    }
}
const startProps = {
    current_user: {},
    logout: jest.fn(),
    history: {
        push: jest.fn()
    }
}

describe('renders snapshots', () => {
    test('renders user <Navbar />', () => {
        const component = renderer.create(
            <MemoryRouter>
                <Navbar {...userProps} />
            </MemoryRouter>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders startpage <Navbar />', () => {
        const component = renderer.create(
            <MemoryRouter>
                <Navbar {...startProps} />
            </MemoryRouter>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
