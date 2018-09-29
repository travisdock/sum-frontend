import React from 'react';
import {bb} from "billboard.js";
import { connect } from 'react-redux';

class Chart extends React.Component {

  state = {
    charts: {},
    load: false,
    toggleChart: false,
    currentChart: 0
  }

  componentDidMount() {
    const id = this.props.current_user.user_id

    fetch(`${process.env.REACT_APP_API}/api/v1/charts/${id}`)
      .then(resp => resp.json())
      .then(resp => {if (resp.error) {
        this.setState({error: resp.error})
      } else {
        this.setState({charts: resp, load: true, currentChart: resp[resp.length - 3] }, this.renderPieChart)
      }}
        )
  }

  selectChangePieChart = (e) => {
    const title = e.target.value
    this.setState( () => {
      return {
        currentChart: this.state.charts.find(chart => Object.keys(chart)[0] === title)
      }
    }, (title === 'Profit & Loss' ? this.renderPLChart : this.renderPieChart) ) //ternary: after state is set it triggers a chart renderd depending on the title
  }

  renderPieChart() {
    const { currentChart } = this.state
    const month = Object.keys(currentChart)[0]

    bb.generate({
      data: {
        columns: currentChart[month],
        type: "pie",
        // onclick: function(d, element) { debugger }
      },
      title: {
        text: month,
        position: "top-center",
        padding: {
            top: 10,
           right: 10,
            bottom: 10,
            left: 10
        },
      },
      legend: {
        show: true,
        // contents: {
        //     bindto: "#legend",   // <ul id='legend'></ul>
        //     template: "<li style='background-color:#1f77b4'>data1</li>"
        //     or using function
        //     template: function(id, color, data) {
        //          // if you want omit some legend, return falsy value
        //          if (title !== "data1") {
        //               return "<li style='background-color:"+ color +">"+ title +"</li>";
        //          }
        //     }
        // },
        position: "bottom",  // bottom, right, inset
        equally: false,
        padding: 10,
        item: {
            // onclick: function(id) { debugger },
            // onover: function(id) { debugger },
            // onout: function(id) { debugger },
    
            // set tile's size
            tile: {
                width: 20,
                height: 15
            }
        }
      },
      bindto: "#chart"
    });
  }

  renderPLChart() {
    const { currentChart } = this.state
    const title = Object.keys(currentChart)[0]
    bb.generate({
      data: {
        x: "x",
        columns: currentChart[title],
      type: "area-spline"
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
    return (
      <div className="chart-content">
        {this.state.load ?
            <div className="chart-content">
              <select
                name="chart"
                value={Object.keys(this.state.currentChart)[0]} //current chart month
                onChange={this.selectChangePieChart}
                >
                {this.state.charts.map(chart => <option value={Object.keys(chart)[0]} key={Object.keys(chart)[0]} > {Object.keys(chart)[0]} </option>) }
              </select>
              <div id="chart" />
            </div> :
            this.state.error ? <div>{this.state.error}</div> : <div>Loading...</div>
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Chart)
