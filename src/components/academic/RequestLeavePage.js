import React from "react";
import { hot } from 'react-hot-loader';
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import {makeLeaveRequest} from '../../actions/leaveAction';
import RequestForm from "./RequestForm";

class RequestLeavePage extends React.Component{
  render(){
    
    const { makeLeaveRequest} = this.props;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <RequestForm makeLeaveRequest={makeLeaveRequest}/>
        </div>
      </div>
    )
  }
}

RequestForm.propTypes = {
    makeLeaveRequest: PropTypes.func.isRequired
}

export default (connect(null ,{makeLeaveRequest}))(RequestLeavePage)
