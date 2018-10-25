import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import { noRouterSignUp as Signup } from '../../src/components/signup';

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: {}}
const store = mockStore(initialState);


describe('<SignUp />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<Signup store={store}/>);
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        });
    });
    describe('onClick() signup button', () => {
        test('successfully calls the onClick handler', () => {
            const mockOnClick = jest.fn();
            const wrapper = shallow(
                <Signup handleSubmit={mockOnClick} store={store}/>
            );
            const component = wrapper.dive();
            const signUpButton = component.find('button')
            // signUpButton.simulate('click');
            const form = component.find('form')
            form.simulate('submit')

            expect(signUpButton.text()).toEqual('Sign up')
            expect(mockOnClick.mock.calls.length).toEqual(1);
        });
    });
});