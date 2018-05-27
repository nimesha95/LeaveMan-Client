import React from "react";
import { hot } from 'react-hot-loader'
import LoginForm from './LoginForm';
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import {login} from '../../actions/authAction';
import {addFlashMessage} from '../../actions/flashMessages';

class LoginPage extends React.Component{
  render(){
    const { login, addFlashMessage} = this.props;

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm login={login} addFlashMessage={addFlashMessage} />
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
