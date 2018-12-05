import React from 'react';
import { shallow } from 'enzyme';

import {
    nakedImportPage as NakedImportPage
} from '../../src/components/import_page';

// props for no redux
const userProp = {user_id: null}

// Mock fetches
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

//   https://github.com/facebook/jest/issues/2157#issuecomment-279171856
function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe('<ImportPage /> with redux', () => {
    it('renders correctly', () => {
        const component = shallow(
            <NakedImportPage current_user={ userProp } />
        );
        expect(component).toMatchSnapshot();
    })
    it('handleSubmit function fires when button is pressed', async (done) => {
        const spy = jest.spyOn(NakedImportPage.prototype, "handleSubmit");
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "error"})

        const component = shallow(
            <NakedImportPage current_user={ userProp } />
        );
        
        const form = component.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
        done();
    });

    it('alerts with message from response', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "message from response"})

        const component = shallow(
            <NakedImportPage current_user={ userProp } />
        );

        const form = component.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });
        
        return flushPromises().then(() => {
            expect(window.alert).toHaveBeenCalledWith("message from response");
            done();
        });
    });

    it('fires action if import is successful', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "success message", categories: [{}, {}, {}]})
        const updateUser = jest.fn()

        const component = shallow(
            <NakedImportPage current_user={ userProp } updateUser={ updateUser } />
        );
        
        const form = component.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });
        
        return flushPromises().then(() => {
            expect(updateUser).toHaveBeenCalled();
            done();
        });
    });


});