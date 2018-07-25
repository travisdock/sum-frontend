import React from 'react';
import { connect } from 'react-redux';

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
    console.log(this.state)

    return(
      <div>sick yeah</div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Analysis);
