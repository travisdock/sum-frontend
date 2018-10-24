import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import { Signup } from '../../src/components/signup';

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: { user_id: 1 }}
const store = mockStore(initialState);


describe('<SignUp />', () => {
    describe('render()', () => {
            test('renders the component', () => {
                const wrapper = shallow(<Signup store={store}/>);
                const component = wrapper.dive();

                expect(toJson(component)).toMatchSnapshot();
        });
    });
    // describe('onClick() signup button', () => {
    //     test('successfully calls the onClick handler', () => {
    //         const mockOnClick = jest.fn();
    //         const wrapper = shallow(
    //             <Signup onClick={mockOnClick} label="Eat Food" />
    //         );
    //         const component = wrapper.dive();

    //         component.find('button').simulate('click');

    //         expect(mockOnClick.mock.calls.length).toEqual(1);
    //     });
    // });
});