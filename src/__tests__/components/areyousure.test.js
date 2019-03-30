import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AreYouSure from '../../components/AreYouSure';

const props = {
    open: "ask",
    closeModal: jest.fn(),
    onOpen: jest.fn(),
    message: "this is a message",
    handleDelete: jest.fn()
}

it('renders a <AreYouSure/> snapshot', () => {
    const component = renderer.create(<AreYouSure {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

describe('correct functions fire on button clicks', () => {
    test('handleDelete fires on button click', () => {
        const component = shallow(<AreYouSure {...props} />);
        component.find('button.delete').simulate('click')
        expect(props.handleDelete).toHaveBeenCalled();
    });
    test('closeModal fires on button click', () => {
        const component = shallow(<AreYouSure {...props} />);
        component.find('button.close').simulate('click')
        expect(props.closeModal).toHaveBeenCalled();
    });
});

