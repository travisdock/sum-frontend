import React from 'react';
import renderer from 'react-test-renderer';

import { nakedChart as Chart } from '../../components/Chart';

// Mock fetches
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

it('renders a <Chart/> snapshot', async () => {
    expect.assertions(1);
    Chart.prototype.componentDidMount = jest.fn();

    const component = renderer.create(<Chart {...props} />);
    component.root.instance.setState(newState)

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});