import React, { Fragment, useEffect, useState } from "react";


//componentes
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Icono from '../../components/Icono/Icono.component';
import Cargando from 'components/Cargando/Cargando.component'
import Button from "components/CustomButtons/Button.js";


//ANTD
import { Table, Tag, Tooltip } from 'antd';

//PrimeReact
import { addLocale } from 'primereact/api';
import { Calendar } from "primereact/calendar";

//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

//Conexión BBDD
import { urlProfesional } from "configuracion/constantes";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

//redux
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";

const useStyles = makeStyles(styles);


const ProfilePageCliente = (props) => {

    const classes = useStyles();
    const [date15, setDate15] = useState(null);


    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
      });

      /*async function RefreshUsuario() {
        const url = urlProfesional + "/" + id;
        try {
          const respuesta = await AxiosConexionConfig.get(url);
          //console.log(respuesta.data)
          setUsuario(respuesta.data);
          //setUsseName(props.global)
          //console.log(props.global)
        } catch (e) {
          console.log(e);
        }
      }*/


      const header = () => {
        return (
          <Header
            color="white"
            brand=""
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 200,
              color: "white"
            }}
          />
        )
      }
     const parallax = () => {
        return (
          <Parallax id="sombra" small filter color="headerGreen" >
    
            <div className={classes.container + " headerNameTitle"}>
              <GridContainer justify="flex-end">
    
                <GridItem xs={12} sm={12} md={4}>
                  <h3 className={classes.title + " nameTitle"}>Concertar Cita</h3>
                </GridItem>
    
                <GridItem xs={12} sm={12} md={2}>
                    
                </GridItem>
    
              </GridContainer>
            </div>
          </Parallax>
        )}
         
      const body = () => {
        return (
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>                
    
                <GridContainer>
                  
    
                  <GridItem id="calendario1" xs={12} sm={12} md={6}>
                    <div className="margen"></div>
                    {
                      //poner clase usuarioCliente cuando sea Cliente y cuando sea profesional quitarla para activar o desactivar el css del calendario
                    }
                    <Calendar className="usuarioCliente" locale="es" value={date15} onChange={(e) => setDate15(e.value)} minDate={new Date()} disabledDays={[1, 2]} inline />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <div></div>
                  </GridItem>

                  <div className="margen"></div>
                </GridContainer>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div>
    
          {header()}
          {parallax()
          }
    
          {props.global !== null ? body() :
    
            <Fragment>
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                  <div className={classes.container}>
                    <Cargando />
                  </div>
                </div>
              </div>
            </Fragment>}
    
        </div>
      );
    }
    
    const mapStateToProps = (rootReducer) => {
      return { global: rootReducer.auth };
    };
    
    export default connect(mapStateToProps, authAction)(ProfilePageCliente);
    


