import React from "react";
import { PropTypes } from "prop-types";
import classnames from 'classnames';
import { Chart } from "react-google-charts";
import axios from 'axios';
import {API} from '../../types';

class Paid_leave_widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           stuff : [],
        };
      }

    componentDidMount(){
        var api_path = API + '/common/leave_info_summary' 
        axios.get(api_path).then(res =>{
            var stuff = res.data.data;
            this.setState({stuff: stuff});
            console.log(stuff);
        });
    }

  render() {
    return (
        <Chart
        chartType="PieChart"
        data={this.state.stuff}
        options={{
          pieHole: 0.5,
          pieSliceTextStyle: {
            color: "black"
          },
          legend: "none"
        }}
        graph_id="piechart"
        width="100%"
        height="400px"
      />
    );
  }
}
  
Paid_leave_widget.contextTypes ={
    router: PropTypes.object
  }

export default (Paid_leave_widget);
