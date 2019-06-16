import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Signup } from '../../components/Signup';


const userProps = {current_user: {user_id: 1}, history: {push: jest.fn()}};
const props = {current_user: {user_id: null}, history: {push: jest.fn()}};

// Mock fetches
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

it('renders a <SignUp /> snapshot', () => {
    const component = renderer.create(<Signup {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('methods fire appropriately', () => {
    test('handleSubmit is fired on button click', async (done) => {
        expect.assertions(1);

        const spy = jest.spyOn(Signup.prototype, "handleSubmit");
        window.fetch = mockFetch({value: "success"})
        window.alert = jest.fn()

        const component = shallow(
            <Signup {...props} />
        );

        const form = component.find('form')
        form.simulate('submit', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
        done();
    });
    it('responds with an error alert if errors on fetch', async (done) => {
        const history = { push: jest.fn() };

        window.alert = jest.fn()
        window.fetch = mockFetch({errors: "invalid username or password"})

        expect.assertions(1);

        const component = shallow(
            <Signup {...props} />
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
            <Signup {...props} />
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
        expect.assertions(2);

        const spy = jest.spyOn(Signup.prototype, "handleChange");
        const component = shallow(
            <Signup {...props} />
        );
        
        const input = component.find('input').first()
        input.simulate('change', {target: {value: 'David', name: 'username'}});
        
        expect(spy).toHaveBeenCalled();
        expect(component.state().username).toEqual('David');
    });
    it('redirects given a user id', () => {
        expect.assertions(1);

        const wrapper = shallow(
            <Signup {...userProps} />
        );

        expect(wrapper.find('Redirect')).toHaveLength(1);
    });
});