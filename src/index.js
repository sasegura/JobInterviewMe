import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

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
import { linkSearchPage } from "configuracion/constantes";
import LogUpPage from "views/LogUpPage/LogUpPage.component";
import Oferta1 from "views/FormPreparador/Oferta1";
import store from "./store/reducers/rootReducer";
import { Provider } from 'react-redux';
var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path={linkperfilpor} component={ProfilePage} />
        <Route exact path={linkloginPage} component={LoginPage} />
        <Route exact path="/component" component={Components} />
        <Route exact path={linkpreparador} component={FormPrepador} />
        <Route exact path={linkSearchPage} component={ProfesionalesPreview} />
        <Route exact path="/3" component={AreaPersonal} />
        <Route exact path="/logup-page" component={LogUpPage} />


      </Switch>
      <Footer></Footer>
    </Router> 
  </Provider>,
  document.getElementById("root")
);
