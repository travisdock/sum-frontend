import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Imported Popups
import AreYouSure from './AreYouSure'
import UpdateEntry from './UpdateEntry'
import EntryInfo from './EntryInfo'

// Imported Functions
import {
  openModal, closeModal, openUpdateModal,
  askIfSure, handleDelete, handleChange, handleUpdate
} from './helpers/modalHelpers'
import {
  updateWindowDimensions, unformatMoney, sumEntries,
  mobileColumns, desktopColumns
} from './helpers/tableHelpers'
import {
  evaluateAmount, copyEntry
} from './helpers/inputFormHelpers'

export class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      open: false,
      data: {},
      filterSum: 0,
      windowWidth: 0,
      form: {},
      loading: true
    };
    // Imported functions
    this.openModal = openModal.bind(this);
    this.closeModal = closeModal.bind(this);
    this.openUpdateModal = openUpdateModal.bind(this);
    this.askIfSure = askIfSure.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleUpdate = handleUpdate.bind(this);
    this.evaluateAmount = evaluateAmount.bind(this);
    this.updateWindowDimensions = updateWindowDimensions.bind(this);
    this.unformatMoney = unformatMoney.bind(this);
    this.sumEntries = sumEntries.bind(this);
    this.mobileColumns = mobileColumns.bind(this)
    this.desktopColumns = desktopColumns.bind(this)
    this.copyEntry = copyEntry.bind(this)
  }
  
  componentDidMount() {
    const id = this.props.current_user.user_id
    const url = `${process.env.REACT_APP_API}/api/v1/entries/${id}`
    const token = localStorage.getItem('jwt')
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    }

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('orientationchange', this.updateWindowDimensions);
    fetch(url, options)
    .then(res => res.json())
    .then(res => this.setState({entries: res, loading: false}))
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('orientationchange', this.updateWindowDimensions);
  }


  render() {
    const data = this.state.entries;
    const windowWidth = this.state.windowWidth
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
          columns={windowWidth > 500 ? [{columns: this.desktopColumns()}] : [{columns: this.mobileColumns()}]}
          defaultPageSize={10}
          defaultSorted={[
            {
              id: "date",
              desc: true
            }
          ]}
          className="-striped -highlight"
          noDataText={this.state.loading ? "Loading" : "No Entries"}
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
        {/* INFO MODAL */}
        <EntryInfo
          open={this.state.open}
          closeModal={this.closeModal}
          category_name={this.state.form.category_name}
          date={this.state.form.date}
          amount={this.state.form.amount}
          notes={this.state.form.notes}
          askIfSure={this.askIfSure}
          openUpdateModal={this.openUpdateModal}
          copyEntry={this.copyEntry}
        />
        {/* UPDATE MODAL */}
        <UpdateEntry
          open={this.state.open}
          closeModal={this.closeModal}
          openUpdateModal={this.openUpdateModal}
          handleUpdate={this.handleUpdate}
          handleChange={this.handleChange}
          evaluateAmount={this.evaluateAmount}
          category_name={this.state.form.category_name}
          current_user={this.props.current_user}
          date={this.state.form.date}
          amount={this.state.form.amount}
          notes={this.state.form.notes}
        />
        {/* ARE YOU SURE MODAL */}
        <AreYouSure
          open={this.state.open}
          closeModal={this.closeModal}
          onOpen={this.askIfSure}
          handleDelete={this.handleDelete}
          message={"Are you sure?"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Table)