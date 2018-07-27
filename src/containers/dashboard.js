import React from 'react';

import { connect } from 'react-redux';
import {Redirect } from 'react-router';
import { Route } from 'react-router';

import IncomeForm from '../components/income_form';
import Analysis from '../components/analysis';

class Dashboard extends React.Component {
  render() {
    console.log("dashboard")
    return (
      <div>
        { !this.props.current_user.user_id ? <Redirect to='/login' /> : null }
        <Route path={`${this.props.match.url}/form`} component={IncomeForm} />
        <Route path={`${this.props.match.url}/analysis`} component={Analysis} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Dashboard);
