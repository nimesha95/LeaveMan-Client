import React from "react";
import SignupForm from './SignupForm';
import { connect } from "react-redux";
import {PropTypes} from 'prop-types';
import {userSignupRequest} from '../../actions/signupActions';
import {addFlashMessage} from '../../actions/flashMessages';

class SignupPage extends React.Component{
  render(){
    const { userSignupRequest, addFlashMessage} = this.props;

    return (
      <div className="row" style={{marginTop:"10%"}}>
        <div className="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Signup</h3>
            </div>
            <div class="panel-body">
              <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default (connect(null ,{userSignupRequest,addFlashMessage}) (SignupPage))
