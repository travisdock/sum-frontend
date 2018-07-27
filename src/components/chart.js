import React from 'react';
import {bb} from "billboard.js";
import { connect } from 'react-redux';

class Chart extends React.Component {

  state = {
    columns: [],
    load: false,
    currentChart: 0
  }
  componentDidMount() {
    const id = this.props.current_user.user_id

    fetch(`http://localhost:3001/api/v1/month_category/${id}`)
      .then(resp => resp.json())
      .then(resp => this.setState({columns: resp, load: true }, this.renderChart))
  }

  changeChart = () => {
    const max = this.state.columns.length
    this.setState((prevState) => {
      return {
        currentChart: (prevState.currentChart === (max - 1) ? 0 : prevState.currentChart + 1)
      }
    }, this.renderChart)
  }
  renderChart() {
    console.log(this.state)
    let month = Object.keys(this.state.columns[this.state.currentChart])[0]
    bb.generate({
      data: {
        columns: this.state.columns[this.state.currentChart][month],
        type: "pie"
      },
      title: {
        text: month
      },
      bindto: "#chart"
    });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.load ?
            <div>
              <div id="chart" />
              <button onClick={this.changeChart}>Next</button>
            </div>
          : null
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Chart)



// WORKING BAR CHART
// data: {
//   x: "x",
//   columns: this.state.columns,
// type: "bar"
// },
// axis: {
//   x: {
//     type: "timeseries",
//     tick: {
//       format: "%b"
//     }
//   }
// }
