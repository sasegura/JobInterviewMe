import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import "assets/fonts/GillSansNovaCnBold/style.css"
import "./App.scss"

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/1" component={ProfilePage} />
      <Route exact path="/login-page" component={LoginPage} />
      <Route exact path="/component" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
