import React from "react";
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import {API} from '../../types';
import Modal from 'react-responsive-modal';

import ModalBody from "./ModalBody";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class DeptHeadPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
      toApprove: [],
      leaveInfo: [],
      open1: false,
      data1 : "",
      events: []
    };
  }

  componentDidMount() {
    this.fetchAgain();
    this.fetchCallender();
  }

  formChild1(params) {
    this.setState({
      open1 : params
    })
    this.fetchAgain();
  }

  fetchAgain(){
    var api_path = API + '/dept_head/toApprove'
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,axiosConfig).then(res => {
      this.setState({toApprove: res.data});
      console.log(res.data);
    });
  }

  fetchCallender(){
    var api_path = API + '/dept_head/Callender'
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,axiosConfig).then(res => {
      this.setState({events: res.data.schedule})
    });
  }

  printThis(_id){
    var api_path = API + '/dept_head/toApprove';
    var postData = {
      _id: _id
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

     axios.post(api_path,postData,axiosConfig).then(res => {
       this.setState({ open1: true ,leaveInfo: res.data });
       console.log(this.state);
     });
  }

  onOpenModal = () => {
    this.setState({ open1: true });
  };

  onCloseModal = () => {
    this.setState({ open1: false });
  };

  render(){
    var user_type = this.props.auth ? this.props.auth.user.user_type : "0";
    switch(user_type){
      case "dpt":
        break;
      default:
        this.context.router.history.push("/");
        break;
    }
    return (
      <div className="row">
        <div className="col-md-6" style={{height: '400px'}}>
          <ReactTable
            data={this.state.toApprove}
            columns={[
              {
                Header: "Date",
                id: "date_moment",
                accessor: request =>
                  moment(request.date_moment).format('MMMM Do YYYY')
              },
              {
                Header: "Username",
                accessor: "username"
              },
              {
                Header: "Reason",
                accessor: "reason"
              },
              {
                Header: "Type",
                accessor: "type"
              },
              {
                Header: "",
                accessor: "_id",
                Cell: ({value}) => (<button className="btn btn-primary" onClick={()=>this.printThis(value)}>Approve</button>)
              }
        ]}
            defaultPageSize={7}
            className="-striped -highlight"
          />
          </div>
        <div className="col-md-6" style={{height: '400px'}}>
          <BigCalendar
            events={this.state.events}
            views={['month', 'agenda']}
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
          />
        </div>
        <div>
          <Modal open={this.state.open1} onClose={this.onCloseModal} center >
            <p style={{width:"800px"}}></p>
            <ModalBody leaveInfo={this.state.leaveInfo} callback={this.formChild1.bind(this)}/>
          </Modal>
        </div>
      </div>
    )
  }
}


DeptHeadPage.propTypes = {
  auth: PropTypes.object.isRequired
}

DeptHeadPage.contextTypes ={
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    auth : state.auth
  }
}

export default (connect(mapStateToProps))(DeptHeadPage)