import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Settings } from '../../components/Settings'
import * as SettingsHelpers from '../../components/helpers/settingsHelpers';
import * as ModalHelpers from '../../components/helpers/modalHelpers';

jest.mock('../../components/AreYouSure', () => () => 'AreYouSure')
jest.mock('../../components/UpdateCategory', () => () => 'UpdateCategory')

const props = {
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
        years: [],
        categories: []
    }
};

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
            .mockImplementationOnce(() => {});

        const component = shallow(<Settings {...props} />);

        const button = component.find('.year_view')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });

    test('askIfSure is fired on button click', () => {
        const spy = jest.spyOn(ModalHelpers, 'askIfSure')
            .mockImplementationOnce(() => {});

        const component = shallow(<Settings {...props} />);

        const select = component.find('[name="delete_category"]')
        select.simulate('change', {target: {value: 'categoryOne'}})


        // Currently I am trying to get the select to change so that maybe 
        // coveralls will acknowledge that it is being manipulated in tests
        // My only other idea is to call the openmodal function manually to
        // test this

        const button = component.find('.delete_category')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });

    test('openUpdateModal is fired on button click', () => {
        const spy = jest.spyOn(ModalHelpers, 'openUpdateModal')
            .mockImplementationOnce(() => {});

        const component = shallow(<Settings {...props} />);

        const button = component.find('.update_category')
        button.simulate('click', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });
});
