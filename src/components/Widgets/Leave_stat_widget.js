import React from "react";
import {
  PropTypes
} from "prop-types";
import classnames from 'classnames';
import {
  Chart
} from "react-google-charts";
import axios from 'axios';
import {
  API
} from '../../types';

class Leave_stat_widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paid: [],
      half: [],
      sick: [],
      data: []
    };
  }

  componentWillReceiveProps(){
    var api_path = API + '/common/leave_info_summary'
    
      var postData = {
        type: this.props.type,
      };
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer '+localStorage.jwtToken
        }
      };

      axios.post(api_path,postData,axiosConfig).then(res => {
        this.setState({data: res.data.data});
        console.log(this.state.data);
      });
  }

  componentDidMount() {
    //update the component at the mounting
    
    var api_path = API + '/common/leave_info_summary'
  
      var postData = {
        type: this.props.type,
      };
      
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer '+localStorage.jwtToken
        }
      };

      axios.post(api_path,postData,axiosConfig).then(res => {
        this.setState({data: res.data.data});
        console.log(this.state.data);
      });
  }

  render() {
    return ( 
      <div>
      <Chart chartType = "PieChart"
      data = {
        this.state.data
      }
      options = {
        {
          title : this.props.title,
          titleTextStyle: {
            fontSize: 14,
            bold: true
        },
          pieHole: 0.5,
          pieSliceTextStyle: {
            color: "white"
          },
          legend: "none",
          slices: {
            0: { color: '4169e1' },
            1: { color: 'A9A9A9' }
          }
        }
      }
      width = "100%" 
      />
      <p>{this.props.data1}</p>
      </div>
    );
  }
}

Leave_stat_widget.contextTypes = {
  router: PropTypes.object
}

export default (Leave_stat_widget);