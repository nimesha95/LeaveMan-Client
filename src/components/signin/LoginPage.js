import React from "react";
import LoginForm from './LoginForm';
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import {login} from '../../actions/authAction';
import {addFlashMessage} from '../../actions/flashMessages';

class LoginPage extends React.Component{
  render(){
    const { login, addFlashMessage} = this.props;

    return (
      <div className="row" style={{marginTop:"10%"}}>
        <div className="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Login</h3>
            </div>
            <div class="panel-body">
              <LoginForm login={login} addFlashMessage={addFlashMessage} />
          </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default (connect(null ,{login,addFlashMessage}))(LoginPage)
