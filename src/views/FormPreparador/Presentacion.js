import React, { useEffect, useState } from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { ErrorMessage, Formik, Field } from "formik";
import { FileUpload } from 'primereact/fileupload';
import * as yup from "yup";
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import sectorJSON from '../../assets/json/sectores.json';
import idiomasJSON from '../../assets/json/idiomas.json';
import { InputText } from "primereact/inputtext";

const Presentacion = (props) => {
    const [sectores, setSectores] = useState([]);
    const [idiomas, setIdiomas] = useState(null)
    const [nombreImagen, setNombreImagen] = useState("")
    const [nombrePerfil, setNombrePerfil]=useState(props.valores.nombrePerfil)
    const [imgPefil, setImgPerfil]=useState(props.valores.imgPefil!==""?props.valores.imgPefil:null)
    const [selectedSectores, setSelectedSectores] = useState(props.valores.sectores!==""?props.valores.sectores:null);
    const [filteredSectores, setFilteredSectores] = useState(null);
    const [selectedIdiomas, setSelectedIdiomas] = useState(props.valores.idiomas!==""?props.valores.idiomas:null);
    const [filteredIdiomas, setFilteredIdiomas] = useState(null);

    useEffect(() => {
        setSectores(sectorJSON.sectores);
        setIdiomas(idiomasJSON.idiomas)
    }, []);

    useEffect(() => {

        setValoresInicioales(props.valores)
    }, [props.valores]);

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


    const [valoresIniciales, setValoresInicioales] = useState(props.valores)
    const handleSubmit = (values, { setFieldError, setSubmitting }) => {
        let bandera = true
        if (imgPefil === null) {
            setFieldError("imagenperfil", "Imagen de perfil requerida.")
            bandera = false
        }
        if (selectedSectores === null || selectedSectores === []) {
            setFieldError("sectores", "Sectores requeridos.")
            bandera = false
        }
        if (selectedIdiomas === null || selectedIdiomas === []) {
            setFieldError("idiomas", "Idiomas requeridos.")
            bandera = false
        }
        if (bandera) {
            values.nombrePerfil=nombrePerfil
            values.imagenperfil = imgPefil
            values.sectores = selectedSectores
            values.idiomas = selectedIdiomas
            props.primerosValores(values)
            props.goToStep(3);
        } else {
            setSubmitting(false);
        }
    }

    const listaSectores = () => {
        let respuesta = selectedSectores[0].name
        selectedSectores.map((sector, index) => {
            if (index > 0) {
                respuesta = respuesta + "," + sector.name
            }
        })
        return respuesta
    }
    const listaIdiomas = () => {
        let respuesta = selectedIdiomas[0].codigo
        selectedIdiomas.map((idioma, index) => {
            if (index > 0) {
                respuesta = respuesta + "," + idioma.codigo
            }
        })
        return respuesta
    }
    const onChangeImg = (e) => { 
        let file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                var base64 = reader.result
                var s = base64.split(",")
                //valoresIniciales.imagenperfil=e.target
                setImgPerfil(s[1])
                //setNombrePerfil(e.name)
                //setImagen(s[1])
                //setImagenX(s[1])
            }
        }
    }
    const goStep2 = () => {
        //props.goToStep(2)
        console.log(valoresIniciales)
    }
    const invoiceUploadHandler = (e) => {
        console.log(e)
        /*const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadInvoice(e.target.result);
        };
        fileReader.readAsDataURL(file);*/
    };
    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div xs={12} sm={12} md={10} className={"left40px margintop50px"}>
                    <Formik initialValues={valoresIniciales} onSubmit={handleSubmit} validationSchema={validationSchema}>
                        {({ values, errors, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="register-form">
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={5}>
                                        <div className=" p-col-12">
                                            <div>
                                                <span className="p-float-label">
                                                    <InputText id="in" value={nombrePerfil} onChange={(e)=>{setNombrePerfil(e.target.value)}} name="nombrePerfil" className="p-invalid" />
                                                    <label htmlFor="in">Nombre de tu perfil</label>
                                                </span>
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
                                                        <Field id="imagenperfilt"  name="imagenperfilt" onChange={(e) => { onChangeImg(e) }} type="file" className="with100" />
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
                                                    <span className="p-fluid">
                                                        <AutoComplete value={selectedIdiomas} suggestions={filteredIdiomas} completeMethod={searchIdioma} field="nombre" multiple onChange={(e) => setSelectedIdiomas(e.value)} />
                                                    </span>
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
                                                <Button label="Anterior" type="button" onClick={()=>{props.goToStep(1)}}icon="pi pi-times" />
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <div className="p-field p-col p-md-6 p-col-12" >
                                            <div className={"center"} >
                                                <Button label="Siguiente" type="submit" icon="pi pi-check" />
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
    // nombrePerfil: yup.string().required("Nombre de perfil requerido."),
    //annosExperiencia: yup.string().required("Años de experiencia requerido."),
    //experiencia: yup.string().required("Experiencia requerido."),
    //perfiles: yup.string().required("Perfiles requerido.")
});