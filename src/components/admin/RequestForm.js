import React from "react";
import { PropTypes } from "prop-types";
import classnames from 'classnames';

class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: "",
          errors: {},
          isLoading: false
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      onSubmit(e){
        e.preventDefault();
        this.props.makeLeaveRequest(this.state);
        }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

  render() {
    const { errors} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Admin View</h1>

        { errors.err_msg && <div className="alert alert-danger">{errors.err_msg}</div>}

        <div className={classnames("form-group",{'has-error': errors.date})}>
          <label className="control-label">Date</label>
          <input
            type="text"
            value={this.state.date}
            onChange={this.onChange}
            name="date"
            className="form-control"
          />
          {errors && <span className="help-block">{errors.date}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Submit</button>
        </div>
      </form>
    );
  }
}

RequestForm.propTypes = {
    makeLeaveRequest: PropTypes.func.isRequired
  };
  
  RequestForm.contextTypes ={
    router: PropTypes.object
  }

export default (RequestForm);
