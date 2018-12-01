import React from 'react';
// import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
// import { updateCategories } from '../actions';

import { handleYearViewChange } from './settings_helpers.js';

class Settings extends React.Component {
    constructor() {
        super();
        this.handleYearViewChange = handleYearViewChange.bind(this);
    }
    // User table has a current year. This defaults to the current year but can be changed from settings.
    // Current year can be saved via the login action and accessed in redux state.
    render() {
        const props = this.props
        return (
            <div className="settings">
                <h2>Change year view:</h2>
                <form>
                    <select
                        name="year_view"
                        defaultValue={props.current_user.year_view}
                    >
                        {props.current_user.years.map(year => <option value={year} key={year}>{year}</option>)}
                    </select>
                    <button onClick={this.handleYearViewChange}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
});
  
export default connect(mapStateToProps)(Settings);