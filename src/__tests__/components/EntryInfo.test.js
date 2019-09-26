import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import EntryInfo from '../../components/EntryInfo';
import { jsxOpeningElement, jsxEmptyExpression } from '@babel/types';

const openProps = {
    open: "info",
    closeModal: jest.fn(),
    category_name: "Test Category",
    date: "12/12/12",
    amount: "123.12",
    notes: "These are notes",
    askIfSure: jest.fn(),
    openUpdateModal: jest.fn(),
    copyEntry: jest.fn()
}

it('renders a snapshot', () => {
    const component = renderer.create(<EntryInfo {...openProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('correct functions fire on button clicks', () => {
    test('handleDelete fires on button click', () => {
        const component = shallow(<EntryInfo {...openProps} />);
        component.find('button.delete').simulate('click')
        expect(openProps.askIfSure).toHaveBeenCalled();
    });
    test('closeModal fires on button click', () => {
        const component = shallow(<EntryInfo {...openProps} />);
        component.find('button.update').simulate('click')
        expect(openProps.openUpdateModal).toHaveBeenCalled();
    });
    test('closeModal fires on button click', () => {
        const component = shallow(<EntryInfo {...openProps} />);
        component.find('button.copy').simulate('click')
        expect(openProps.copyEntry).toHaveBeenCalled();
    });
});

