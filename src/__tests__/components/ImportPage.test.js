import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { ImportPage } from '../../components/ImportPage'


// Mock fetch
function mockFetch(data) {
    return jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

const successResponse = {
    message: "this is a message",
    user: "this is a user"
}

// Mock props
const props = {
    current_user: {user_id: 1},
    updateUser: jest.fn()
};

describe('renders snapshots', () => {
    test('renders <ImportPage/>', () => {
        const component = renderer.create(<ImportPage {...props} />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders loader', () => {
        const component = renderer.create(<ImportPage {...props} />);
        component.root.instance.setState({ loading: true })

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('methods fire appropriately', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });

    test('submits file on button click', async () => {
        expect.assertions(6);

        const handleSubmit = jest.spyOn(ImportPage.prototype, "handleSubmit");
        window.fetch = mockFetch(successResponse);
        window.alert = jest.fn()
        
        const component = await shallow(<ImportPage {...props} />);

        const form = component.find('form')
        await form.simulate('submit', {
            preventDefault: () => {},
            target: {
               0: {
                    files: ['dummy']
               }
            }
        });
        
        expect(handleSubmit).toHaveBeenCalled();
        expect(window.fetch).toHaveBeenCalled();
        expect(component.state().loading).toEqual(true);
        await component.update();
        expect(window.alert).toHaveBeenCalledWith('this is a message');
        expect(component.state().loading).toEqual(false);
        expect(props.updateUser).toHaveBeenCalled();
        // https://medium.com/@wvm/asynchronous-api-testing-in-react-cf3b180bc3d
    });
});
