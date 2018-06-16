import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeLeaveRequest } from "../../actions/leaveAction";

import RequestForm from "./RequestForm";
import LeaveHistory from "./LeaveHistory";

import Leave_stat_widget from "../Widgets/Leave_stat_widget";
import NavPills from "../NavPills/NavPills";
import {addFlashMessage} from '../../actions/flashMessages';

// core components
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

import Calendar from 'react-calendar'

class EmployeeLeavePage extends React.Component {
  render() {
    var user_type = this.props.auth ? this.props.auth.user.user_type : "0";

    switch (user_type) {
      case "emp":
        break;
      default:
        this.context.router.history.push("/");
        break;
    }

    const { makeLeaveRequest} = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <Leave_stat_widget type="paid" title="Paid Leaves"/>
          </div>
          <div className="col-md-3">
            <Leave_stat_widget type="sick" title="Sick Leaves"/>
          </div>
          <div className="col-md-3">
            <Leave_stat_widget type="half" title="half Leaves"/>
          </div>
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-header">
                Activity Feed
              </div>
              <div className="panel-body">
                Basic panel example
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <GridContainer >
            <GridItem xs={9} sm={9} md={9} lg={9} >
              <NavPills
                color="primary"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 2 },
                  contentGrid: { xs: 12, sm: 9, md: 9 }
                }}
                tabs={[
                  {
                    tabButton: "Leave",
                    tabIcon: List,
                    tabContent: (
                      <span>
                        <RequestForm makeLeaveRequest={makeLeaveRequest} addFlashMessage={addFlashMessage}/>
                      </span>
                    )
                  },
                  {
                    tabButton: "Leave History",
                    tabIcon: Schedule,
                    tabContent: 
                      <span>
                        <LeaveHistory />
                      </span>
                  }
                ]}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} lg={3}>
              <Calendar />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

EmployeeLeavePage.propTypes = {
  auth: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

EmployeeLeavePage.contextTypes = {
  router: PropTypes.object
};

RequestForm.propTypes = {
  makeLeaveRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps,{ makeLeaveRequest,addFlashMessage })(EmployeeLeavePage);
