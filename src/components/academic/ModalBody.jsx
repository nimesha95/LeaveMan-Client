import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import axios from 'axios';
import {API} from '../../types';

class ModalBody extends React.Component {

  handleClick() {
    this.props.callback(false);
    this.acceptLeave(this.props.leaveInfo.LeaveInfo._id)
  }

  handleDeclineClick(){
    this.props.callback(false);
    this.declineLeave(this.props.leaveInfo.LeaveInfo._id)
  }

  acceptLeave(id){
    var api_path = API + '/dept_head/Approve'
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,{
      data: id
    },axiosConfig).then(res => {
      console.log(res.data);
    });
  }

  declineLeave(id){
    var api_path = API + '/dept_head/Decline'
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,{
      data: id
    },axiosConfig).then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <h3>User Info</h3>
            <p>Name: something from server </p>
            <p>Department: {this.props.leaveInfo.UserInfo.dept}</p>
            <p>Username: {this.props.leaveInfo.UserInfo.username}</p>
            <p>Registeration ID: something from server</p>
          </div>
          <div className="col-md-5">
            <h3>Leave Request</h3>
            <p>Date: {this.props.leaveInfo.LeaveInfo.date}</p>
            <p>Type: {this.props.leaveInfo.LeaveInfo.type}</p>
            <p>Reason: {this.props.leaveInfo.LeaveInfo.reason}</p>
            <p>Request Made: {this.props.leaveInfo.LeaveInfo.timestamp}</p>
            <p>Request Approved: {this.props.leaveInfo.LeaveInfo.approvedTimestamp}</p>
            <p>Approved By: {this.props.leaveInfo.LeaveInfo.approvedBy}</p>
          </div>
          <div className="col-md-2">
            <div className="row">
              <button onClick={(e) => this.handleClick(e)}>
                Accept
              </button>
            </div>
            <div className="row">
              <button onClick={(e) => this.handleDeclineClick(e)}>
                Decline
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
    );
  }
}



export default ModalBody;
