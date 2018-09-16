import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

// Import React Popup
import Popup from "reactjs-popup";

// Import Dinero
import Dinero from "dinero.js";

class Table extends React.Component {

  state = {
    entries: [],
    open: false,
    data: {},
    filterSum: 0
  }


//////////////////Popup Modal Functions////////////////////////////////////
  openModal = (entry, entry_index) => {
    this.setState({ open: true, data: entry, index: entry_index});
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  handleDelete = () => {
    const index = this.state.index
    console.log(this.state)
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state.data)
    };
    fetch('https://sumfinance.herokuapp.com/api/v1/entries', options)
    .then(resp => resp.json())
    .then(resp => { if (resp.error) {
      alert(resp.exception)
    } else {
      this.setState((prevState) => {
        // Not a deep clone of the objects, just a copy of the array
        let newEntries = prevState.entries.slice(0)
        newEntries.splice(index, 1)
        return {
          entries: newEntries
        }
      })
    }}, this.closeModal())
  }
////////////////////////////////////////////////////////////////


////////unfinished manipulate filtered data fucntions///////////
  formatMoney = (number, places, symbol, thousand, decimal) => {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
  }

  unformatMoney = (dollars) => {
    return Number(dollars.replace(/[^0-9\\.-]+/g,""));
  }

  averageEntries = (data) => {
    let sum = data.reduce((prev, cur) => {
      return prev + this.unformatMoney(cur.amount)
    }, 0);
    return this.formatMoney(sum/data.length)
  }

  sumEntries = (data) => {
    let sum = data.reduce((prev, cur) => {
      return prev + this.unformatMoney(cur.amount)
    }, 0);
    return this.formatMoney(sum)
  }

//////////////////////////////////////////////////////////////

  componentDidMount() {
    const id = this.props.current_user.user_id
    const url = `https://sumfinance.herokuapp.com/api/v1/entries/${id}`
    fetch(url)
    .then(res => res.json())
    .then(res => this.setState({entries: res}))
  }



  render() {
    const data = this.state.entries;
    const windowWidth = document.documentElement.offsetWidth
    let mobileColumns = [
        {
          Header: "Category",
          accessor: "category_name",
          maxWidth: 200,
          Filter: ({filter, onChange}) =>
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : ""}
              >
              <option value="">All</option>
              {this.props.current_user.categories.map( category =>
                <option
                  key={category.id}
                  value={category.name}>{category.name}</option>
                )
              }
            </select>
        },
        {
          Header: "Date",
          accessor: "date",
          Footer: (<span><strong>Sum:<br></br>Average:</strong></span>),
          maxWidth: 110,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["date"] }),
            filterAll: true
        },
        {
          Header: "Amount",
          id: "amount",
          accessor: d => {
            return "$" + Number(d.amount).toFixed(2)
          },
          Footer: columnProps => {
            return(
              <span>
              {columnProps.data.length > 0 ? this.sumEntries(columnProps.data) : 0}<br></br>
              {columnProps.data.length > 0 ? this.averageEntries(columnProps.data) : 0}
            </span>
            )
          },
          maxWidth: 100,
          sortMethod: (a, b) => {
            if (a === b) {
              return 0;
            }
            const aInteger = Number(a.replace(/[^0-9\\.-]+/g,""));
            const bInteger = Number(b.replace(/[^0-9\\.-]+/g,""));
            // Originally this ^ was .replace(/[^0-9\.-]+/g,"") but the linter was throwing a "unnecessary escape character" error so I escaped it. Not sure if this is cool or not.
            return aInteger > bInteger ? 1 : -1;
          },
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["amount"] }),
            filterAll: true
        }
      ]
    let desktopColumns = [
          ...mobileColumns,
          {
            Header: "Notes",
            accessor: "notes",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["notes"] }),
              filterAll: true
          }
        ]
    return (
      <div className="table-content">
        <ReactTable
          data={data}
          filterable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                this.openModal(rowInfo.original, rowInfo.index)
              }
            };
          }}
          columns={windowWidth > 500 ? [{columns: desktopColumns}] : [{columns: mobileColumns}]}
          defaultPageSize={10}
          defaultSorted={[
            {
              id: "date",
              desc: true
            }
          ]}
          className="-striped -highlight"
          noDataText="No Entries"
        >
          {(state, makeTable, instance) => {
            return (
              <div id="table">
                <pre>
                  <code>
                    {/* custom styling, extra stuff */}
                  </code>
                </pre>
                {makeTable()}
              </div>
            );
          }}
        </ReactTable>
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="table-popup">
            <p>Amount: {"$" + Number(this.state.data.amount).toFixed(2)}</p>
            <p>Category: {this.state.data.category}</p>
            <p>Date: {this.state.data.date}</p>
            <p>Notes: {this.state.data.notes}</p>
            <button onClick={this.handleDelete}>Delete Entry</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Table)
