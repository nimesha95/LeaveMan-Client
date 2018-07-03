import React from "react";
import {Link } from "react-router-dom";
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {logout} from '../actions/authAction';

class NavigationBar extends React.Component{
  logout(e){
    e.preventDefault();
    this.props.logout();
  }
  
  render(){
    const {isAuthenticated} = this.props.auth;

    //var user_type = this.props.auth ? this.props.auth.user.user_type : "0";
    
    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a className=" nav_nav" href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link className="nav_nav" to="/signup">Singup</Link></li>
        <li><Link className="nav_nav" to="/signin">Login</Link></li>
      </ul>
    );

    return(
      <nav className="navbar navbar-default navbar-custom " style={ {"margin-left": "-25px", "margin-right": "-25px","margin-bottom": "25px"}}>
      <div className="container-fluid" style={{paddingRight: '0px' , 'white-space': 'nowrap'}} >
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand nav_nav">
            LeaveMan
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </div>
    </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    auth : state.auth
  }
}

export default (connect(mapStateToProps, {logout}))(NavigationBar);