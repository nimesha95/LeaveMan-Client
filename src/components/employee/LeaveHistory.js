import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import {API} from '../../types';
import moment from 'moment';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class LeaveHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          errors: {},
          isLoading: false,
          leave_history: []
        };
    }
    componentDidMount() {
     var api_path = API + '/common/leave_history'
  
      var postData = {
        email: "test@test.com",
        password: "password"
      };
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer '+localStorage.jwtToken
        }
      };

      axios.post(api_path,postData,axiosConfig).then(res => {
        this.setState({leave_history: res.data.leave_history});
        console.log(this.state.leave_history);
      });
      }

    render() {
      const { errors, data} = this.state;
      return (
              <ReactTable
          data={this.state.leave_history}
          columns={[
                {
                  Header: "Date",
                  id: "date_moment",
                  accessor: request =>
                    moment(request.date_moment).format('MMMM Do YYYY')
                },
                {
                  Header: "Status",
                  accessor: "approved"
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
          defaultPageSize={4}
          className="-striped -highlight"
        />
      );
    }
}

  
  LeaveHistory.contextTypes ={
    router: PropTypes.object
  }

  function mapStateToProps(state){
    return {
      auth : state.auth
    }
  }

export default (connect(mapStateToProps))(LeaveHistory);
