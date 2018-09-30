import React from 'react';
import {bb} from "billboard.js";
import { connect } from 'react-redux';

class Chart extends React.Component {

  state = {
    charts: {},
    currentChart: 0,
    stats: {},
    extraMonthInfo: {},
    load: false
  }

  componentDidMount() {
    const id = this.props.current_user.user_id

    fetch(`${process.env.REACT_APP_API}/api/v1/charts/${id}`)
      .then(resp => resp.json())
      .then(resp => {if (resp.error) {
        this.setState({error: resp.error})
      } else {
        const titles = Object.keys(resp.charts)
        const lastMonth = titles[titles.length - 1]
        this.setState({
          charts: resp.charts,
          stats: resp.stats,
          load: true,
          currentChart: resp.charts[lastMonth], currentTitle: lastMonth
        }, this.renderPieChart)
      }}
        )
  }

  selectChangePieChart = (e) => {
    const title = e.target.value
    this.setState( () => {
      return {
        currentChart: this.state.charts[title],
        currentTitle: title
      }
    }, this.renderPieChart)
  }

  renderPieChart() {
    const { currentChart, currentTitle } = this.state
    // const { currentTitle } = Object.keys(currentChart)[0]
    // debugger;
    bb.generate({
      data: {
        columns: currentChart,
        type: "pie",
        // onclick: function(d, element) { debugger }
      },
      title: {
        text: currentTitle,
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

  render() {
    return (
      <div className="content">
        {this.state.load ?
            <div className="chart-content">
              <select
                name="chart"
                value={this.state.currentTitle} //current chart month
                onChange={this.selectChangePieChart}
                >
                {Object.keys(this.state.charts).map(title => <option value={title} key={title} > {title} </option>) }
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



// This is the profit loss chart. I got rid of it because it was ugly but I may want to remake it one day so here is the code.
// renderPLChart() {
//   const { currentChart } = this.state
//   bb.generate({
//     data: {
//       x: "x",
//       columns: currentChart,
//     type: "area-spline"
//     },
//     axis: {
//       x: {
//         type: "timeseries",
//         tick: {
//           format: "%b"
//         }
//       }
//     },
//     bindto: "#chart"
//   });
// }