import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Space, Select, TimePicker, Row, Col, Tag, InputNumber } from 'antd';
import { CalendarOutlined, CalendarTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import canalesJSON from "../../assets/json/canales.json"
import './Oferta.style.scss';
import Calendario from './Calendario.component';



const Oferta1 = () => {


    const [duracion, setDuracion]=useState("");

    const onFinish = values => {
      console.log('Received values of form:', values);
    };

    const format = 'HH:mm';

    const children = [];
    
    canalesJSON.canales.map((canal)=>{
        children.push(<Option key={canal.nombre}>{canal.nombre}</Option>);
    })

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onChangeDuracion(value) {
        setDuracion(value);
    }

  
    return (
        
            <Form  layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                
            <Row className= "OfertaFrom">
                <Col span={12} className= "OfertaCol1">
                    <h4>Definición del servicio</h4>
                    <Form.Item
                        label="Tipo de preparación"
                        name="tipoPreparación"
                        rules={[{
                            required: true,
                            message: 'Please input your Tipo de preparación!',
                        },]}
                    >
                        <Input placeholder="Tipo de preparación"/>
                    </Form.Item>

                    <Form.Item
                        name="duracion"
                        label="Duración"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >

                    <Select                    
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Duración"
                        optionFilterProp="children"
                        onChange={onChangeDuracion}

                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="30 minutos">30 minutos</Option>
                        <Option value="1 hora">1 hora</Option>
                        <Option value="2 horas">2 horas</Option>
                        <Option value="3 horas">3 horas</Option>
                        <Option value="Medio día">Medio día</Option>
                        <Option value="Día completo">Día completo</Option>
                        <Option value="Semana">Semana</Option>
                        <Option value="Mes">Mes</Option>

                    </Select>
                    </Form.Item>

                    <Form.Item
                        name="canales"
                        label="Canales"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Canales" onChange={handleChange}>
                        {children}
                    </Select>
                    </Form.Item>

                    <Form.Item
                        name="tarifa"
                        label="Tarifa"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <InputNumber
                            defaultValue={10}
                            formatter={value => `${value} €`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            //parser={value => value.replace(/\€\s?|(,*)\€/g, '')}
                            />
                    </Form.Item>

                </Col>

                <Col span={12} className= "OfertaCol2">
                <h4>Agenda</h4>
                <div class="ant-col ant-form-item-label">
                    <label for="dynamic_form_nest_item_tipoPreparación" class="ant-form-item-required" title="Adiciona días de la semana disponibles">
                        Selecciona el horario disponible para que puedan contratar tus servicios:
                    </label>
                </div>

                    <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'dia']}
                                fieldKey={[fieldKey, 'dia']}
                                rules={[{ required: true, message: 'Missing Day' }]}
                            >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a day"
                                optionFilterProp="children"
                                
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'time']}
                                fieldKey={[fieldKey, 'time']}
                                rules={[{ required: true, message: 'Missing Time' }]}
                            >
                            <TimePicker.RangePicker minuteStep={5} defaultValue={moment('12:08', format)} format={format} />
                            
                            </Form.Item>
                            
                            <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Adiciona un día
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>
                    <div class="ant-col ant-form-item-label">
                        <label for="dynamic_form_nest_item_tipoPreparación" title="Tipo de preparación">
                        No te preocupes si te surgen planes, dispones de un calendario donde especificar los días que no vas a estar disponible.
                        <Calendario/>

                        </label>
                    </div>

                    
      
                </Col>
            </Row>
            <Row>
            <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
            </Row>


        </Form>

    );
  };

export default Oferta1;