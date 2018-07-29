import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends React.Component {

  state = {
    entries: []
  }

  componentDidMount() {
    const id = this.props.current_user.user_id
    const url = `http://localhost:3001/api/v1/profit_loss/${id}`
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
          columns={[
            {
              Header: "Entries",
              columns: [
                {
                  Header: "Category",
                  accessor: "category"
                },
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "Amount",
                  accessor: "amount"
                },
                {
                  Header: "Notes",
                  accessor: "notes"
                }
              ]
            }
          ]}
          defaultPageSize={10}
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
