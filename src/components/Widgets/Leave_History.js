import React from "react";
import {PropTypes} 
from "prop-types";
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import {API} from '../../types';

class Leave_stat_widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
  }

  
  componentDidMount() {
    //update the component at the mounting
    
    var api_path = API + '/admin/chart_stat'
    
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Bearer '+localStorage.jwtToken
        }
      };

      axios.post(api_path,axiosConfig).then(res => {
        this.setState({data_dump: res.data.counts});
        
        
        var data = {
            labels: [],
            datasets: [
              {
                label: 'Leave Request Per Day',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
              }
            ]
          };
        
          Object.keys(res.data.counts).forEach(function(key) {
            data.labels.push(key)
            data.datasets[0].data.push(res.data.counts[key])
            console.log('Key : ' + key + ', Value : ' + res.data.counts[key])
          })
          
          console.log(res.data.counts)
          this.setState({data:data})
      });
  }

  
  render() {
    var options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0
            }    
          }]
        }
      };
    return ( 
        <div>
            <h2>Line Example</h2>
            <Line data={this.state.data} options={options} />
        </div>
    );
  }
}

Leave_stat_widget.contextTypes = {
  router: PropTypes.object
}

export default (Leave_stat_widget);