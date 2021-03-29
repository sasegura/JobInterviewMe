import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
//import "./assets/fonts/GillSansNovaCnBold/style.css"
import "./App.scss"

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import FormPrepador from "views/FormPreparador/FormPreparador.js"
import ProfesionalesPreview from "views/ProfesionalesPreview/ProfesionalesPreview.component";
import AreaPersonal from "views/AreaPersonal/AreaPersonal.component";
import Footer from "components/Footer/Footer";
import { linkloginPage } from "configuracion/constantes";
import { linkpreparador } from "configuracion/constantes";
import { linkperfilpor } from "configuracion/constantes";
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path={linkperfilpor} component={ProfilePage} />
      <Route exact path={linkloginPage} component={LoginPage} />
      <Route exact path="/component" component={Components} />
      <Route exact path={linkpreparador} component={FormPrepador} />
      <Route exact path="/2" component={ProfesionalesPreview} />
      <Route exact path="/3" component={AreaPersonal} />
    </Switch>
    <Footer></Footer>
  </Router>,
  document.getElementById("root")
);
