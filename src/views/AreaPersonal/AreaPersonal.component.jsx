import React from "react";
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


const useStyles = makeStyles(styles);

export default function AreaPersonal(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );  

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

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>Sergio Antonio Segura Fernández</h3>
            </GridItem>

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
                   <CardCitas tipo="warning" nombre="Isa" toolTipsText="Cita próxima sin confirmar"></CardCitas>
                   <CardCitas tipo="pendiente" nombre="Isa" toolTipsText="Confirmar Cita"></CardCitas>
                   <CardCitas tipo="aceptado" nombre="Isa" toolTipsText="Cita confirmada"></CardCitas>
                </div>               
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>  
              <div className={classes.container + " contenedorGris"}>
                   <h4>Historial</h4> 
                   <CardCitas tipo="deshabilitado" nombre="Isa"  toolTipsText=""></CardCitas>
                   <CardCitas tipo="deshabilitado" nombre="Isa" toolTipsText=""></CardCitas>
                   <CardCitas tipo="deshabilitado" nombre="Isa" toolTipsText=""></CardCitas>
                </div>              
                
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>   
                <div className={classes.container + " contenedorGris"}>
                   <h4>Información de contacto</h4> 
                </div>             
                
              </GridItem>

            </GridContainer>

            
          </div>
        </div>
      </div>
    </div >
  );
}
