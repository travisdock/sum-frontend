import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import {
    noRouterSignUp as ReduxWrappedSignup,
    nakedSignup as NakedSignup
} from '../../src/components/signup';

// Setup Store
const mockStore = configureStore();
const userState = {current_user: {user_id: 1}}
const userStore = mockStore(userState);
const noUserState = {current_user: {}};
const noUserStore = mockStore(noUserState);

// props for no redux
const userProp = {user_id: null}
const historyProp = {push: jest.fn()}

// Mock fetches
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

describe('<SignUp /> with redux', () => {
    it('renders the component correctly', () => {
        const wrapper = shallow(<ReduxWrappedSignup store={noUserStore}/>);
        const component = wrapper.dive();

        expect(component.find('Redirect')).toHaveLength(0);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Signup /> methods, without wrappers', () => {

    it('handleSubmit is fired on button click', async (done) => {
        const spy = jest.spyOn(NakedSignup.prototype, "handleSubmit");
        window.fetch = mockFetch({errors: "yeah"})
        window.alert = jest.fn()

        const component = shallow(
            <NakedSignup current_user={ userProp } />
        );

        const signUpButton = component.find('button')
        const form = component.find('form')
        await form.simulate('submit', { preventDefault () {} });

        
        setImmediate(() => {
            try {
                expect(signUpButton.text()).toEqual('Sign up')
                expect(spy).toHaveBeenCalled();
            } catch (e) {
                done.fail(e);
            }
            done();
        });
    });

    it('responds with an error alert if errors on fetch', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({errors: "invalid username or password"})

        expect.assertions(1);

        const component = shallow(
            <NakedSignup current_user={ userProp }/>
        );

        const form = component.find('form')
        await form.simulate('submit', { preventDefault () {} });

        setImmediate(() => {
            try {
                expect(window.alert).toHaveBeenCalledWith('invalid username or password');
            } catch (e) {
                done.fail(e);
            }
            done();
        });
    });

    it('responds with sucess message if fetch response has no errors', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({"success": "Success! Please log in."})
        
        expect.assertions(1);

        const component = shallow(
            <NakedSignup current_user={userProp} history={historyProp} />
        );

        const form = component.find('form')
        await form.simulate('submit', { preventDefault () {} });

        setImmediate(() => {
            try {
                expect(window.alert).toHaveBeenCalledWith('Success! Please log in.');
            } catch (e) {
                done.fail(e);
            }
            done();
        });
    });

    it('updates state when form inputs change', () => {

        const spy = jest.spyOn(NakedSignup.prototype, "handleChange");
        const component = shallow(
            <NakedSignup current_user={userProp} history={historyProp} />
        );
        
        const input = component.find('input').first()
        input.simulate('change', {target: {value: 'David', name: 'username'}});
        
        expect(spy).toHaveBeenCalled();
        expect(component.state().username).toEqual('David');
    });
    
    it('given a user it redirects', () => {
        const wrapper = shallow(
            <ReduxWrappedSignup store={userStore} />
        );

        expect(wrapper.dive().find('Redirect')).toHaveLength(1);
    });
});