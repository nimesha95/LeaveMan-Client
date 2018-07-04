import React from "react";
import {Link } from "react-router-dom";

class LandingPageComponent extends React.Component{
  render(){
    
    return(
      <div className="jumbotron vertical-center">
      <div className="container my-container">
          <h1>Welcome to LeaveMan</h1>
          <p>UCSC Leave Management Portal</p>
          <p><Link className="btn btn-primary btn-lg" to="/signin">Login</Link></p>
          
          <p style={{marginTop: '5%'}}>Not a user yet?</p>
          <p><a href="#">Signup</a></p>
      </div>
      </div>
    );
  }
}

export default (LandingPageComponent);