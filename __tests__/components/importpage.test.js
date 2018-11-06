import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import {
    nakedImportPage as NakedImportPage
} from '../../src/components/import_page';
// import { PulseLoader } from 'react-spinners';

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
const mockResponse = (status, statusText, response) => {
    return new Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json'
        }
    });
};

describe('<ImportPage /> with redux', () => {
    it('handleSubmit function fires when button is pressed', () => {
        const spy = jest.spyOn(NakedImportPage.prototype, "handleSubmit");

        const wrapper = shallow(
            <NakedImportPage current_user={ userProp } />
        );
        
        
        const form = wrapper.find('form')
        form.simulate('submit', { preventDefault: jest.fn(), target: {0: {files: {0: "success"}}} });

        expect(spy).toHaveBeenCalled();

    });
});