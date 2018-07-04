import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ModalBody extends React.Component {
  render() {
    console.log(this.props.leaveInfo);
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
          <div class="panel panel-default">
          <div className="panel-header">
            <h4>User Info</h4>
            </div>
            <div className="panel-body">  
              <p>Name: <b>emp</b> </p>
              <p>Department: <b>{this.props.leaveInfo.UserInfo.dept}</b></p>
              <p>Username: <b>{this.props.leaveInfo.UserInfo.username}</b></p>
              <p>Registeration ID: <b>EMP001</b></p>
            </div>
          </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col-md-12">
          <div class="panel panel-default">
            <h4>Employee History</h4>
            <ReactTable
                data={this.props.leaveInfo.LeaveHistory}
                columns={[
                    {
                    Header: "Date",
                    accessor: "date"
                    },
                    {
                    Header: "Reason",
                    accessor: "reason"
                    },
                    {
                    Header: "Type",
                    accessor: "type"
                    }
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
                />
          </div>
          </div>
        </div>
      </div>
    );
  }
}



export default ModalBody;
