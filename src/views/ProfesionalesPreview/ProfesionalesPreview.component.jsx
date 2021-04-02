import React, { Fragment, useEffect, useState } from 'react';
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
import { useHistory } from 'react-router';
import { linkperfilpor } from 'configuracion/constantes';
import { urlProfesional } from 'configuracion/constantes';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { AutoComplete } from 'primereact/autocomplete';

import sectorJSON from '../../assets/json/sectores.json';
import idiomasJSON from '../../assets/json/idiomas.json';

const useStyles = makeStyles(styles);


const ProfesionalesPreview = (props) => {
    const classes = useStyles();
    const history=useHistory()
    const [profesionales, setProfesionales]=useState(null)
    const [contentFirst, setContentFirst] = useState(0);
    const [contentRows, setContentRows] = useState(9);
    const [cantidadProfesionales, setCantidadProfesionales]=useState()
    const [getTarifa, setTarifa] = useState("");
    const [profesionalesList, setProfesionalesList]=useState([])
    const [reload, setReload] = useState(false);
    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [selectedIdiomas, setSelectedIdiomas] = useState(null);
    const [filteredIdiomas, setFilteredIdiomas] = useState(null);

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
        setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const { ...rest } = props;

    //const idiomasArray = idiomas.idiomas;

    const ArrayProfesionales = Canales.canales;
    
    const goToPerfil=(id)=>{
        history.push(linkperfilpor+"?"+id)
    }

    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);


    useEffect(() => {
      RefreshUsuario()
      cantidadProf()
    }, [contentFirst,getTarifa, reload]);

    const restaurar=()=>{
      setContentFirst(0)
    }
    async function RefreshUsuario(){
      const url = urlProfesional+"?filter=";  
      //console.log(selectedIdiomas)
      //let urlplus="?filter=%7B%0A%20%20%22offset%22%3A%20"+contentFirst+"%2C%0A%20%20%22limit%22%3A%20"+contentRows+"%0A%7D"
      let idiomas=idiomasJSON.idiomas[0].codigo
      const requestOptions = JSON.stringify({
        offset:contentFirst,
        limit:contentRows,
        where: {and:[
          {tarifa:{lte: (getTarifa===0||getTarifa==="")?1000000:getTarifa}},
          (selectedIdiomas!==null&&selectedIdiomas!=="")?{idiomas:{like:'%'+selectedIdiomas.codigo+'%'}}:
          {idiomas:{like:'%'+idiomas+'%'}}          
        ]
                
          }
      }); 
      let urlencode=encodeURIComponent(requestOptions);
      try {
          const respuesta = await AxiosConexionConfig.get(url+urlencode );
          //console.log(respuesta.data)
          setProfesionales(respuesta.data)
      } catch (e) {
          console.log(e);
      }
    }
    async function cantidadProf(){
      const url = "/profesionals/count?where=";  
      let idiomas=idiomasJSON.idiomas[0].codigo
      const requestOptions = JSON.stringify({ 
         and:[
            {tarifa:{lte: (getTarifa===0||getTarifa==="")?1000000:getTarifa}} ,
            (selectedIdiomas!==null&&selectedIdiomas!=="")?{idiomas:{like:'%'+selectedIdiomas.codigo+'%'}}:
            {idiomas:{like:'%'+idiomas+'%'}}
         ]
      }); 
      let urlencode=encodeURIComponent(requestOptions);
      try {
          const respuesta = await AxiosConexionConfig.get(url+urlencode);
          //console.log(respuesta.data)
          setCantidadProfesionales(respuesta.data.count)
          //setProfesionales(respuesta.data)
      } catch (e) {
          console.log(e);
      }
    }
    const searchIdioma = (event) => {
        setTimeout(() => {
            let _filteredIdioma;
            if (!event.query.trim().length) {
                _filteredIdioma = [...idiomas];
            }
            else {
                _filteredIdioma = idiomas.filter((idiom) => {
                    return idiom.nombre.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredIdiomas(_filteredIdioma);
        }, 250);
    }
    
    const ProfesionalCard=(profesional)=>{
      return(
        <Card id="cardProf" className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader id="cardheader" color="primary" className={classes.cardHeader}>                                     
                  </CardHeader>
                  
                  <CardBody>
                  <div className={classes.profile}>
                  <div className="divImg">
                    <img src={"data:image/png;base64,"+profesional.imagen} alt="..." className="imgRaised imgRoundedCircle imgFluid" />  
                    <div id="letras">
                        <h3 className={classes.title}>{(profesional.nombreperfil).toUpperCase()}</h3>                         
                        <p>{profesional.annosexperiencia} años de experiencia</p>
                        <span className="span">{profesional.hashtags}</span> 
                        <div>
                        {profesional.idiomas !== null ?
                        profesional.idiomas.split(",")
                          .map((idioma, index) => (
                              <Icono codigo={idioma} tipo="bandera" key={index} nombre={idioma} id={index} />
                          )) : <Fragment />}                     
                      </div> 
                    </div>
                  </div>
                  </div>
                  </CardBody>
                  
                  <CardFooter className={classes.cardFooter}>
                    <Button className="precio" simple color="primary" onClick={()=>goToPerfil(profesional.idusuario)} size="lg">
                      <span className="precioText">{profesional.tarifa}€ / {profesional.duracion}’ entrevista</span>
                    </Button>                    
                  </CardFooter>
                </form>
              </Card>
      )
    }
    const Profesionales=()=>{
        return(
          <div id="contenedor1" className={classes.container}>
            <GridContainer justify="center">           


            {profesionales !== null ?
            profesionales
            .map((profesional, index) => (
                
              <GridItem xs={12} sm={12} md={4} key={index}>
                  {ProfesionalCard(profesional)}
              </GridItem>
              )) : <Fragment />}
            </GridContainer>
          </div>      
        )
    }
    
    
    const onContentPageChange = (event) => {
      //console.log(event)
        setContentFirst(event.first);
        //setContentRows(event.rows);
    }
    const template3 = {
      layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',      
      'CurrentPageReport': (options) => {
          return (
              <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                  {options.first} - {options.last} de {options.totalRecords}
              </span>
          )
      }
    }
     const Paginador=()=>{
      return(
        <div id="contenedor1" className={classes.container+" paginator-demo"}>
            <div className="card">
                <Paginator 
                    first={contentFirst} 
                    rows={contentRows} 
                    totalRecords={cantidadProfesionales} 
                    onPageChange={onContentPageChange}
                    template={template3}>
                </Paginator>
                <div className="image-gallery">
                </div>
            </div>
        </div>
        )
    }
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
                    <div className="MuiFormControl-root makeStyles-formControl-87">
                        <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                            <InputText id="precio" 
                                value={getTarifa} 
                                className="MuiInputBase-input MuiInput-input makeStyles-input-88" 
                                onChange={(e) => {restaurar(),setTarifa(e.target.value)}} />
                            <label htmlFor="precio">Precio</label>
                        </span>
                    </div>
                    <div className="MuiFormControl-root makeStyles-formControl-87">
                      <span className="p-float-label MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-80 MuiInputBase-formControl MuiInput-formControl">
                        <AutoComplete 
                          value={selectedIdiomas} 
                          suggestions={filteredIdiomas} 
                          completeMethod={searchIdioma} 
                          field="nombre" 
                          inputClassName={"inputAutocomplate MuiInputBase-input MuiInput-input makeStyles-input-88" }
                          forceSelection
                          onChange={(e) => {if(e.value!==null){setSelectedIdiomas(e.value);setReload(!reload);}}} 
                          onClear={()=>{setSelectedIdiomas(null),setReload(!reload)}}
                          //onSelect={(e) => {setSelectedIdiomas(e.value),setReload(!reload)}} 
                        />
                        <label htmlFor="autocomplete">Idioma</label>
                      </span>
                    </div>
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
            {Profesionales()}
            {Paginador()}
            {contentFirst}
        </div>

    </> )



}

export default ProfesionalesPreview