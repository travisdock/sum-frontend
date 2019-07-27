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

// Mock document
const documentMock = [{value: 'categoryOne'}]
const noCatDocumentMock = [{value: ''}]

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

const updateCategoryForm = {
    preventDefault: jest.fn(),
    target: {
        form: {
            elements: [
                { name: 'year_view', value: '100'}
            ]
        }
    }
}

afterEach(() => {
    jest.clearAllMocks();
});

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
    test('handleUserUpdate is fired on button click', async () => {
        const spy = jest.spyOn(SettingsHelpers, 'handleUserUpdate')
        window.fetch = mockFetch('success')
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);

        const button = component.find('.year_view')
        await button.simulate('click', updateUserForm);
        await component.update(); //I don't know why this is necessary but it is....

        expect(spy).toHaveBeenCalled();
        expect(props.updateUser).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Success!')        
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

describe('settingsHelpers openModal tests', () => {
    test('openModal ask', () => {
        jest.spyOn(global.document, 'getElementsByName').mockReturnValue(documentMock)

        const component = shallow(<Settings {...props} />);
        component.state().open = 'ask'
        component.instance().openModal();

        expect(component.state().form).toEqual({id: 1, name: "categoryOne"})
    });
    test('openModal update', () => {
        jest.spyOn(global.document, 'getElementsByName').mockReturnValue(documentMock)

        const component = shallow(<Settings {...props} />);
        component.state().open = 'update'
        component.instance().openModal();
        
        expect(component.state().form).toEqual({id: 1, name: "categoryOne"})
    });
    test('openModal error', () => {
        jest.spyOn(global.document, 'getElementsByName').mockReturnValue(noCatDocumentMock)
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);
        component.state().open = ''
        component.instance().openModal();
        component.update();

        expect(component.state().open).toEqual(false)
        expect(window.alert).toHaveBeenCalledWith('No category selected')
    });
});

describe('settingsHelpers handleCategoryUpdate tests', () => {
    test('handleCategoryUpdate success', async () => {
        const spy = jest.spyOn(ModalHelpers, 'closeModal')
        window.fetch = mockFetch('success')
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);
        component.state().form = { id: 1, name: "categoryOne" }
        await component.instance().handleCategoryUpdate(updateCategoryForm);
        await component.update();

        expect(props.updateUser).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Success!')
        expect(spy).toHaveBeenCalled();
    });
    test('handleCategoryUpdate error', async () => {
        const spy = jest.spyOn(ModalHelpers, 'closeModal')
        window.fetch = mockFetch({errors: 'error'})
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);
        component.state().form = { id: 1, name: "categoryOne" }
        await component.instance().handleCategoryUpdate(updateCategoryForm);
        await component.update();

        expect(props.updateUser).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('error')
        expect(spy).toHaveBeenCalled();
    });
});

describe('settingsHelpers handleDelete tests', () => {
    test('handleDelete success', async () => {
        const spy = jest.spyOn(ModalHelpers, 'closeModal')
        window.fetch = mockFetch('success')
        window.alert = jest.fn()

        const component = shallow(<Settings {...props} />);
        component.state().form = { id: 1, name: "categoryOne" }
        await component.instance().handleDelete(updateCategoryForm);
        await component.update();

        expect(props.updateUser).toHaveBeenCalledWith('success');
        expect(window.alert).toHaveBeenCalledWith('Success!')
        expect(spy).toHaveBeenCalled();
    });
});
