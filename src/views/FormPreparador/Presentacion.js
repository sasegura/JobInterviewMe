import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import classNames from "classnames";
import { ErrorMessage, Formik, Field } from "formik";
import { FileUpload } from 'primereact/fileupload';
import * as yup from "yup";
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import sectorJSON from '../../assets/json/sectores.json';

const Presentacion = (props) => {

    const [sectores, setSectores] = useState([]);

    const [selectedSectores, setSelectedSectores] = useState(null);
    const [filteredSectores, setFilteredSectores] = useState(null);

    useEffect(() => {
        setSectores(sectorJSON.sectores);
    }, []);

    const searchSector = (event) => {
        setTimeout(() => {
            let _filteredSectores;
            if (!event.query.trim().length) {
                _filteredSectores = [...sectores];
            }
            else {
                _filteredSectores = sectores.filter((sector) => {
                    return sector.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredSectores(_filteredSectores);
        }, 250);
    }


    const [imgPefil, setImgPerfil] = useState(null)
    const valoresIniciales = {
        nombrePerfil: "",
        annosExperiencia: 0,
        experiencia: "",
        imagenperfil: "",
        sectores: "",
        perfiles: "",
        idiomas: "",
    }
    const handleSubmit = (values, { setFieldError, setSubmitting }) => {


        if (imgPefil === null) {
            setFieldError("imagenperfil", "Imagen de perfil requerida.")
            setSubmitting(false);
        } else {
            if (sectores === null) {
                setFieldError("sectores", "Sectores requeridos.")
                setSubmitting(false);
            }
            else {
                values.imagenperfil = imgPefil
                values.sectores = sectores
                props.primerosValores(values)
                props.goToStep(2);
            }
        }
    }
    const onChangeImg = (e) => {
        //console.log(e.target.files[0])   
        //console.log(e.target.files[0])  
        let file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                var base64 = reader.result
                //console.log(base64)
                var s = base64.split(",")
                //valoresIniciales.imagenperfil=e.target
                setImgPerfil(s[1])
                //setImagen(s[1])
                //setImagenX(s[1])
            }
        }
    }
    const goStep2 = () => {
        //props.goToStep(2)
        console.log(valoresIniciales)
    }

    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div xs={12} sm={12} md={10} className={"left40px margintop50px"}>
                    <Formik initialValues={valoresIniciales} onSubmit={handleSubmit}
                        validationSchema={validationSchema}>
                        {({ values, errors, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="register-form">
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={5}>
                                        <div className=" p-col-12">
                                            <label htmlFor={"nombrePerfil"} className="text textMarca">Nombre de tu perfil</label>
                                            <div>
                                                <Field id="nombrePerfil" name="nombrePerfil" type="text" className="with100" />
                                            </div>
                                            <div><ErrorMessage name={"nombrePerfil"} className="invalid-feedback">{message => <div><small className="p-error p-d-block">{message}</small></div>}</ErrorMessage></div>
                                        </div>
                                        <div className=" p-col-12">
                                            <label htmlFor={"annosExperiencia"} className="text textMarca">Años de experiencia en RRHH</label>
                                            <div>
                                                <Field id="annosExperiencia" name="annosExperiencia" type="number" className="with100" />
                                            </div>
                                            <div><ErrorMessage name={"annosExperiencia"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                        </div>
                                        <div className="p-col-12">
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
                                                <div className=" p-col-12">
                                                    <label htmlFor={"imagenperfil"} className="text textMarca">Imagen de perfil</label>
                                                    <div>
                                                        <Field id="imagenperfilt" name="imagenperfilt" onChange={(e) => { onChangeImg(e) }} type="file" className="with100" />
                                                    </div>
                                                    <div><ErrorMessage name={"imagenperfil"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <div className=" p-col-12">
                                                    <label htmlFor={"sectores"} className="text textMarca">Sectores</label>
                                                    <span className="p-fluid">
                                                        <AutoComplete value={selectedSectores} suggestions={filteredSectores} completeMethod={searchSector} field="name" multiple onChange={(e) => setSelectedSectores(e.value)} />
                                                    </span>

                                                    <div><ErrorMessage name={"sectores"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <div className="p-col-12">
                                                    <label htmlFor={"perfiles"} className="text textMarca">Perfiles</label>
                                                    <div>
                                                        <Field id="perfiles" name="perfiles" type="text" className="with100" />
                                                    </div>
                                                    <div><ErrorMessage name={"perfiles"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <div className="p-col-12">
                                                    <label htmlFor={"idiomas"} className="text textMarca">Idiomas</label>
                                                    <div>
                                                        <Field id="idiomas" name="idiomas" type="text" className="with100" />
                                                    </div>
                                                    <div><ErrorMessage name={"idiomas"} className="invalid-feedback">{message => <div><small className="p-error">{message}</small></div>}</ErrorMessage></div>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <div className="p-field p-col p-md-6 p-col-12" >
                                            <div className={"center"} >
                                                <Button label="Submit" type="submit" icon="pi pi-check" />
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <div className="p-field p-col p-md-6 p-col-12" >
                                            <div className={"center"} >
                                                <Button label="Siguiente" onClick={() => { goStep2() }} icon="pi pi-check" />
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
export default Presentacion;

const validationSchema = yup.object().shape({
    nombrePerfil: yup.string().required("Nombre de perfil requerido."),
    annosExperiencia: yup.string().required("Años de experiencia requerido."),
    experiencia: yup.string().required("Experiencia requerido."),
    perfiles: yup.string().required("Perfiles requerido."),
    idiomas: yup.string().required("Idiomas requerido.")
});