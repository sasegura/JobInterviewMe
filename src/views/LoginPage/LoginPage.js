import React, { useEffect, useState } from "react";
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
import './LoginPage.style.scss';
import { Link } from "react-router-dom";
import * as authAction from "../../store/actions/authAction"
import { connect } from "react-redux";
import { Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import Texto from './Texto.component';
import LogUpCard from "./LogUpCard.component";


//import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);



function LoginPage(props) {
  //console.log(props)
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");


  setTimeout(function () {
    setCardAnimation("");
  }, 700);




  const classes = useStyles();
  const { ...rest } = props;


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
              <Texto hidden={false} />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <LogUpCard animation={cardAnimaton} />
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