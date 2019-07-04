import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { MoreMenu } from '../../components/MoreMenu'

const props = {
    logout: jest.fn(),
    history: {
        push: jest.fn()
    }
}

describe('renders snapshots', () => {
    test('renders open <MoreMenu/>', () => {
        const component = renderer.create(
            <MemoryRouter>
                <MoreMenu />
            </MemoryRouter>
        );
        component.root.children[0].children[0].instance.setState({ open: true })

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders closed <MoreMenu/>', () => {
        const component = renderer.create(<MoreMenu />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('correct functions fire on button clicks', () => {
    test('closeModal fires on Import CSV button click', () => {
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

    test('closeModal fires on Settings button click', () => {
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

    test('logout function fires on Logout button click', () => {
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
