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
          leave_type: 2,
          reason: ""
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      onSubmit(e){
        this.setState({isLoading:true , errors: {} });
        this.props.callback("event.target.value");  //something under testing
        e.preventDefault();
        console.log(this.state);
        this.props.makeLeaveRequest(this.state)
        .then(
          () => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Leave Request Submitted!'
            })  //look this is not showing
            
            this.setState({reason: "" , isLoading:false}) //resetting the data of the form
          },
          ({ response }) => {
            this.setState({ errors: response.data , isLoading:false})
          }
        );
        
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
        this.setState({ leave_type: value })
      };

  render() {
    const { errors , leave_type } = this.state;
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <h4>Employee Request Leave </h4>
          <div className="row">
            <div className="col-md-6">
              <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              minDate={moment()}
              placeholderText="Select Date"
              popperPlacement="bottom-start"
              popperModifiers={{
                flip: {
                  enabled: false
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false
                }
              }}
              />
              {errors && <span className="help-block" style={{color:'red'}}>{errors.err_msg}</span>}
            </div>
            <div className="col-md-6">
              <MultiToggle
              options={groupOptions}
              selectedOption={leave_type}
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
      </div>
    );
  }
}

RequestForm.propTypes = {
    makeLeaveRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };
  
RequestForm.protoTypes = {
  callback : PropTypes.func,
}
    
RequestForm.contextTypes ={
  router: PropTypes.object
}

export default (RequestForm);
