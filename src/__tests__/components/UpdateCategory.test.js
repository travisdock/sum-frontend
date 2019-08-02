import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { UpdateCategory } from '../../components/UpdateCategory';

const props = {
    open: 'update',
    onOpen: jest.fn(),
    closeModal: jest.fn(),
    name: 'categoryA',
    income: 'false',
    untracked: 'false',
    year: '1993',
    handleChange: jest.fn(),
    toggleIncome: jest.fn(),
    toggleUntracked: jest.fn(),
    handleUpdate: jest.fn()
};
const noProps = {
    open: 'false'
}

describe('snapshots', () => {
    it('renders an open <UpdateCategory /> snapshot', () => {
        const component = renderer.create(<UpdateCategory {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a closed <UpdateCategory /> snapshot', () => {
        const component = renderer.create(<UpdateCategory {...noProps} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('update Category methods fire appropriately', () => {
    it('calls handleChange on category name input change', () => {
        const component = shallow(<UpdateCategory {...props} />);
        
        const input = component.find('input[name="name"]').first()
        input.simulate('change', {target: { value: 'new one' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });

    it('calls toggleIncome on checkbox check', () => {
        const component = shallow(<UpdateCategory {...props} />);
        
        const input = component.find('input[name="income"]').first()
        input.simulate('change', {target: { checked: true } });
        
        expect(props.toggleIncome).toHaveBeenCalled();
    });

    it('calls toggleUntracked on checkbox check', () => {
        const component = shallow(<UpdateCategory {...props} />);
        
        const input = component.find('input[name="untracked"]').first()
        input.simulate('change', {target: { checked: true } });
        
        expect(props.toggleUntracked).toHaveBeenCalled();
    });

    it('calls handleChange on year input change', () => {
        const component = shallow(<UpdateCategory {...props} />);
        
        const input = component.find('input[name="year"]').first()
        input.simulate('change', {target: { value: '1990' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });

    test('handleSubmit is fired on button click', () => {
        const component = shallow(<UpdateCategory {...props} />);

        const form = component.find('form')
        form.simulate('submit', { preventDefault () {} });

        expect(props.handleUpdate).toHaveBeenCalled();
    });
});