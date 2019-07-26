import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Settings } from '../../components/Settings'
import * as SettingsHelpers from '../../components/helpers/settingsHelpers';
import * as ModalHelpers from '../../components/helpers/modalHelpers';

jest.mock('../../components/AreYouSure', () => () => 'AreYouSure')
jest.mock('../../components/UpdateCategory', () => () => 'UpdateCategory')

// Mock fetch
function mockFetch(data) {
    return jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

const props = {
    updateUser: jest.fn(),
    current_user: {
        user_id: 1,
        year_view: '2020',
        years: ['2018', '2019', '2020'],
        categories: [
            {
                id: 1,
                name: "categoryOne"
            },
            {
                id: 2,
                name: "categoryTwo"
            }
        ]
    }
};

const noInfoProps = {
    current_user: {
        user_id: 1,
        year_view: '2020',
        years: []
    }
};

const updateUserForm = {
    preventDefault: jest.fn(),
    target: {
        form: {
            elements: [
                { name: 'year_view', value: '100'}
            ]
        }
    }
}

describe('renders snapshots', () => {
    test('renders user <Settings />', () => {
        const component = renderer.create(
            <Settings {...props} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders user <Settings /> without categories', () => {
        const component = renderer.create(
            <Settings {...noInfoProps} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('calls methods on button clicks', () => {
    test('handleUserUpdate is fired on button click', () => {
        const spy = jest.spyOn(SettingsHelpers, 'handleUserUpdate')
        window.fetch = mockFetch('success')
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);

        const button = component.find('.year_view')
        button.simulate('click', updateUserForm);

        expect(spy).toHaveBeenCalled();
    });

    test('askIfSure is fired on button click', () => {
        const spy = jest.spyOn(ModalHelpers, 'askIfSure')

        const component = shallow(<Settings {...props} />);

        const button = component.find('.delete_category')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
        expect(component.state().open).toEqual('ask')
    });

    test('openUpdateModal is fired on button click', () => {
        const spy = jest.spyOn(ModalHelpers, 'openUpdateModal')

        const component = shallow(<Settings {...props} />);

        const button = component.find('.update_category')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
        expect(component.state().open).toEqual('update')
    });
});

xdescribe('modalHelpers tests', () => {
    test('openUpdateModal sets state', () => {
        const spy = jest.spyOn(ModalHelpers, 'openUpdateModal')

        const component = shallow(<Settings {...props} />);

        const button = component.find('.update_category')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });
});