import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login';


const userProps = {current_user: {user_id: 1}, history: {push: jest.fn()}};
const props = {current_user: {user_id: null}, login: jest.fn()};

// Mock fetches
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

it('renders a <Login /> snapshot', () => {
    const component = renderer.create(<Login {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('methods fire appropriately', () => {
    it('handleSubmit is fired on button click', async (done) => {
        expect.assertions(3);

        window.fetch = mockFetch({jwt: "jwt-token"})
        jest.spyOn(window.localStorage.__proto__, 'setItem');

        const component = await shallow(
            <Login {...props} />
        );
        const spy = jest.spyOn(component.instance(), "handleSubmit");
        // Have to spy this way because it is an arrow method
        component.update();
        component.instance().forceUpdate();

        const form = component.find('form')
        await form.simulate('submit', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
        await component.update();
        expect(window.localStorage.setItem).toHaveBeenCalledWith('jwt', 'jwt-token');
        expect(props.login).toHaveBeenCalled();
        done();
    });
    it('responds with an error alert if errors on fetch', async (done) => {
        expect.assertions(4);

        window.fetch = mockFetch({error: "error-message"})
        window.alert = jest.fn()

        const component = await shallow(
            <Login {...props} />
        );
        const spy = jest.spyOn(component.instance(), "handleSubmit");
        // Have to spy this way because it is an arrow method
        component.update();
        component.instance().forceUpdate();

        const form = component.find('form')
        await form.simulate('submit', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
        await component.update();
        expect(window.alert).toHaveBeenCalledWith('error-message')
        expect(component.state().username).toEqual('');
        expect(component.state().password).toEqual('');
        done();
    });
    it('updates state when form inputs change', () => {
        expect.assertions(2);

        const component = shallow(
            <Login {...props} />
        );
        const spy = jest.spyOn(component.instance(), "handleChange");
        // Have to spy this way because it is an arrow method
        component.update();
        component.instance().forceUpdate();
        
        const input = component.find('input').first()
        input.simulate('change', {target: {value: 'David', name: 'username'}});
        
        expect(spy).toHaveBeenCalled();
        expect(component.state().username).toEqual('David');
    });
    it('redirects given a user id', () => {
        expect.assertions(1);

        const wrapper = shallow(
            <Login {...userProps} />
        );

        expect(wrapper.find('Redirect')).toHaveLength(1);
    });
});