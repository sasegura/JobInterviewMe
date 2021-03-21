import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
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
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <div xs={12} sm={12} md={10} className={"left40px margintop50px"}>             
                      <Formik initialValues={valoresIniciales} onSubmit={handleSubmit}
                          validationSchema={validationSchema}>
                          {({ handleSubmit}) => (
                              <form onSubmit={handleSubmit} className="register-form">
                                <GridContainer >
                                  <GridItem xs={12} sm={12} md={5}>
                                      <div >
                                          <label htmlFor={"nombrePerfil"} className="text textMarca">Nombre de tu perfil</label>
                                          <div>
                                              <Field id="nombrePerfil" name="nombrePerfil" type="text" className="with100"/>                                            
                                          </div>
                                          <div><ErrorMessage name={"nombrePerfil"} className="invalid-feedback">{message => <div><small className="p-error p-d-block">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                      <div className="p-field p-col p-md-6 p-col-12">
                                          <label htmlFor={"annosExperiencia"} className="text textMarca">Años de experiencia en RRHH</label>
                                          <div>
                                              <Field id="annosExperiencia" name="annosExperiencia" type="text" className="with100"/>                                            
                                          </div>
                                          <div><ErrorMessage name={"annosExperiencia"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                      <div className="p-field p-col p-md-6 p-col-12">
                                          <label htmlFor={"experiencia"} className="text textMarca">Tu experiencia (máx. 40 caracteres)</label>
                                          <div>
                                              <Field type="textarea" id="experiencia" name="experiencia" aria-describedby="username2-help" className="with100 height80px p-invalid p-d-block" />
                                          </div>
                                          <div><ErrorMessage name={"experiencia"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={5}>
                                      <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                              <div className="p-field p-col p-md-6 p-col-12">
                                                  <label htmlFor={"imagenperfil"} className="text textMarca">Imagen de perfil</label>
                                                  <div>
                                                      <Field id="imagenperfil" name="imagenperfil" type="text" className="with100"/>                                            
                                                  </div>
                                                  <div><ErrorMessage name={"imagenperfil"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                              </div>
                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={12}>
                                              <div className="p-field p-col p-md-6 p-col-12">
                                                  <label htmlFor={"sectores"} className="text textMarca">Sectores</label>
                                                  <div>
                                                      <Field id="sectores" name="sectores" type="text" className="with100"/>                                            
                                                  </div>
                                                  <div><ErrorMessage name={"sectores"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                              </div>
                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={12}>
                                              <div className="p-field p-col p-md-6 p-col-12">
                                                  <label htmlFor={"perfiles"} className="text textMarca">Perfiles</label>
                                                  <div>
                                                      <Field id="perfiles" name="perfiles" type="text" className="with100"/>                                            
                                                  </div>
                                                  <div><ErrorMessage name={"perfiles"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                              </div>
                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={12}>
                                              <div className="p-field p-col p-md-6 p-col-12">
                                                  <label htmlFor={"idiomas"} className="text textMarca">Idiomas</label>
                                                  <div>
                                                      <Field id="idiomas" name="idiomas" type="text" className="with100"/>                                            
                                                  </div>
                                                  <div><ErrorMessage name={"idiomas"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                              </div>
                                          </GridItem>
                                      </GridContainer>
                                  </GridItem>
                                </GridContainer>
                                <div className="p-field p-col p-md-6 p-col-12" >
                                    <div className={"center"} >
                                        <Button label="Submit" icon="pi pi-check" />
                                    </div>                                    
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
          </GridItem>
      </GridContainer>            
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