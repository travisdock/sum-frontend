import React from "react";
import { connect } from 'react-redux';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import React Popup
import Popup from "reactjs-popup";

// Imported Functions
import {
  openModal, closeModal, switchToUpdateModal,
  askIfSure, handleDelete, handleChange, handleUpdate
} from './modal_helpers.js'
import {
  updateWindowDimensions, unformatMoney, sumEntries,
  mobileColumns, desktopColumns
} from './table_helpers.js'

class Table extends React.Component {
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
    this.switchToUpdateModal = switchToUpdateModal.bind(this);
    this.askIfSure = askIfSure.bind(this);
    this.handleDelete = handleDelete.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleUpdate = handleUpdate.bind(this);
    this.updateWindowDimensions = updateWindowDimensions.bind(this);
    this.unformatMoney = unformatMoney.bind(this);
    this.sumEntries = sumEntries.bind(this);
    this.mobileColumns = mobileColumns.bind(this)
    this.desktopColumns = desktopColumns.bind(this)
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
        <Popup
        open={this.state.open === "info"}
        closeOnDocumentClick
        onClose={this.closeModal}
        >
        <div className="table-popup">
            <p>Amount: {"$" + Number(this.state.data.amount).toFixed(2)}</p>
            <p>Category: {this.state.data.category_name}</p>
            <p>Date: {this.state.data.date}</p>
            <p>Notes: {this.state.data.notes}</p>
            <button onClick={this.askIfSure}>Delete Entry</button>
            <button onClick={this.switchToUpdateModal}>Update Entry</button>
        </div>
        </Popup>
        {/* UPDATE MODAL */}
        <Popup
          open={this.state.open === "update"}
          closeOnDocumentClick
          onClose={this.closeModal}
          onOpen={this.switchToUpdateModal}
        >
          <div className="table-popup">
            <p>Update Entry</p>
            <form onSubmit={this.handleUpdate}>
                <select
                  name="category_name"
                  value={this.state.form.category_name}
                  onChange={this.handleChange}
                  >
                  {!!this.props.current_user.categories ? this.props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
                </select>
                <input
                  name="date"
                  type="date"
                  value={this.state.form.date}
                  onChange={this.handleChange}
                />
                <input
                  name="amount"
                  placeholder="0.00"
                  value={this.state.form.amount}
                  onChange={this.handleChange}
                />
                <textarea
                  name="notes"
                  placeholder="Entry details..."
                  rows="5"
                  cols="55"
                  value={this.state.form.notes}
                  onChange={this.handleChange}
                />
              <button type="submit" className="button">
                Submit
              </button>
            </form>

          </div>
        </Popup>
        {/* ARE YOU SURE MODAL */}
        <Popup
          open={this.state.open === "ask"}
          closeOnDocumentClick
          onClose={this.closeModal}
          onOpen={this.askIfSure}
        >
          <div className="table-popup">
            <p>Are You Sure?</p>
            <button onClick={this.handleDelete} >Delete</button>
            <button onClick={this.closeModal} >Close</button>
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