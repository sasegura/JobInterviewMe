import React from "react";
import {  Drawer, Button, Radio, Space } from 'antd';
import { CalendarTwoTone } from "@ant-design/icons";
import { Calendar } from "react-multi-date-picker"




class Calendario extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  

  render() {
    const { visible } = this.state;
    return (
      <>

        <Space>          
          <Button className="buttonCal" onClick={this.showDrawer}>
            <CalendarTwoTone twoToneColor="red"></CalendarTwoTone>
          </Button>
        </Space>

        <Drawer
          title="Calendario"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
          width={520}
        ><p> </p><p> </p>
          <p>Especifica los días que no vas a estar disponible</p>
          <Calendar multiple={true} mode="multiple"/>          
        </Drawer>
      </>
    );
  }
}

export default Calendario;
