import React, { useState } from 'react';
import {  Button, Modal  } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const DialogCard = (props) => {

  function ConfirmarCita() {
    confirm({
      title: 'Confirmar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea confirmar esta cita?',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errores!'));
      },
      onCancel() {},
    });
  }

  function DeclinarCita() {
    confirm({
      title: 'Declinar Cita',
      icon: <ExclamationCircleOutlined />,
      content: 'Está seguro que desea declinar esta cita?',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0 ? resolve : reject, 2000)
          
        }).then(()=>props.setReload(true)).catch(() => console.log('Oops errores!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
  
  return(<>
    
    <Modal
          title="Resumen de tu cita"
          visible={props.modal1Visible}
          onOk={() => props.setModal1Visible(false)}
          onCancel={() => props.setModal1Visible(false)}
          centered
          width={1000}
          footer={[
            <Button key="back" onClick={() => props.setModal1Visible(false)}>
              Cancelar
            </Button>,
            <Button onClick={DeclinarCita} >Declinar Cita</Button>,
            <Button onClick={ConfirmarCita}>Confirmar Cita</Button>,            
          ]}

        >
        <p>Tu cita con Adele, el día XX / XX / XXXX</p>
        <p>Reunión por ZOOM.</p>
        <p>Cualquier duda en relación a esta preparación, no dudes en contactar con: jobinterviewme@gmail.com</p>       

      </Modal>    
    </>)

}
export default DialogCard;
