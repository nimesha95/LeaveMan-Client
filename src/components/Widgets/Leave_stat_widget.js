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

  componentDidMount() {
    //update the component at the mounting
    var api_path = API + '/common/leave_info_summary?type=' + this.props.type
    axios.get(api_path).then(res => {
      var stats = res.data.data;
      this.setState({
        data: stats
      })
      console.log(this.state)
    });
  }

  render() {
    return ( <
      Chart chartType = "PieChart"
      data = {
        this.state.data
      }
      options = {
        {
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
    );
  }
}

Leave_stat_widget.contextTypes = {
  router: PropTypes.object
}

export default (Leave_stat_widget);