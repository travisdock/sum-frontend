import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { InputForm } from '../../components/InputForm';
import * as Helpers from '../../components/helpers/inputFormHelpers';

const props = {
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
const noCategoriesUserProps = {
    current_user: {
        user_id: 1
    }
}

describe('snapshots', () => {
    beforeEach(() => {
        let date = new Date('1993')
        global.Date = jest.fn(() => date)
    })
    
    afterAll(() => {
        global.Date = Date
    })

    it('renders an <InputForm /> with select category snapshot', () => {
        const component = renderer.create(<InputForm {...props} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an <InputForm /> with no user categories', () => {
        const component = renderer.create(<InputForm {...noCategoriesUserProps} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders an <InputForm /> with new category snapshot', () => {
        const component = renderer.create(<InputForm {...props} />);
        component.root.instance.setState({new_category: true})
        
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('select Category methods fire appropriately', () => {
    test('handleSubmit is fired on button click', () => {
        const spy = jest.spyOn(Helpers, "handleSubmit");

        const component = shallow(<InputForm {...props} />);

        const form = component.find('form')
        form.simulate('submit', { preventDefault () {} });

        expect(spy).toHaveBeenCalled();
    });
    
    it('calls toggle category on checkbox check', () => {
        const spy = jest.spyOn(Helpers, "toggleCategory");
        const component = shallow(<InputForm {...props} />);
        
        const input = component.find('input[type="checkbox"]').first()
        input.simulate('change', { target: { checked: true } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls handleChange on category select change', () => {
        const spy = jest.spyOn(Helpers, "handleChange");
        const component = shallow(<InputForm {...props} />);
        
        const input = component.find('select').first()
        input.simulate('change', {target: { value: 'categoryTwo' } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls handleChange on date input change', () => {
        const spy = jest.spyOn(Helpers, "handleChange");
        const component = shallow(<InputForm {...props} />);
        
        const input = component.find('input[type="date"]').first()
        input.simulate('change', {target: { value: '12/22/16' } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls handleChange on amount input change', () => {
        const spy = jest.spyOn(Helpers, "handleChange");
        const component = shallow(<InputForm {...props} />);
        
        const input = component.find('input[type="text"]').first()
        input.simulate('change', {target: { value: '122' } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls handleChange on notes input change', () => {
        const spy = jest.spyOn(Helpers, "handleChange");
        const component = shallow(<InputForm {...props} />);
        
        const input = component.find('textarea').first()
        input.simulate('change', {target: { value: 'hello there' } });
        
        expect(spy).toHaveBeenCalled();
    });
});

describe('new Category methods fire appropriately', () => {
    it('calls handleChange on category name input change', () => {
        const spy = jest.spyOn(Helpers, "handleChange");
        const component = shallow(<InputForm {...props} />);
        component.setState({new_category: true})
        component.update()
        
        const input = component.find('input[name="category_name"]').first()
        input.simulate('change', {target: { value: 'new one' } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls toggleIncome on checkbox check', () => {
        const spy = jest.spyOn(Helpers, "toggleIncome");
        const component = shallow(<InputForm {...props} />);
        component.setState({new_category: true})
        component.update()
        
        const input = component.find('input[name="income"]').first()
        input.simulate('change', {target: { checked: true } });
        
        expect(spy).toHaveBeenCalled();
    });

    it('calls toggleUntracked on checkbox check', () => {
        const spy = jest.spyOn(Helpers, "toggleUntracked");
        const component = shallow(<InputForm {...props} />);
        component.setState({new_category: true})
        component.update()
        
        const input = component.find('input[name="untracked"]').first()
        input.simulate('change', {target: { checked: true } });
        
        expect(spy).toHaveBeenCalled();
    });
});