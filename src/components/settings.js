import React from 'react';
// import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { updateUser } from '../actions';

import { handleUpdate } from './settings_helpers.js';

class Settings extends React.Component {
    constructor() {
        super();
        this.handleUpdate = handleUpdate.bind(this);
    }

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
                    <button onClick={this.handleUpdate}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
});
  
export default connect(mapStateToProps, { updateUser })(Settings);