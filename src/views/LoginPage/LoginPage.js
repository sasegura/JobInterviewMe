import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GoogleLogin from "components/GoogleLogin"
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './LoginPage.style.scss';
import { Link } from "react-router-dom";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';

//import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);



function LoginPage(props) {
  console.log(props)
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const usuario = {
    nombre: props.usuario.nombre,
    apellido: props.usuario.apellido,
    email: props.usuario.email,
    password: props.usuario.password
  }
  const goToStep2 = () => {
    props.setUsuario(props.usuario)
    props.goToStep(3);
  }

  const onFinish = values => {
    goToStep2();
  };
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container + " contenedorLogin"}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <h3 id="question">¿Quieres ayudar a triunfar?</h3>
              <div id="margen"></div>


              <h4 >Prepara a tu manera</h4>
              <div id="margen"></div>


              <ul><ArrowForwardIcon className="arrow" />Tú defines el precio</ul>

              <ul><ArrowForwardIcon className="arrow" />Cuando quieres trabajar</ul>

              <ul><ArrowForwardIcon className="arrow" />El formato de tu preparación</ul>

              <ul><ArrowForwardIcon className="arrow" />Cuéntanos un poco de tu experiencia</ul>

              <ul><ArrowForwardIcon className="arrow" />En 3 minutos tu perfil estará listo</ul>




            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>

                <Form layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4 className="blanco">Crea tu perfil</h4>

                  </CardHeader>

                  <div className={classes.socialLine}>
                    <GoogleLogin />
                  </div>

                  <CardBody>
                    <Form.Item
                      label="Tipo de preparación"
                      name="nombre"
                      rules={[{
                        required: true,
                        message: 'Please input your Tipo de preparación!',
                      },]}
                    >
                      <Input defaultValue={props.global.nombre} placeholder="Tipo de preparación" />
                    </Form.Item>

                    <Form.Item
                      label="Tipo de preparación"
                      name="apellido"
                      rules={[{
                        required: true,
                        message: 'Please input your Tipo de preparación!',
                      },]}
                    >
                      <Input defaultValue={props.global.apellidos} placeholder="Tipo de preparación" />
                    </Form.Item>


                    <Form.Item
                      defaultValue={props.global.email}
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
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>


                  </CardBody>

                  <CardFooter className={classes.cardFooter}>

                    <Button simple type="submit" color="primary" size="lg">
                      Inscríbete
                    </Button>
                  </CardFooter>
                </Form>

              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (rootReducer) => {
  return { global: rootReducer.auth };
};

export default connect(mapStateToProps, authAction)(LoginPage);