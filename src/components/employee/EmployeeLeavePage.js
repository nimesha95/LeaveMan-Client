import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { makeLeaveRequest } from "../../actions/leaveAction";
import RequestForm from "./RequestForm";
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
            <Leave_stat_widget type="paid"/>
          </div>
          <div className="col-md-3">
            <Leave_stat_widget type="sick"/>
          </div>
          <div className="col-md-3">
            <Leave_stat_widget type="half"/>
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
          <GridContainer>
            <GridItem xs={9} sm={9} md={9} lg={9}>
              <NavPills
                color="primary"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 2 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
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
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
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
