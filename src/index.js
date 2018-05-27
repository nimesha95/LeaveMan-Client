import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route,Switch ,Link } from "react-router-dom";
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore , applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';

import routes from "./routes";
import App from "./components/App";
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from "./actions/authAction";
import jwt from 'jsonwebtoken';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) 
)

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}


render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}    
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
