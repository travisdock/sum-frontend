import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { UpdateEntry } from '../../components/UpdateEntry';

const props = {
    open: 'update',
    closeModal: jest.fn(),
    openUpdateModal: jest.fn(),
    handleUpdate: jest.fn(),
    handleChange: jest.fn(),
    evaluateAmount: jest.fn(),
    category_name: 'categoryOne',
    date: '12/22/16',
    amount: '122.22',
    notes: 'This is the notes',
    current_user: {
        user_id: 1,
        categories: [
            {
                id: 1,
                name: "categoryOne"
            },
            {
                id: 2,
                name: "categoryTwo"
            }
        ]
    }
};
const closedProps = {
    open: 'false',
    current_user: {
        user_id: 1,
        categories: []
    }
}

describe('snapshots', () => {    
    it('renders an open <UpdateEntry /> snapshot', () => {
        const component = renderer.create(<UpdateEntry {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an closed <UpdateEntry />', () => {
        const component = renderer.create(<UpdateEntry {...closedProps} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('select Category methods fire appropriately', () => {
    test('handleSubmit is fired on button click', () => {
        const component = shallow(<UpdateEntry {...props} />);

        const form = component.find('form')
        form.simulate('submit', { preventDefault () {} });

        expect(props.handleUpdate).toHaveBeenCalled();
    });

    it('calls handleChange on category select change', () => {
        const component = shallow(<UpdateEntry {...props} />);
        
        const input = component.find('select').first()
        input.simulate('change', {target: { value: 'categoryTwo' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on date input change', () => {
        const component = shallow(<UpdateEntry {...props} />);
        
        const input = component.find('input[type="date"]').first()
        input.simulate('change', {target: { value: '12/22/17' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });

    it('calls handleChange on amount input change', () => {
        const component = shallow(<UpdateEntry {...props} />);
        
        const input = component.find('input[name="amount"]').first()
        input.simulate('change', {target: { value: '122' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });

    it('calls evaluateAmount on amount input blur', () => {
        const component = shallow(<UpdateEntry {...props} />);
        
        const input = component.find('input[name="amount"]').first()
        input.simulate('focus');
        input.simulate('change', {target: { value: '122' } });
        input.simulate('blur');
        
        expect(props.evaluateAmount).toHaveBeenCalled();
    });

    it('calls handleChange on notes input change', () => {
        const component = shallow(<UpdateEntry {...props} />);
        
        const input = component.find('textarea').first()
        input.simulate('change', {target: { value: 'hello there' } });
        
        expect(props.handleChange).toHaveBeenCalled();
    });
});