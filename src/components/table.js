import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class Table extends React.Component {

  state = {
    entries: []
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
    console.log(this.props)
    return (
      <div>
        <ReactTable
          data={data}
          filterable
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
                        <option value={category.name}>{category.name}</option>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Table)
