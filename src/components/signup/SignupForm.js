import React from "react";
import { PropTypes } from "prop-types";
import classnames from 'classnames';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({isLoading:true , errors: {} });
    e.preventDefault();
    this.props
      .userSignupRequest(this.state)
      .then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You have Signeup succesfully'
          })
          this.context.router.history.push("/signin");
        },
        ({ response }) => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Username Already exists'
          })
          this.setState({ errors: response.data , isLoading:false})
        }
      );
  }

  render() {
    const { errors } = this.state;
    return (
          <form onSubmit={this.onSubmit}>
            <div className="card-header card-header-primary text-center">
              <h4>Join US </h4>
            </div>
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

            <div className={classnames("form-group",{'has-error': errors.passwordConfirmation})}>
              <label className="control-label">Retype Password</label>
              <input
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.onChange}
                name="passwordConfirmation"
                className="form-control"
              />
              {errors && <span className="help-block">{errors.passwordConfirmation}</span>}
            </div>

            <div className="form-group">
              <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Signup</button>
            </div>
          </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

SignupForm.contextTypes ={
  router: PropTypes.object
}

export default (SignupForm);
