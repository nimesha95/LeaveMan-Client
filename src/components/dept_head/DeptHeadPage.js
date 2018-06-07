import React from "react";
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import {makeLeaveRequest} from '../../actions/leaveAction';
import RequestForm from "./RequestForm";

class DeptHeadPage extends React.Component{
  render(){
    var user_type = this.props.auth ? this.props.auth.user.user_type : "0";
    
    switch(user_type){
      case "dpt":
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


DeptHeadPage.propTypes = {
  auth: PropTypes.object.isRequire
}

DeptHeadPage.contextTypes ={
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    auth : state.auth
  }
}

export default (connect(mapStateToProps ,{makeLeaveRequest}))(DeptHeadPage)
