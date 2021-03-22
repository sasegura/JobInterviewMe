import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import StepWizard from 'react-step-wizard';
import {ErrorMessage, Formik,Field} from "formik";
import * as yup from "yup";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";


import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './FormPreparador.styles.scss'
import CustomInput from "components/CustomInput/CustomInput";
import { InputAdornment } from "@material-ui/core";
import { Email, People } from "@material-ui/icons";
import Oferta from "./Oferta";
import Presentacion from "./Presentacion";

const useStyles = makeStyles(styles);

const FormPrepador=(props)=> {
  const classes = useStyles();
  const { ...rest } = props;
  const valoresIniciales={
    nombrePerfil:"",
    annosExperiencia:"",
    experiencia:"",
    imagenperfil: "",
    sectores:"",
    perfiles: "",
    idiomas: "",
  }
  const handleSubmit=(values)=> {
    console.log(values)
  }

  return (
    <div>
      <Header
        fixed
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      
      <Parallax small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>Presentación</h3>
            </GridItem>


          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
          <StepWizard isLazyMount={true}>
              <Presentacion/>
              <Oferta/>
          </StepWizard>        
      </div>
      <Footer />
    </div>
  );
}
export default FormPrepador;

const validationSchema = yup.object().shape({
  nombrePerfil: yup.string().required("Nombre de perfil requerido."),
  annosExperiencia: yup.string().required("Años de experiencia requerido."),
  experiencia: yup.string().required("Experiencia requerido."),
  imagenperfil: yup.string().required("Imagen de perfil requerido."),
  sectores: yup.string().required("Sectores requerido."),
  perfiles: yup.string().required("Perfiles requerido."),
  idiomas: yup.string().required("Idiomas requerido.")
});