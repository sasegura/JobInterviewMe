import React, { useEffect, useState } from "react";
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
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlProfesional, urlUsuarios } from "configuracion/constantes";

const useStyles = makeStyles(styles);

const FormPrepador=(props)=> {
    const classes = useStyles();
    const { ...rest } = props;
    const [nombrePerfil, setNombrePerfil]=useState("")
    const [annosExperiencia, setannosExperiencia]=useState(0)
    const [experiencia, setexperiencia]=useState("")
    const [imagenperfil, setimagenperfil]=useState("")
    const [sectores, setsectores]=useState("")
    const [perfiles, setperfiles]=useState("")
    const [idiomas, setidiomas]=useState("")
    const [tpreparación, settpreparación]=useState("")
    const [duracion, setduracion]=useState(0)
    const [canales, setcanales]=useState("")
    const [tarifa, settarifa]=useState(0)
    const [idusuario, setidUsuario]=useState("")
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

    const primerosValores=(valores)=>{          
        setNombrePerfil(valores.nombrePerfil)
        setannosExperiencia(valores.annosExperiencia)
        setexperiencia(valores.experiencia)
        setimagenperfil(valores.imagenperfil)
        setsectores(valores.sectores)
        setperfiles(valores.perfiles)
        setidiomas(valores.idiomas)
    }
    const segundosValores=(valores)=>{
        console.log(valores)
        settarifa(valores.tarifa)
        settpreparación(valores.tpreparación)
        setcanales(valores.canales)
        setduracion(valores.duracion)
        UploadUsuario()
        /*if(idusuario!==""){
          uploadData()
        }*/
    }

    useEffect(() => {
      if(idusuario!==""){
          uploadData()
      }
    }, [idusuario]);

    async function UploadUsuario(){
      const url = urlUsuarios;      
      try {
          const respuesta = await AxiosConexionConfig.post(url,JSON.stringify({}));
          console.log(respuesta)
          if(respuesta.status===200){
            setidUsuario(respuesta.data.idusuario)            
          }
      } catch (e) {
          console.log(e);
      }
  }

    async function uploadData(){
        const dataValue={
            idusuario:idusuario,
            nombreperfil:nombrePerfil,
            annosexperiencia:annosExperiencia,
            experiencia:experiencia,
            imagen: imagenperfil,
            sectores:sectores,
            perfiles: perfiles,
            idiomas: idiomas,
            tipopreparacion: tpreparación,
            duracion: duracion,
            hashtags: canales,
            tarifa: tarifa
        }
        console.log(dataValue)


        const url = urlProfesional;
        
        try {
            const respuesta = await AxiosConexionConfig.post(url,JSON.stringify(dataValue));          
            console.log(respuesta)
        } catch (e) {
            console.log(e);
        }
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
              <Presentacion primerosValores={(valores)=>{primerosValores(valores)}}/>
              <Oferta segundosValores={(valores)=>{segundosValores(valores)}}/>
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