import React from 'react';
import IncomeForm from '../components/income_form';
import { connect } from 'react-redux';
import {Redirect } from 'react-router';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        { !this.props.current_user.user_id ? <Redirect to='/login' /> : null }
        <IncomeForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Dashboard);
