import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { PulseLoader } from 'react-spinners';

import { Chart } from '../../components/Chart';
import { bb } from 'billboard.js';
// import blah from '../../../node_modules/billboard.js/dist/billboard'

// import { bb } from '../../../__mocks__/billboard'
// jest.mock('react-spinners');
// jest.genMockFromModule('react-spinners');
// jest.mock('billboard.js');
// jest.mock('billboard.js', () => {
//     const bb = true;
//   });
// billboard.bb = jest.fn();
// const bb = jest.genMockFromModule('../../../node_modules/billboard.js/dist/billboard');
// bb.bb = jest.fn(() => 'not wizard');

// Mock fetch
function mockFetch(data) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

// Mock props
const props = {current_user: {user_id: 1}};
const response = {error: "error"}
const loading = {load: false}
const newState = {
    charts: {"2019": ["an_expense", "123.0"], "December": ["an_expense", "123.0"]},
    currentChart: ["an_expense", "123.0"],
    currentTitle: "December",
    extraMonthInfo: {},
    load: true,
    stats: {
        "2019": {
            "Annual Profit/Loss": "0.0",
            "Average Expense per Month": "not enough data",
            "Average Income per Month": "not enough data",
            "Estimated Annual Expense": "not enough data",
            "Estimated Annual Income": "not enough data",
            "Total Expenses": "123.0",
            "Total Income": "123.0",
            "avg_cat_month": {"an_expense": "not enough data"}
        },
        "December": {
            "an_income": "123.0",
            "an_expense": "123.0",
            "Total Income": "123.0",
            "Total Expense": "123.0",
            "Profit/Loss": "0.0"
        }
    }
}

describe('renders snapshots', () => {
    test('renders a <Chart/> snapshot', () => {
        expect.assertions(1);

        const component = renderer.create(<Chart {...props} />);
        component.root.instance.setState(newState)

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders an error, snapshot', () => {
        expect.assertions(1);

        const component = renderer.create(<Chart {...props} />);
        component.root.instance.setState(response)

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('renders loader', () => {
        // const mock = jest.spyOn(PulseLoader.prototype, 'render');
        // mock.mockImplementation(() => (<div>hello</div>))

        const component = renderer.create(<Chart {...props} />);
        component.root.instance.setState(loading)

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});

describe('methods fire appropriately', () => {
    test('changes state on select change', () => {
        expect.assertions(1);
        
        const component = renderer.create(<Chart {...props} />);
        const spy = jest.spyOn(component.root.instance, "selectChangePieChart");

        component.root.instance.setState(newState)
        const select = component.root.find((el) => el.type == 'select' )
        select.props.onChange({target: { value: '2019' } });
        
        expect(spy).toHaveBeenCalled();
    });

    test('should call renderPieChart after componentDidMount', async (done) => {
        // expect.assertions(3);
        const mock = jest.spyOn(bb, 'generate');
        mock.mockImplementation(() => {})
        Chart.prototype.renderPieChart = jest.fn();
        const spy = jest.spyOn(Chart.prototype, "renderPieChart");
        window.fetch = mockFetch(newState)

        const component = shallow(<Chart {...props} />);

        setImmediate(() => {
            try {
                component.debug()
                expect(window.fetch).toHaveBeenCalled();
                expect(component.state().load).toEqual(true)
                expect(spy).toHaveBeenCalled();
            } catch (e) {
                done.fail(e);
            }
            done();
        });
    });
});
