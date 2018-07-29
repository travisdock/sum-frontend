import React from 'react';
import { connect } from 'react-redux';

import Chart from './chart';
import Table from './table';

class Analysis extends React.Component {

  render(){
    return(
      <div><Chart /><Table /></div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Analysis);
