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
    var api_path = API + '/academic/confirm_leave'
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,{
      data: id,
      uname: this.props.leaveInfo.UserInfo.username,
      leave_date: this.props.leaveInfo.LeaveInfo.date,
    },axiosConfig).then(res => {
      console.log(res.data);
    });
  }

  declineLeave(id){
    var api_path = API + '/academic/Decline'
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
          <div className="col-md-5">
          <h3>Leave Request</h3>
            <p>Leave Date: <b>{this.props.leaveInfo.LeaveInfo.date}</b></p>
            <p>Type: <b>{this.props.leaveInfo.LeaveInfo.type}</b></p>
            <p>Reason: <b>{this.props.leaveInfo.LeaveInfo.reason}</b></p>
            <p>Request Made: <b>{new Date(parseInt(this.props.leaveInfo.LeaveInfo.timestamp)).toDateString()}</b></p>
            <p>Request Approved: <b>{new Date(parseInt(this.props.leaveInfo.LeaveInfo.approvedTimestamp)).toDateString()}</b></p>
            <p>Approved By: <b>{this.props.leaveInfo.LeaveInfo.approvedBy}</b></p>
          </div>
          <div className="col-md-2">
            <div className="row" style={{marginTop:"20%"}}>
              <button className="btn btn-success btn-lg" onClick={(e) => this.handleClick(e)}>
                Accept
              </button>
            </div>
            <div className="row" style={{marginTop:"20%"}}>
              <button className="btn btn-danger btn-lg" onClick={(e) => this.handleDeclineClick(e)}>
                Decline
              </button>
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
