import React from 'react';
import { shallow, mount } from 'enzyme';

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
const data = [{amount: '$10.00'}, {amount: '$10.00'}, {amount: '$10.00'}]

window.orientation = -90
window.innerHeight = 500
window.innerWidth = 100

describe('methods fire appropriately', () => {
    test('componentDidMount updates success state correctly', async () => {
        expect.assertions(2);
        const spy = jest.spyOn(TableHelpers, "updateWindowDimensions")
        window.fetch = mockFetch(entries)

        const component = await mount(<Table {...props} />);
        await component.update();

        expect(component.state('loading')).toEqual(false)
        expect(spy).toHaveBeenCalled();
        // https://medium.com/@wvm/asynchronous-api-testing-in-react-cf3b180bc3d
    });
    
    test('componentWillUnmount is called correctly', async () => {
        expect.assertions(1);
        const spy = jest.spyOn(window, "removeEventListener")
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
            windowWidth: 500
        }
    );
  });

  test('handleDelete success', async () => {
    window.fetch = mockFetch([0,1,2,3])

    const component = mount(<Table {...props} />);
    component.state().index = 1
    component.state().entries = [0,1,2,3]
    await component.instance().handleDelete();
    await component.update();

    expect(component.state('entries')).toEqual([0,2,3]);
  });

  test('handleDelete error', async () => {
    window.fetch = mockFetch({error: 'true', exception: 'error'})
    window.alert = jest.fn()

    const component = mount(<Table {...props} />);
    component.state().index = 1
    await component.instance().handleDelete();
    await component.update();

    expect(window.alert).toHaveBeenCalledWith('error')
  });

  test('handleUpdate fetch error', async () => {
    const e = {preventDefault: jest.fn()}
    window.fetch = mockFetch({error: 'true', exception: 'error'})
    window.alert = jest.fn()

    const component = mount(<Table {...props} />);
    component.state().data = {id: 1}
    await component.instance().handleUpdate(e);
    await component.update();

    expect(window.alert).toHaveBeenCalledWith('error')
  });

  test('handleUpdate no changes were made', async () => {
    const e = {preventDefault: jest.fn()}
    window.alert = jest.fn()

    const component = mount(<Table {...props} />);
    component.state().form = 1
    component.state().data = 1
    await component.instance().handleUpdate(e);
    await component.update();

    expect(window.alert).toHaveBeenCalledWith('No changes were made')
    expect(component.state().form).toEqual({})
  });
  
  test('handleUpdate success', async () => {
    jest.spyOn(Table.prototype, "componentDidMount")
      .mockImplementation(() => {});
    const e = {preventDefault: jest.fn()}
    window.fetch = mockFetch(5)
    window.alert = jest.fn()

    const component = mount(<Table {...props} />);
    component.state().data = {id: 1}
    component.state().index = 1

    component.state().entries = [0,1,2,3]
    await component.instance().handleUpdate(e);
    await component.update();

    expect(window.alert).toHaveBeenCalledWith('success!')
    expect(component.state().entries).toEqual([0,5,2,3])
  });

  test('updateWindowDimensions case 1', () => {
    const component = mount(<Table {...props} />);

    expect(component.state().windowWidth).toEqual(0)
    component.instance().updateWindowDimensions();
    component.update();
    expect(component.state().windowWidth).toEqual(500)
  });

  test('updateWindowDimensions case 2', () => {
    window.orientation = 0
    const component = mount(<Table {...props} />);

    expect(component.state().windowWidth).toEqual(0)
    component.instance().updateWindowDimensions();
    component.update();
    expect(component.state().windowWidth).toEqual(100)
  });

  test('unformatMoney', () => {
    const method = TableHelpers.unformatMoney;
    expect(method('$1,000.00')).toEqual(1000)
  });

  test('sumEntries', () => {
    const component = shallow(<Table {...props} />);
    const method = component.instance().sumEntries;

    expect(method(data)).toEqual('$30.00')
  });

  test('averageEntries', () => {
    const method = TableHelpers.averageEntries;

    expect(method(data)).toEqual('$10.00')
  });
});
