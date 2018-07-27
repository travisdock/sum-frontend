import React from 'react';
import { connect } from 'react-redux';

import Chart from './chart';

class Analysis extends React.Component {
  state = {
    userEntries: []
  }

  componentDidMount() {
    const url = `http://localhost:3001/api/v1/month_category/${this.props.current_user.user_id}`
    fetch(url)
      .then(resp => resp.json())
      .then(resp => this.setState({userData: resp}))
  }
  render(){

    return(
      <div>{this.state.userData ?
        <div><Chart /></div>
        :
        <div>Loading...</div>
      }</div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Analysis);
