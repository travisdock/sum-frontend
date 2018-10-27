import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import {
    noRouterSignUp as ReduxWrappedSignup,
    nakedSignup as NakedSignup
} from '../../src/components/signup';

// Setup Store
const mockStore = configureStore();
const initialState = {current_user: {}}
const store = mockStore(initialState);

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
const mockResponse = (status, statusText, response) => {
    return new Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    });
};

describe('<SignUp /> with redux', () => {
    it('renders the component', () => {
        const wrapper = shallow(<ReduxWrappedSignup store={store}/>);
        const component = wrapper.dive();

        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('<Signup /> methods, without wrappers', () => {

    it('handleSubmit is fired on button click', () => {
        const spy = jest.spyOn(NakedSignup.prototype, "handleSubmit");
        const fetch = mockFetch({"cool": "yeah"})

        const component = shallow(
            <NakedSignup current_user={ userProp }/>
        );

        const signUpButton = component.find('button')
        const form = component.find('form')
        form.simulate('submit', { preventDefault () {} });

        expect(signUpButton.text()).toEqual('Sign up')
        expect(spy).toHaveBeenCalled();
    });

    it('responds with an error alert if errors on fetch', async (done) => {
        window.alert = jest.fn()

        const fakePromise = Promise.resolve(mockResponse(
            200,
            null,
           JSON.stringify({errors: "invalid username or password"})
        ));
        window.fetch = jest.fn().mockImplementationOnce(
            () => {
                return fakePromise
            }
        );
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

        const fakePromise = Promise.resolve(mockResponse(
            200,
            null,
           JSON.stringify({user: "user info here"})
        ));
        window.fetch = jest.fn().mockImplementationOnce(
            () => {
                return fakePromise
            }
        );
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
    
});