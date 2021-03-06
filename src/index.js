import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

//CSS
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "assets/scss/material-kit-react.scss?v=1.9.0";
//import "./assets/fonts/GillSansNovaCnBold/style.css"
import "./App.scss"

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import FormPrepador from "views/FormPreparador/FormPreparador.js"
import ProfesionalesPreview from "views/ProfesionalesPreview/ProfesionalesPreview.component";
import AreaPersonal from "views/AreaPersonal/AreaPersonal.component";
import AreaPersonalClient from "views/AreaPersonal/AreaPersonalClient.component";


//configuracion
import { linkloginPage } from "configuracion/constantes";
import { linkpreparador } from "configuracion/constantes";
import { linkperfilpor } from "configuracion/constantes";
import { linkSearchPage } from "configuracion/constantes";
import { linklogout } from "configuracion/constantes";


//import LogUpPage from "views/LogUpPage/LogUpPage.component";
import store from "./store/reducers/rootReducer";
import { Provider } from 'react-redux';
var hist = createBrowserHistory();

//componentes
import Footer from "components/Footer/Footer";
import LogOut from "./components/LogOut/LogOut";
import Cargando from "components/Cargando/Cargando.component";
import Presentacion from "views/FormPreparador/Presentacion";
import { linkAreaPersonalCliente } from "configuracion/constantes";
import { linkAreaPersonalProfesional } from "configuracion/constantes";
import { linkperfilporClient } from "configuracion/constantes";
import ProfilePageCiente from "views/ProfilePage/ProfilePageCiente";
import { linkContratarCita } from "configuracion/constantes";
import ContratarCita from "views/ContratarCita/ContratarCita.component";



ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path={linkperfilpor} component={ProfilePage} />
        <Route exact path={linkloginPage} component={LoginPage} />
        <Route exact path={linkpreparador} component={FormPrepador} />
        <Route exact path={linkSearchPage} component={ProfesionalesPreview} />
        <Route exact path={linkAreaPersonalProfesional} component={AreaPersonal} />
        <Route exact path={linkAreaPersonalCliente} component={AreaPersonalClient} />
        <Route exact path={linklogout} component={LogOut} />
        <Route exact path="/cargando" component={Cargando} />
        <Route exact path="/presentacion" component={Presentacion} />
        <Route exact path={linkperfilporClient} component={ProfilePageCiente} />
        <Route exact path={linkContratarCita} component={ContratarCita} />






      </Switch>
      <Footer></Footer>
    </Router>
  </Provider>,
  document.getElementById("root")
);
