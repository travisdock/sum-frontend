import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; // Smart components
import { MemoryRouter } from 'react-router';

import { NakedMoreMenu } from '../../src/components/moreMenu';
import MoreMenu from '../../src/components/moreMenu';

// Setup Store
const mockStore = configureStore();
const userState = {current_user: {user_id: 1}}
const userStore = mockStore(userState);
// const noUserState = {current_user: {}};
// const noUserStore = mockStore(noUserState);

describe('<MoreMenu />', () => {
    it('renders correctly dependent upon state', () => {
        const wrapper = mount(
            <Provider store={userStore}>
                <MemoryRouter 
                // this fakes the key in history to be testKey every time so it doesn't mess
                // up the snapshot.
                // https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
                initialEntries={[ { pathname: '/', key: 'testKey' } ]}
                >
                    <MoreMenu store={userStore} />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('button')).toHaveLength(1);
        let moreButton = wrapper.find('button')
        wrapper.setState({open: true})
        expect(wrapper.state(['open'])).toBe(true)
        // wrapper.update()
        // expect(wrapper.find('NavLink')).toHaveLength(1);
        // expect(toJson(wrapper)).toMatchSnapshot();
       

        // expect(wrapper.find('NavLink')).toHaveLength(3);
        // expect(wrapper.find('NavLink').get(0).props.to).toBe('/dashboard/form');
        // expect(wrapper.find('NavLink').get(1).props.to).toBe('/dashboard/charts');
        // expect(wrapper.find('NavLink').get(2).props.to).toBe('/dashboard/entries');
    });

    // it('given no user, it renders the component correctly', () => {
    //     const wrapper = mount(
    //         <MemoryRouter 
    //           // this fakes the key in history to be testKey every time so it doesn't mess
    //           // up the snapshot.
    //           // https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
    //           initialEntries={[ { pathname: '/', key: 'testKey' } ]}
    //         >
    //             <Navbar store={noUserStore} />
    //         </MemoryRouter>
    //     );


    //     expect(toJson(wrapper)).toMatchSnapshot();
    //     expect(wrapper.find('NavLink')).toHaveLength(3);
    //     expect(wrapper.find('NavLink').get(0).props.to).toBe('/login');
    //     expect(wrapper.find('NavLink').get(1).props.to).toBe('/about');
    //     expect(wrapper.find('NavLink').get(2).props.to).toBe('/signup');
    // }); 
        

    // moreButton.simulate('click');
    // expect(openModal).toHaveBeenCalled()
});

describe('<NakedMoreMenu />', () => {
    it('get nakedddddd', () => {
        const spy = jest.spyOn(NakedMoreMenu.prototype, "handleLogout");
        const wrapper = shallow(
            <NakedMoreMenu />
        );

        expect(wrapper.find('button')).toHaveLength(2);
        let moreButton = wrapper.find('button');
        expect(wrapper.state(['open'])).toBe(false);
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.state(['open'])).toBe(true);
        wrapper.find('button').at(1).simulate('click');
        expect(spy).toHaveBeenCalled();
        
    });
});