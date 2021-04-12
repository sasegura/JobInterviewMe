import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
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
import '../ProfilePage/ProfilePage.styles.scss'

import './AreaPersonal.style.scss'
import CardCitas from "components/CardCitas/CardCitas.component";

//conexion BBDD
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { urlUsuarios } from "configuracion/constantes";
import { urlProfesional } from "configuracion/constantes";
import { urlCitas } from "configuracion/constantes";

import { Link } from "react-router-dom";



const useStyles = makeStyles(styles);

export default function AreaPersonal(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );  

  //const id = props.location.search.split("?")[1]
  const id = 38;
  
  const [usuario, setUsuario] = useState(null)
  const [profesional, setProfesional] = useState(null)
  const [cita, setCita] = useState(null)
  const [NombreUsuariosCita, setNombreUsuariosCita] = useState(null)

  const [citasPendiente, setCitasPendiente] = useState(null)

  const [reload,setReload] = useState(true);

  const fechaHoy = new Date();
  

  useEffect(() => {
    if(reload){
      console.log("use")
      RefreshUsuario()
      setReload(false);
    }      
  }, [reload]);


  async function RefreshUsuario() {
    
    const citasProfesionalURL = "/citas?filter="
    const ProfesionalURL = "/profesionals/" + id;
    const UsuarioURL = "/usuarios/" + id;


    const otro = {
      where:{
      idprofesional: id       
      },  
      include: [{
        relation: "CitaUsuario"
      }]
    }    
   
    try {
      const citasProfesional = await AxiosConexionConfig.get(citasProfesionalURL + encodeURIComponent(JSON.stringify(otro)));
      setCitasPendiente(citasProfesional.data);
      const Profesionaal = await AxiosConexionConfig.get(ProfesionalURL);
      setProfesional(Profesionaal.data);
      const Usuarioo = await AxiosConexionConfig.get(UsuarioURL);
      setUsuario(Usuarioo.data);
       
    } catch (e) {
      console.log(e);
    }
  }
        

  return (
    <div>
      <Header
        color="white"
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />

      <Parallax id="sombra" small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">
          
            <Link to={"/perfilpro?"+(usuario !== null ? usuario.idusuario : "")}>
              <GridItem xs={12} sm={12} md={6}>
                <h3 className={classes.title + " nameTitle"}>{usuario !== null ? usuario.nombre : ""}</h3>
              </GridItem>
            </Link>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.container + " contenedorGris"}>
                   <h4>Próximas citas</h4>

                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {

                        const fechaA = cita.fecha.split("-");
                        const horaA = cita.hora.split(":");
                        const fechaCita =new Date(fechaA[0],fechaA[1]-1,fechaA[2],horaA[0],horaA[1]);

                        if(fechaCita >= fechaHoy){
                          return(
                            <CardCitas setReload={(value)=>setReload(value)} tipo={null} confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 

                   
                </div>               
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>  
              <div className={classes.container + " contenedorGris"}>
                   <h4>Historial</h4> 
                   {citasPendiente !== null ?
                      citasPendiente.map((cita, index) => {

                        const fechaA = cita.fecha.split("-");
                        const horaA = cita.hora.split(":");
                        const fechaCita =new Date(fechaA[0],fechaA[1]-1,fechaA[2],horaA[0],horaA[1]);

                        if(fechaCita < fechaHoy){
                          return(
                            <CardCitas tipo="deshabilitado" confirmada={cita.confirmada} lugar="activa" fecha={new Date(cita.fecha)} nombre={cita.CitaUsuario.nombre} toolTipsText="Confirmar Cita"></CardCitas>
                          )
                        }else{
                          return (<></>);
                        }
                      }                  
                      ) : <></>
                    } 
                   
                </div>              
                
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>   
                <div className={classes.container + " contenedorGris"}>
                   <h4>Información de contacto</h4> 
                   <h6>{usuario !== null ? usuario.nombre : ""}</h6>
                   <h6>{usuario !== null ? usuario.apellidos : ""}</h6>
                   <h6>{profesional !== null ? profesional.nombreperfil : ""}</h6>
                   <h6>{usuario !== null ? usuario.correo : ""}</h6>                  

                </div>    
              </GridItem>
            </GridContainer>

            
          </div>
        </div>
      </div>
    </div >
  );
}
