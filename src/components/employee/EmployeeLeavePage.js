import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeLeaveRequest } from "../../actions/leaveAction";
import {getData} from "../../actions/widgetAction";
import RequestForm from "./RequestForm";
import Paid_leave_widget from "../Widgets/paid_leave_widget";
import NavPills from "../NavPills/NavPills";

// core components
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";

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

    const { makeLeaveRequest, getData } = this.props;

    return (
      <div>
        <div className="row">
          <Paid_leave_widget getData={getData} />
        </div>
        <div className="row">
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={6}>
              <NavPills
                color="primary"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Dashboard",
                    tabIcon: Dashboard,
                    tabContent: (
                      <span>
                        <RequestForm makeLeaveRequest={makeLeaveRequest} />
                      </span>
                    )
                  },
                  {
                    tabButton: "Callender",
                    tabIcon: Schedule,
                    tabContent: <span>Some stuff from srvere</span>
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

EmployeeLeavePage.propTypes = {
  auth: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired
};

EmployeeLeavePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(
  mapStateToProps,
  { makeLeaveRequest,getData }
)(EmployeeLeavePage);
