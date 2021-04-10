import React, { useEffect, useState } from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import GoogleLogin from "components/GoogleLogin"
import { makeStyles } from "@material-ui/core";
import styles from "../../../src/assets/jss/material-kit-react/views/loginPage.js";
import Button from "components/CustomButtons/Button.js";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { urlUsuarios } from "configuracion/constantes.js";
import AxiosConexionConfig from "conexion/AxiosConexionConfig.js";
import { useHistory } from "react-router";
import { linkperfilpor } from "configuracion/constantes.js";


const useStyles = makeStyles(styles);


function LogInCard(props) {
    const history=useHistory()
    const classes = useStyles();
    const [requerido, setRequerido]=useState(true)

    /*const [cardAnimaton2, setCardAnimation2] = React.useState("");*/

    let cardAnimation2 = true

    props.hidden?
    cardAnimation2 = "" : cardAnimation2 = "cardHidden";

    
    /**setTimeout(function () {
        setCardAnimation2("");
      }, 3000);*/

    const onFinish = values => {
        console.log(values);
    };

    useEffect(() => {
        if (props.global.loginGoogle === true) {
            BuscarUsuarioPorEmail(props.global.email)
        }
    }, [props.global.loginGoogle]);
    
    async function BuscarUsuarioPorEmail(usuarioEmail) {
        const condisiones = JSON.stringify({ where: { correo: { like: '%' + usuarioEmail + '%' } } })
        const url = urlUsuarios + "?filter=" + encodeURIComponent(condisiones);
        try {
        const respuesta = await AxiosConexionConfig.get(url);
        console.log(respuesta.data[0].idusuario)
        if (respuesta.data.length > 0) {
            //setidusuario(respuesta.data[0].idusuario)
            history.push(linkperfilpor+"?"+respuesta.data[0].idusuario)
        }else{
            alert("No Existe")
            /*setRequerido(false)
            props.setUsuario(usuario)
            props.goToStep(2);*/
        }
        } catch (e) {
        console.log(e);
        }
    }
return (

        <Card className={classes[cardAnimation2] + " abajo"}>

    <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
        <CardHeader color="primary" className={classes.cardHeader}>
            <h4 className="blanco">Iniciar Sesión</h4>
        </CardHeader>

        <div className={classes.socialLine}>
            <GoogleLogin suscribeGoogle={false} texto="Inicia sesión con Google"/>
        </div>

        <CardBody>
            
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                
            >
                <Input.Password />
            </Form.Item>    


        </CardBody>

        <CardFooter className={classes.cardFooter}>
            <Button simple type="submit" color="primary" size="lg">
                Iniciar Sesión
            </Button>
        </CardFooter>
    </Form>
    </Card>
    

)}

const mapStateToProps = (rootReducer) => {
    return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(LogInCard);
