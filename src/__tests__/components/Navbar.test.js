import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Navbar } from '../../components/Navbar'
import MoreMenu from '../../components/MoreMenu'

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

xdescribe('correct functions fire on button clicks', () => {
    xtest('openModal fires on Import CSV button click', () => {
        const component = renderer.create(
            <MemoryRouter>
                <Navbar {...startProps} />
            </MemoryRouter>
        );

        component.root.findAllByProps({href: "/signup"}).simulate('click')

    });

    xtest('closeModal fires on Import CSV button click', () => {
        const component = mount(
            <MemoryRouter>
                <MoreMenu />
            </MemoryRouter>
        );

        const menu = component.find('MoreMenu').at(0)
        menu.setState({open: true})

        expect(menu.state()).toEqual({open:true})
        component.find('[href="/dashboard/import"]').at(0).simulate('click')
        expect(menu.state()).toEqual({open:false})
    });

    xtest('closeModal fires on Settings button click', () => {
        const component = mount(
            <MemoryRouter>
                <MoreMenu />
            </MemoryRouter>
        );

        const menu = component.find('MoreMenu').at(0)
        menu.setState({open: true})

        expect(menu.state()).toEqual({open:true})
        component.find('[href="/dashboard/settings"]').at(0).simulate('click')
        expect(menu.state()).toEqual({open:false})
    });

    xtest('logout function fires on Logout button click', () => {
        const component = mount(
            <MemoryRouter>
                <MoreMenu {...props} />
            </MemoryRouter>
        );

        const menu = component.find('MoreMenu').at(0)
        menu.setState({open: true})

        component.find('button.more').at(1).simulate('click');
        expect(props.logout).toHaveBeenCalled();
        expect(props.history.push).toHaveBeenCalled();
    });
});
