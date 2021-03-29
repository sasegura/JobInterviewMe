import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import './ProfilePage.styles.scss'
import Flags from 'country-flag-icons/react/3x2';
import { Icon } from '@iconify/react';
import skypeIcon from '@iconify-icons/mdi/skype';
import Icono from '../Components/Icono/Icono.component';
import idiomas from '../../assets/json/idiomas.json'
import canales from '../../assets/json/canales.json'
import { Calendar } from "primereact/calendar";
import Horas from '../../assets/json/horas.json'
import { InputText } from "primereact/inputtext";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {

  const prod1 = {
    "data": [
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      },
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
      }]
  }

  const [products1, setProducts1] = useState(prod1);

  const dataTableFuncMap = {
    'products1': setProducts1
  };

  const columns = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
  ];

  useEffect(() => {
    setProducts1(Horas.data);
  }, []);

  const onEditorValueChange = (productKey, props, value) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    dataTableFuncMap[`${productKey}`](updatedProducts);
  }

  const inputTextEditor = (productKey, props, field) => {
    return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
  }

  const codeEditor = (productKey, props) => {
    return inputTextEditor(productKey, props, 'code');
  }

  const nameEditor = (productKey, props) => {
    return inputTextEditor(productKey, props, 'name');
  }

  const classes = useStyles();
  const { ...rest } = props;
    const [usuario, setUsuario]=useState(null)

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const idiomasArray = idiomas.idiomas;
  const canalesArray = canales.canales;

    useEffect(() => {
        RefreshUsuario()
    }, []);

    async function RefreshUsuario(){
        const url = urlProfesional+"/"+id;      
        try {
            const respuesta = await AxiosConexionConfig.get(url);
            console.log(respuesta.data)
            setUsuario(respuesta.data)
        } catch (e) {
            console.log(e);
        }
    }
  const sectores = [
    {
      id: 1,
      sector: "RRHH",
    },
    {
      id: 2,
      sector: "Agricultura",
    },
    {
      id: 3,
      sector: "Informática",
    }
  ];

  const hashtag = [
    {
      id: 1,
      hashtag: "#ingeniería",
    },
    {
      id: 2,
      hashtag: "#navales",
    },
    {
      id: 3,
      hashtag: "#projectManager",
    }
  ];


  const sectoresA = (atributo, index, clase) => {
    return (
      (index === 0) ? <div className={clase} key={index}>{atributo}</div> : <div className={clase} key={index}>{", " + atributo}</div>
    )
  }

  const header=()=>{
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
          {...rest}
        />
    )
  }
  const parallax=()=>{
    return (
      <Parallax id="sombra" small filter color="headerGreen" >

        <div className={classes.container + " headerNameTitle"}>
          <GridContainer justify="flex-end">

            <GridItem xs={12} sm={12} md={6}>
              <h3 className={classes.title + " nameTitle"}>{usuario!==null?usuario.nombreperfil:""}</h3>
            </GridItem>

            <GridItem xs={12} sm={12} md={2}>
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>
    )
  }

  const body=()=>{
    return (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>

            <GridContainer justify="left">
              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.profile}>
                  <div>
                    <img src={"data:image/png;base64,"+usuario.imagen} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}></h3>
                    <h6></h6>

                    <div id="banderasList">
                      {
                        usuario.idiomas.split(",").map((idioma, index) => {
                          return (
                            <Icono codigo={idioma} tipo="bandera" key={index} nombre={idioma} id={index} />
                          )
                        })
                      }
                    </div>

                    <div className="precio">
                      <spam className="precioText">{usuario.tarifa +  "€ / "+ usuario.duracion+'’ entrevista'}</spam>
                    </div>
                  </div>
                </div>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}><div className={classes.description}>


                <div >
                  {usuario.annosexperiencia} años de experiencia en el(los) sector(es): <br />
                      <div className="sectores">
                          {usuario.sectores.split(",").map((sector, index) => {
                              return (
                                  sectoresA(sector, index, "sectores")
                              )
                          })}
                      </div>
                </div>
              </div><div className={classes.description}>
                  <p>
                    {usuario.experiencia}
                  </p>
                </div>
                <div className={classes.description}>

                  <div className="hashtags">
                    {usuario.hashtags.split(",").map((hashtag, index) => {
                      return (
                        sectoresA(hashtag, index, "hashtags")
                      )
                    })}
                  </div>

                </div>
                <div className="contenedor">
                  <div className="canalesSection">
                    <span>Canales: </span>
                    {usuario.canales!==null?
                      usuario.canales.split(", ").map((canal, index) => {
                        return (
                          <Icono codigo={canal} tipo="canal" key={index} nombre={canal} id={index} />
                        )
                      }):<Fragment></Fragment>
                    }
                  </div></div>

              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <div className="card">
                  <h5>Basic Cell Editing</h5>
                  <DataTable value={products1} editMode="cell" className="editable-cells-table">
                    <Column field="dia" header="Día" /*editor={(props) => codeEditor('products1', props)}*/></Column>
                    <Column field="horainicio" header="Hora inicio" /*editor={(props) => nameEditor('products1', props)}*/></Column>
                    <Column field="horafin" header="Hora fin" /*editor={(props) => nameEditor('products1', props)}*/></Column>
                  </DataTable>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <Calendar selectionMode="multiple" inline numberOfMonths={2} minDate={new Date()} disabledDays={[1, 2]} readOnlyInput onChange={(e) => setDate(e.value)}></Calendar>
              </GridItem>
              <div className="margen"></div>
            </GridContainer>

            {/* <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Studio",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
                </GridContainer>*/}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      
        {header()}
        {parallax()}
        
        {usuario!==null?body():<Fragment><div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            Seleccione un preparador antes de poder ver su perfil.</div></div></div></Fragment>}
      
    </div >
  );
}
