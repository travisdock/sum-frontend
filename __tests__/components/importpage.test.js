import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import {
    nakedImportPage as NakedImportPage
} from '../../src/components/import_page';

// Setup Store
const mockStore = configureStore();
const state = {current_user: {user_id: 1}}
const store = mockStore(state);

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

describe('<ImportPage /> with redux', () => {
    it('handleSubmit function fires when button is pressed', async (done) => {
        const spy = jest.spyOn(NakedImportPage.prototype, "handleSubmit");
        window.alert = jest.fn()
        window.fetch = mockFetch({message: "error"})

        const wrapper = shallow(
            <NakedImportPage current_user={ userProp } />
        );
        
        const form = wrapper.find('form')
        await form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "success"}}} });

        expect(spy).toHaveBeenCalled();
        expect
        setImmediate(() => {
            try {
                expect(window.alert).toHaveBeenCalledWith('error');
            } catch (e) {
                done.fail(e);
            }
            done();
        });

    });
});