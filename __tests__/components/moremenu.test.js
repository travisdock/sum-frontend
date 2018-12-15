import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { NakedMoreMenu } from '../../src/components/MoreMenu';

// props for no redux
const historyProp = {push: jest.fn()}

describe('<MoreMenu />', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <NakedMoreMenu />
        );
        expect(toJson(component)).toMatchSnapshot();
    });

    it('functions are called at correct times', () => {
        const logoutSpy = jest.spyOn(NakedMoreMenu.prototype, "handleLogout");
        const openModalSpy = jest.spyOn(NakedMoreMenu.prototype, "openModal");
        const closeModalSpy = jest.spyOn(NakedMoreMenu.prototype, "closeModal");
        const logout = jest.fn()
        const component = shallow(
            <NakedMoreMenu logout={logout} history={historyProp} />
        );

        expect(component.find('button')).toHaveLength(2);
        let moreButton = component.find('button').at(0)
        let logoutButton = component.find('button').at(1)

        expect(component.state(['open'])).toBe(false);
        moreButton.simulate('click');
        expect(openModalSpy).toHaveBeenCalled();
        expect(component.state(['open'])).toBe(true);

        expect(component.find('NavLink')).toHaveLength(2);
        expect(component.find('NavLink').get(0).props.to).toBe('/dashboard/import');
        expect(component.find('NavLink').get(1).props.to).toBe('/dashboard/settings');

        component.find('NavLink').at(1).simulate('click')
        expect(closeModalSpy).toHaveBeenCalled();

        component.find('NavLink').at(0).simulate('click')
        expect(closeModalSpy).toHaveBeenCalled();

        logoutButton.simulate('click');
        expect(logoutSpy).toHaveBeenCalled();
    });
});