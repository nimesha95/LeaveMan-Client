import React from "react";
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import {makeLeaveRequest} from '../../actions/leaveAction';
import RequestForm from "./RequestForm";

class AdminPage extends React.Component{
  render(){
    var user_type = this.props.auth ? this.props.auth.user.user_type : "0";
    switch(user_type){
      case "adm":
        break;
      default:
        this.context.router.history.push("/");
        break;
    }
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

AdminPage.propTypes = {
  auth: PropTypes.object.isRequire
}

AdminPage.contextTypes ={
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    auth : state.auth
  }
}


export default (connect(mapStateToProps ,{makeLeaveRequest}))(AdminPage)
