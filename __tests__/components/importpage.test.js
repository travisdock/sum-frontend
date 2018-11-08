import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

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

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

describe('<ImportPage /> with redux', () => {
    it('handleSubmit function fires when button is pressed', async (done) => {
        const spy = jest.spyOn(NakedImportPage.prototype, "handleSubmit");
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "error"})

        const wrapper = shallow(
            <NakedImportPage current_user={ userProp } />
        );
        
        const form = wrapper.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
        done();
    });

    it('alerts with message from response', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "message from response"})

        const wrapper = shallow(
            <NakedImportPage current_user={ userProp } />
        );

        const form = wrapper.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });
        
        return flushPromises().then(() => {
            expect(window.alert).toHaveBeenCalledWith("message from response");
            done();
        });
    });

    it('fires action if import is successful', async (done) => {
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "success message", categories: [{}, {}, {}]})
        const updateCategories = jest.fn()

        const wrapper = shallow(
            <NakedImportPage current_user={ userProp } updateCategories={ updateCategories } />
        );
        
        const form = wrapper.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "file"}}} });
        
        return flushPromises().then(() => {
            expect(updateCategories).toHaveBeenCalled();
            done();
        });
    });


});