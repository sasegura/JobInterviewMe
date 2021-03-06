import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import StepWizard from 'react-step-wizard';
import { ErrorMessage, Formik, Field } from "formik";
import * as yup from "yup";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";


import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './FormPreparador.styles.scss'
import Presentacion from "./Presentacion";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlProfesional, urlUsuarios } from "configuracion/constantes";
import LoginPage from "views/LoginPage/LoginPage";
import Oferta1 from "./Oferta1";
import { useHistory } from "react-router";
import { linkperfilpor } from "../../configuracion/constantes"

import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const FormPrepador = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombrePerfil, setNombrePerfil] = useState("")
  const [annosExperiencia, setannosExperiencia] = useState(0)
  const [experiencia, setexperiencia] = useState("")
  const [imagenperfil, setimagenperfil] = useState("")
  const [sectores, setsectores] = useState("")
  const [perfiles, setperfiles] = useState("")
  const [idiomas, setidiomas] = useState("")
  const [tipoPreparación, settipoPreparación] = useState("")
  const [duracion, setduracion] = useState("")
  const [canales, setcanales] = useState([])
  const [hashtags, setHashtags] = useState("")
  const [tarifa, settarifa] = useState(0)
  const [idusuario, setidUsuario] = useState("")
  const [agenda, setAgenda] = useState(null)
  const [existe, setExiste] = useState(false)
  const [load, setLoad] = useState(false)
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    password: password
  }
  const valoresIniciales = {
    nombrePerfil: nombre,
    annosExperiencia: annosExperiencia,
    experiencia: experiencia,
    imagenperfil: imagenperfil,
    sectores: sectores,
    perfiles: perfiles,
    idiomas: idiomas,
    hashtags: hashtags
  }
  const valoresSecundarios = {
    tarifa: tarifa,
    tipoPreparación: tipoPreparación,
    canales: canales,
    duracion: duracion,
    agenda: agenda
  }
  const handleSubmit = (values) => {
    console.log(values)
  }

  const setValoresUsuarios = (valores) => {
    console.log(valores)
    setNombre(valores.nombre)
    setApellido(valores.apellido)
    setEmail(valores.email)
    setidUsuario(valores.idusuario)
    //setPassword(valores.password)
    //setAgenda(valores.agenda)
    //console.log(valores)
    BuscarUsuarioPorEmail(valores.email)
    console.log(valores)
  }
  const primerosValores = (valores) => {
    setNombrePerfil(valores.nombrePerfil)
    setannosExperiencia(valores.annosExperiencia)
    setexperiencia(valores.experiencia)
    setimagenperfil(valores.imagenperfil)
    setsectores(valores.sectores)
    setperfiles(valores.perfiles)
    setidiomas(valores.idiomas)
    console.log(valores)
  }
  async function segundosValores(valores) {
    console.log(valores)
    settarifa(valores.tarifa)
    settipoPreparación(valores.tipoPreparacion)
    setcanales(valores.canales)
    setduracion(valores.duracion)
    setAgenda(valores.agenda)
    //setHashtags(valores.hashtags)
    //UploadUsuario()
    if (idusuario !== "") {
      const dataValue = {
        idusuario: idusuario,
        nombreperfil: nombrePerfil,
        annosexperiencia: annosExperiencia,
        experiencia: experiencia,
        imagen: (imagenperfil !== undefined && imagenperfil[0] !== undefined ? imagenperfil[0].thumbUrl : null),
        sectores: sectores.toString(),
        perfiles: perfiles.toString(),
        idiomas: idiomas.toString(),
        tipopreparacion: valores.emailtipoPreparacion,
        duracion: valores.duracion,
        hashtags: hashtags,
        canales: valores.canales.toString(),
        tarifa: valores.tarifa
      }
      //console.log(dataValue)
      const url = urlProfesional;
      try {
        const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
        if (respuesta.status === 200) {
          props.setUsuario(dataValue)
          history.push(linkperfilpor + "?" + idusuario)
          //return (<Link to={linkperfilpor}/>)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  /*useEffect(() => {
    
  }, [load]);
*/
  /*useEffect(() => {
    if (idusuario !== "" && !existe) {
      uploadData()
    }
  }, [idusuario]);
*/
  const history = useHistory()
  /*useEffect(() => {
    console.log(existe)
    if (existe) {
      history.push(linkperfilpor + "?" + idusuario)
    }
  }, [existe]);
*/


  async function UploadUsuario() {
    const dataValue = {
      correo: email,
      nombre: nombrePerfil
    }
    const url = urlUsuarios;
    try {
      const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
      console.log(respuesta)
      if (respuesta.status === 200) {
        setidUsuario(respuesta.data.idusuario)
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function BuscarUsuarioPorEmail(usuarioEmail) {
    const condisiones = JSON.stringify({ where: { correo: { like: '%' + usuarioEmail + '%' } } })
    const url = urlUsuarios + "?filter=" + encodeURIComponent(condisiones);
    try {
      const respuesta = await AxiosConexionConfig.get(url);
      console.log(respuesta.data[0].idusuario)
      if (respuesta.data.length > 0) {
        //setidUsuario(respuesta.data[0].idusuario)
        setExiste(true)

      }
    } catch (e) {
      console.log(e);
    }
  }

  async function uploadData() {
    const dataValue = {
      idusuario: idusuario,
      nombreperfil: nombrePerfil,
      annosexperiencia: annosExperiencia,
      experiencia: experiencia,
      imagen: (imagenperfil !== undefined && imagenperfil[0] !== undefined ? imagenperfil[0].thumbUrl : null),
      sectores: sectores.toString(),
      perfiles: perfiles.toString(),
      idiomas: idiomas.toString(),
      tipopreparacion: tipoPreparación,
      duracion: duracion,
      hashtags: hashtags,
      canales: canales.toString(),
      tarifa: tarifa
    }
    //console.log(dataValue)
    const url = urlProfesional;
    try {
      const respuesta = await AxiosConexionConfig.post(url, JSON.stringify(dataValue));
      if (respuesta.status === 200) {
        props.setUsuario(dataValue)
        history.push(linkperfilpor + "?" + idusuario)
        //return (<Link to={linkperfilpor}/>)
      }
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

      <Parallax small color="headerGreen" >

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
          <LoginPage usuario={usuario} setValoresUsuarios={(valores) => { setValoresUsuarios(valores) }} />
          <Presentacion valores={valoresIniciales} primerosValores={(valores) => { primerosValores(valores) }} />
          <Oferta1 valores={valoresSecundarios} segundosValores={(valores) => { segundosValores(valores) }} />
        </StepWizard>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(FormPrepador);

