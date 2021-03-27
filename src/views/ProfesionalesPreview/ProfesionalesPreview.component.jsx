import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import profile from "../../assets/img/faces/christian.jpg";
import './ProfesionalesPreview.style.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Button from "components/CustomButtons/Button.js";
import idiomas from '../../assets/json/idiomas.json'
import Icono from 'views/Components/Icono/Icono.component';
import Canales from '../../assets/json/canales.json';

const useStyles = makeStyles(styles);


const ProfesionalesPreview = (props) => {
    const classes = useStyles();
    

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
        setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const { ...rest } = props;

    const idiomasArray = idiomas.idiomas;

    const ArrayProfesionales = Canales.canales;

    return (
        <>
          <Header
            fixed
            color="white"
            brand=""
            rightLinks={<HeaderLinks />}
            {...rest}
          />

<div
        className={classes.pageHeader}
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
          <div id="contenedor" className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={3}>
              <h4 className="titulo4">PREPARA TU ENTREVISTA</h4>              
              <span className="span">Profesionales a tu disposición</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
            <label id="color">Filtrar por:</label>
              <div className="filtrar">               
                <CustomInput
                    labelText="Sector"
                    id="sector"
                    formControlProps={{
                        fullWidth: false
                    }}
                    inputProps={{
                        type: "text",                        
                        autoComplete: "on"
                    }}
                />

                <CustomInput
                    labelText="Precio"
                    id="precio"
                    formControlProps={{
                        fullWidth: false
                    }}
                    inputProps={{
                        type: "text",                        
                        autoComplete: "on"
                    }}
                />

<               CustomInput
                    labelText="Idioma"
                    id="idioma"
                    formControlProps={{
                        fullWidth: false
                    }}
                    inputProps={{
                        type: "text",                        
                        autoComplete: "on"
                    }}
                />

                <CustomInput
                    labelText="Tipo"
                    id="tipo"
                    formControlProps={{
                        fullWidth: false
                    }}
                    inputProps={{
                        type: "text",                        
                        autoComplete: "on"
                    }}
                />

                <CustomInput
                    labelText="Hashtag"
                    id="hashtag"
                    formControlProps={{
                        fullWidth: false
                    }}
                    inputProps={{
                        type: "text",                        
                        autoComplete: "on"
                    }}
                />                    
              </div>
            </GridItem>
            </GridContainer>
      </div>

      
          
      
      <div id="contenedor1" className={classes.container}>
          <GridContainer justify="center">           


          {ArrayProfesionales !== null ?
        ArrayProfesionales
        .filter((profesional, index) => index < 3)
        .map((profesional, index) => (

            <GridItem xs={12} sm={12} md={4}>
              <Card id="cardProf" className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader id="cardheader" color="primary" className={classes.cardHeader}>                                     
                  </CardHeader>
                  
                  <CardBody>
                  <div className={classes.profile}>
                  <div className="divImg">
                    <img src={profile} alt="..." className="imgRaised imgRoundedCircle imgFluid" />  
                    <div id="letras">
                        <h3 className={classes.title}>{("Jose Raul").toUpperCase()}</h3>                         
                        <p>{profesional.codigo} años de experiencia</p>
                        <span className="span">#Deloitte #Consultoria #Derecho #Junior</span> 
                        <div>
                        {idiomasArray !== null ?
                        idiomasArray
                          .filter((idioma, index) => index < 3)
                          .map((idioma, index) => (
                              <Icono codigo={idioma.codigo} tipo="bandera" key={index} nombre={idioma.nombre} id={index} />
                          )) : <Fragment />}                     
                      </div> 
                    </div>                

                  </div>
                  
                  </div>
                  </CardBody>
                  
                  <CardFooter className={classes.cardFooter}>
                    <Button className="precio" simple color="primary" size="lg">
                      <spam className="precioText">45€ / 40’ entrevista</spam>
                    </Button>                    
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
            )) : <Fragment />}
          </GridContainer>
        </div>        
      
      
      </div>

         </> )



}

export default ProfesionalesPreview