import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { nakedSignup as Signup } from '../../src/components/Signup';


const noUserProps = {user_id: null}

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
    const component = renderer.create(<Signup current_user={ noUserProps }/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('methods fire appropriately', () => {
    test('handleSubmit is fired on button click', () => {
        const spy = jest.spyOn(Signup.prototype, "handleSubmit");
        window.fetch = mockFetch({value: "success"})
        window.alert = jest.fn()

        const component = shallow(
            <Signup current_user={ noUserProps } />
        );

    });
});

// describe('<Signup /> methods, without wrappers', () => {

//     it('handleSubmit is fired on button click', async (done) => {
//         const spy = jest.spyOn(NakedSignup.prototype, "handleSubmit");
//         window.fetch = mockFetch({errors: "yeah"})
//         window.alert = jest.fn()

//         const component = shallow(
//             <NakedSignup current_user={ userProp } />
//         );

//         const signUpButton = component.find('button')
//         const form = component.find('form')
//         await form.simulate('submit', { preventDefault () {} });

        
//         setImmediate(() => {
//             try {
//                 expect(signUpButton.text()).toEqual('Sign up')
//                 expect(spy).toHaveBeenCalled();
//             } catch (e) {
//                 done.fail(e);
//             }
//             done();
//         });
//     });

//     it('responds with an error alert if errors on fetch', async (done) => {
//         window.alert = jest.fn()
//         window.fetch = mockFetch({errors: "invalid username or password"})

//         expect.assertions(1);

//         const component = shallow(
//             <NakedSignup current_user={ userProp }/>
//         );

//         const form = component.find('form')
//         await form.simulate('submit', { preventDefault () {} });

//         setImmediate(() => {
//             try {
//                 expect(window.alert).toHaveBeenCalledWith('invalid username or password');
//             } catch (e) {
//                 done.fail(e);
//             }
//             done();
//         });
//     });

//     it('responds with sucess message if fetch response has no errors', async (done) => {
//         window.alert = jest.fn()
//         window.fetch = mockFetch({"success": "Success! Please log in."})
        
//         expect.assertions(1);

//         const component = shallow(
//             <NakedSignup current_user={userProp} history={historyProp} />
//         );

//         const form = component.find('form')
//         await form.simulate('submit', { preventDefault () {} });

//         setImmediate(() => {
//             try {
//                 expect(window.alert).toHaveBeenCalledWith('Success! Please log in.');
//             } catch (e) {
//                 done.fail(e);
//             }
//             done();
//         });
//     });

//     it('updates state when form inputs change', () => {

//         const spy = jest.spyOn(NakedSignup.prototype, "handleChange");
//         const component = shallow(
//             <NakedSignup current_user={userProp} history={historyProp} />
//         );
        
//         const input = component.find('input').first()
//         input.simulate('change', {target: {value: 'David', name: 'username'}});
        
//         expect(spy).toHaveBeenCalled();
//         expect(component.state().username).toEqual('David');
//     });
    
//     it('given a user it redirects', () => {
//         const wrapper = shallow(
//             <ReduxWrappedSignup store={userStore} />
//         );

//         expect(wrapper.dive().find('Redirect')).toHaveLength(1);
//     });
// });