import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Table } from '../../components/Table';
import * as TableHelpers from '../../components/helpers/tableHelpers';

jest.mock('../../components/EntryInfo', () => () => 'EntryInfo')
jest.mock('../../components/UpdateEntry', () => () => 'UpdateEntry')


// Mock fetch
function mockFetch(data) {
    return jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

// Mock props
const props = {current_user: {user_id: 1}};
const entries = 'entries'

describe('methods fire appropriately', () => {
    test('componentDidMount updates success state correctly', async () => {
        expect.assertions(2);
        const spy = jest.spyOn(TableHelpers, "updateWindowDimensions")
            .mockImplementation(() => {});

        window.fetch = mockFetch(entries)

        const component = await shallow(<Table {...props} />);
        await component.update();

        expect(component.state('loading')).toEqual(false)
        expect(spy).toHaveBeenCalled();
        // https://medium.com/@wvm/asynchronous-api-testing-in-react-cf3b180bc3d
    });
    
    test('componentWillUnmount is called correctly', async () => {
        expect.assertions(1);
        const spy = jest.spyOn(window, "removeEventListener")

        const component = await shallow(<Table {...props} />);
        component.unmount();

        expect(spy).toHaveBeenCalled();
    });
});
