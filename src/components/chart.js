import React from 'react';
import {bb} from "billboard.js";
import { connect } from 'react-redux';

class Chart extends React.Component {

  state = {
    columns: [],
    load: false
  }
  componentDidMount() {
    const id = this.props.current_user.user_id

    fetch(`http://localhost:3001/api/v1/month_category/${id}`)
      .then(resp => resp.json())
      .then(resp => this.setState({columns: resp, load: true }, this.renderChart))
  }

  renderChart() {
    bb.generate({
      data: {
        x: "x",
        columns: this.state.columns,
    type: "bar"
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%b"
          }
        }
      },
      bindto: "#chart"
    });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.load ? <div id="chart" /> : null}

      </div>

    )
  }
}
const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Chart)
