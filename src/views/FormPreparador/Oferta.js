import React, { useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Calendar } from 'primereact/calendar';
import 'primeflex/primeflex.css';
import classNames from "classnames";
import {ErrorMessage, Formik,Field} from "formik";
import * as yup from "yup";
import { Button } from 'primereact/button';

const Oferta=(props)=>{
    const valoresIniciales={
        nombrePerfil:"",
        annosExperiencia:"",
        experiencia:"",
        imagenperfil: "",
        sectores:"",
        perfiles: "",
        idiomas: "",
      }
      const [date15, setDate15] = useState(null);
      const handleSubmit=(values)=> {
        console.log(values)
        props.goToStep(1);
      }
      const dias=["Lunes", "Martes","Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];

      const conteiner=(dia, index)=>{
          console.log(dia)
          return(
            <GridContainer key={index} className="marginbottom0px">
                <GridItem xs={12} sm={12} md={4}>
                    <label htmlFor={"sectores"} className="text textMarca">{dia}</label>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Field id="sectores" name="sectores" type="text" className="with100"/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Field id="sectores" name="sectores" type="text" className="with100"/>
                </GridItem>
            </GridContainer>
          )
      }

    return (
        
          <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <div xs={12} sm={12} md={10} className={"left40px margintop50px"}>             
                      <Formik initialValues={valoresIniciales} onSubmit={handleSubmit}
                          validationSchema={validationSchema}>
                          {({ handleSubmit}) => (
                              <form onSubmit={handleSubmit} className="register-form">
                                <GridContainer className="marginbottom10px">
                                  <GridItem xs={12} sm={12} md={5}>
                                      <h3>Definición del servicio </h3>
                                      <div className="p-col-12" >
                                          <label htmlFor={"tpreparación"} className="text textMarca">Tipo de preparación</label>
                                          <div>
                                              <Field id="tpreparación" name="tpreparación" type="text" className="with100"/>                                            
                                          </div>
                                          <div><ErrorMessage name={"tpreparación"} className="invalid-feedback">{message => <div><small className="p-error p-d-block">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                      <div className="p-col-12">
                                          <label htmlFor={"duracion"} className="text textMarca">Duración </label>
                                          <div>
                                              <Field id="duracion" name="duracion" type="text" className="with100"/>                                            
                                          </div>
                                          <div><ErrorMessage name={"duracion"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                      <div className="p-col-12">
                                          <label htmlFor={"canales"} className="text textMarca">Canales</label>
                                          <div>
                                              <Field type="text" id="canales" name="canales" aria-describedby="username2-help" className="with100 p-invalid p-d-block" />
                                          </div>
                                          <div><ErrorMessage name={"canales"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                      <div className="p-col-12">
                                          <label htmlFor={"tarifa"} className="text textMarca">Tarifa</label>
                                          <div>
                                              <Field type="text" id="tarifa" name="tarifa" aria-describedby="username2-help" className="with100 p-invalid p-d-block" />
                                          </div>
                                          <div><ErrorMessage name={"tarifa"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                      </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={5}>
                                      <GridContainer>
                                          <GridItem xs={12} sm={12} md={12}>
                                          Agenda<br/>
                                                Selecciona el horario disponible para que puedan contratar tus servicios. 
                                                No te preocupes si te surgen planes, lo podrás modificar en cualquier momento. 

                                          </GridItem>
                                          <GridItem xs={12} sm={12} md={12}>
                                                
                                                {dias.map(function(dia,index){
                                                    return(conteiner(dia,index))
                                                })}
                                                <div><ErrorMessage name={"sectores"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                          </GridItem>
                                          
                                      </GridContainer>
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <div className="p-field p-col p-md-6 p-col-12" >
                                            <div className={"center"} >
                                                <Button label="Submit" icon="pi pi-check" />
                                            </div>                                    
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <div className="p-field p-col p-md-6 p-col-12" >
                                            <div className={"center"} >
                                                <Button label="Anterior" onClick={(e)=> {props.goToStep(1)}} icon="pi pi-check" />
                                            </div>                                    
                                        </div>
                                    </GridItem>
                                </GridContainer>
                            </form>
                        )}
                    </Formik>
                </div>
          </GridItem>
      </GridContainer>            
      
    )
};
export default Oferta;

const validationSchema = yup.object().shape({
    tarifa: yup.string().required("Tarifa requerido."),
    preparación: yup.string().required("Tipo de preparación requerido."),
    duracion: yup.string().required("Duración requerido."),
    canales: yup.string().required("Canales requerido."),
    sectores: yup.string().required("Sectores requerido."),
    perfiles: yup.string().required("Perfiles requerido."),
    idiomas: yup.string().required("Idiomas requerido.")
  });