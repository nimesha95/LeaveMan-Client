import React from "react";
import { hot } from "react-hot-loader";
import { PropTypes } from "prop-types";
import classnames from 'classnames';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          errors: {},
          isLoading: false
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      onSubmit(e){
        this.setState({isLoading:true , errors: {} });
        e.preventDefault();
        this.props
      .login(this.state)
      .then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have Logged in succesfully'
          })
          this.context.router.history.push("/");
        },
        ({ response }) => {
          this.setState({ errors: response.data , isLoading:false})
        }
      );
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

  render() {
    const { errors} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login </h1>

        { errors.err_msg && <div className="alert alert-danger">{errors.err_msg}</div>}

        <div className={classnames("form-group",{'has-error': errors.username})}>
          <label className="control-label">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.onChange}
            name="username"
            className="form-control"
          />
          {errors && <span className="help-block">{errors.username}</span>}
        </div>

        <div className={classnames("form-group",{'has-error': errors.password})}>
          <label className="control-label">Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            className="form-control"
          />
          {errors && <span className="help-block">{errors.password}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };
  
  LoginForm.contextTypes ={
    router: PropTypes.object
  }

export default (LoginForm);
