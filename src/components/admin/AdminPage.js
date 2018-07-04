import React from "react";
import {PropTypes} from 'prop-types';
import { connect } from "react-redux";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import classnames from 'classnames';
import axios from 'axios';
import {API} from '../../types';

import Modal from 'react-responsive-modal';

import ModalBody from "./ModalBody";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


const options = [
  'User Information', 'Leave History', 'Leave Statistics'
]

class AdminPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      _onSelect:"",
      errors: {},
      isLoading: false,
      empid:"",
      user_stat:{},
      selected: options[0]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    //console.log('You selected ', option)
    this.setState({selected: option})
  }

  onSubmit(e){
    this.setState({isLoading:true , errors: {} });
    e.preventDefault();
    //console.log(this.state.selected);

    var api_path = API + '/admin/getEmpStat'
    var postData = {
      uname: this.state.empid
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer '+localStorage.jwtToken
      }
    };

    axios.post(api_path,postData,axiosConfig).then(res => {
      if(res.data.errors){
        this.setState({errors: res.data.errors , isLoading:false})
      }
      else{
        this.setState({user_stat: res.data , isLoading:false , open1:true});
      }
      console.log(this.state);
    });

    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    onOpenModal = () => {
      this.setState({ open1: true });
    };
  
    onCloseModal = () => {
      this.setState({ open1: false });
    };
  
  componentDidMount(){
    console.log(this.state);
  }

  render(){
    const { errors } = this.state;
    const defaultOption = this.state.selected
    var user_type = this.props.auth ? this.props.auth.user.user_type : "0";
    switch(user_type){
      case "adm":
        break;
      default:
        this.context.router.history.push("/");
        break;
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">Leave Statistics for the day</div>
            <div class="panel-body">
              <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
            </div>
          </div>
          </div>
        <div className="col-md-6">
        <div class="panel panel-default">
            <div class="panel-heading">Generate Employee Information</div>
            <div class="panel-body">
            <form onSubmit={this.onSubmit}>
          
                <div className={classnames("form-group",{'has-error': errors.empid})}>
                  <label className="control-label">Employee ID: </label>
                  <input
                    type="text"
                    value={this.state.empid}
                    onChange={this.onChange}
                    name="empid"
                    className="form-control"
                  />
                  {errors && <span className="help-block">{errors.empid}</span>}
                </div>
                <div className="form-group">
                  <button style={{marginLeft:"90%"}} disabled={this.state.isLoading} className="btn btn-primary btn-sm">Submit</button>
                </div>
            </form>
            </div>
          </div>
        </div>
        <div>
          <Modal open={this.state.open1} onClose={this.onCloseModal} center >
            <p style={{width:"800px"}}></p>
            <ModalBody leaveInfo={this.state.user_stat}/>
          </Modal>
        </div>
      </div>
    )
  }
}


AdminPage.propTypes = {
  auth: PropTypes.object.isRequired
}

AdminPage.contextTypes ={
  router: PropTypes.object
}

function mapStateToProps(state){
  return {
    auth : state.auth
  }
}


export default (connect(mapStateToProps))(AdminPage)
