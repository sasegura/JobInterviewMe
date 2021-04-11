import Modal from 'antd';
import React from 'react';


const DialogCard = (props) => {

    return(<>
    
    <Modal
          title="20px to Top"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        ><p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    
    
    
    </>)

}
export default DialogCard;
