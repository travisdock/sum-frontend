import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import { noRouterSignUp as Signup, nakedSignup as NakedSignup } from '../../src/components/signup';

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: {}}
const store = mockStore(initialState);

// Mock fetch
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }


describe('<SignUp />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<Signup store={store}/>);
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        });
    });
});

describe('<Signup /> methods, without wrappers', () => {
    it('handleSubmit is fired on button click', () => {
        const spy = jest.spyOn(NakedSignup.prototype, "handleSubmit");
        const props = {user_id: null}
        const fetch = mockFetch({"cool": "yeah"})
        const component = mount(
            <NakedSignup current_user={ props }/>
        );
        const signUpButton = component.find('button')
        signUpButton.simulate('submit');

        expect(signUpButton.text()).toEqual('Sign up')
        expect(spy).toHaveBeenCalled();
    });
});

// I cannot spy on instance methods because of the redux wrapped component.
// I have to figure out how to do this without redux unfortunately...
// Ok, make different tests for each thing. Like a test for only instance methods
//          will (probably?) not need redux or router so don't import them...
//          So only import them if you are testing them specifically..