import React from 'react';
import { mount } from 'enzyme';

import { Table } from '../../components/Table';
import * as TableHelpers from '../../components/helpers/tableHelpers';

jest.mock('../../components/EntryInfo', () => () => 'EntryInfo')
jest.mock('../../components/UpdateEntry', () => () => 'UpdateEntry')
jest.mock('../../components/AreYouSure', () => () => 'AreYouSure')
TableHelpers.mobileColumns = jest.fn()

import ReactTable from "react-table";
jest.mock('react-table', () => () => 'ReactTable')

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

        const component = await mount(<Table {...props} />);
        await component.update();

        expect(component.state('loading')).toEqual(false)
        expect(spy).toHaveBeenCalled();
        // https://medium.com/@wvm/asynchronous-api-testing-in-react-cf3b180bc3d
    });
    
    test('componentWillUnmount is called correctly', async () => {
        // expect.assertions(1);
        const spy = jest.spyOn(window, "removeEventListener")
        jest.spyOn(TableHelpers, "updateWindowDimensions")
            .mockImplementation(() => {});
        window.fetch = mockFetch(entries)

        const component = await mount(<Table {...props} />);
        await component.update();
        component.unmount();

        expect(spy).toHaveBeenCalled();
    });
});

describe('modalHelpers fire appropriately', () => {
  test('openModal success', async () => {
    const component = mount(<Table {...props} />);
    await component.instance().openModal('entry', 'entryIndex');
    await component.update();

    expect(component.state()).toEqual(
        {
            open: "info",
            entries: 'entries',
            filterSum: 0,
            data: 'entry',
            index: 'entryIndex',
            form: 'entry',
            loading: false,
            windowWidth: 0
        }
    );
  });
});
