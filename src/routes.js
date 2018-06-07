import React from "react";
import { Route, BrowserRouter, Switch} from "react-router-dom";
import { render } from "react-dom";

import App from "./components/App";

import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/signin/LoginPage";
import RequestLeavePage from "./components/leave_request/RequestLeavePage";
import AdminPage from "./components/admin/AdminPage";
import AcademicPage from "./components/academic/AcademicPage";
import DeptHeadPage from "./components/dept_head/DeptHeadPage";
import EmployeePage from "./components/employee/EmployeeLeavePage";
import requireAuth from './utils/requireAuth';

export default (
  <switch>
    <Route path="/" component={App}  />
    <Route path="/signup" component={SignupPage} />
    <Route path= "/signin" component={LoginPage} />
    <Route path="/request-leave" component={requireAuth(RequestLeavePage)} />
 
    <Route path="/admin" component={requireAuth(AdminPage)} />
    <Route path="/academic" component={requireAuth(AcademicPage)} />
    <Route path="/dept_head" component={requireAuth(DeptHeadPage)} />
    <Route path="/employee" component={requireAuth(EmployeePage)} />
  </switch>
);
