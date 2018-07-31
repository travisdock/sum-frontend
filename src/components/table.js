import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

// Import React Popup
import Popup from "reactjs-popup";

class Table extends React.Component {

  state = {
    entries: [],
    open: false,
    data: {}
  }

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
    fetch('http://localhost:3001/api/v1/entries', options)
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

  componentDidMount() {
    const id = this.props.current_user.user_id
    const url = `http://localhost:3001/api/v1/entries/${id}`
    fetch(url)
    .then(res => res.json())
    .then(res => this.setState({entries: res}))
  }

  render() {
    const data = this.state.entries;
    return (
      <div>
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
          columns={[
            {
              Header: "Entries",
              columns: [
                {
                  Header: "Category",
                  accessor: "category",
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
                  maxWidth: 110,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["date"] }),
                    filterAll: true
                },
                {
                  Header: "Amount",
                  accessor: "amount",
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
                },
                {
                  Header: "Notes",
                  accessor: "notes",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["notes"] }),
                    filterAll: true
                }
              ]
            }
          ]}
          defaultPageSize={50}
          style={{height: "500px"}}
          className="-striped -highlight"
        />
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div>
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
