import React from "react";
import { PropTypes } from "prop-types";
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import MultiToggle from 'react-multi-toggle';

import 'react-datepicker/dist/react-datepicker.css';

const groupOptions = [
  {
    displayName: 'Full Day',
    value: 'full'
  },
  {
    displayName: 'Half',
    value: 'half'
  },
  {
    displayName: 'Sick Leave',
    value: 'sick'
  }
];

class RequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          errors: {},
          isLoading: false,
          groupSize: 2,
          reason: ""
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        this.props.makeLeaveRequest(this.state);
        }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

      onGroupSizeSelect(value){
        this.setState({ groupSize: value })
      };

  render() {
    const { errors , groupSize } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h4>Employee Request Leave </h4>
        <div className="row">
          <div className="col-md-6">
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            popperPlacement = "bottom-start"
            placeholderText="Select Date"
            />
          </div>
          <div className="col-md-6">
            <MultiToggle
            options={groupOptions}
            selectedOption={groupSize}
            onSelectOption={this.onGroupSizeSelect.bind(this)}
            
            />
          </div>
        </div>
      
        <div className={classnames("form-group",{'has-error': errors.reason})}>
          <label className="control-label">Reason</label>
          <input
            type="text"
            value={this.state.reason}
            onChange={this.onChange}
            name="reason"
            className="form-control"
          />
          {errors && <span className="help-block">{errors.reason}</span>}
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
