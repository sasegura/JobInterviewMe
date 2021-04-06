import { Modal, Form, Input, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import './Login.style.scss'

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import GoogleLogin from "components/GoogleLogin"
import { makeStyles } from "@material-ui/core";
import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";
import Button from "components/CustomButtons/Button.js";
import LogUpCard from 'views/LoginPage/LogUpCard.component';

const useStyles = makeStyles(styles);

const LogUpPopUp = (props) => {

  const classes = useStyles();

  const onFinish = values => {
    console.log(values);
  };


    return (
      <>       
        <Modal 
          
          visible={props.visibleUp}
          onCancel={()=>props.handleCancel()}
          footer={null}
          closable={false}
         >

          <LogUpCard animation="" />
        </Modal>
      </>
    );
  }


export default LogUpPopUp;