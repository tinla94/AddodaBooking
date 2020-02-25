import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalLayout = props => {
    return(
        <Modal 
            className="modal"
            show={props.show} 
            onHide={props.hide}>
            {props.children}
        </Modal>
    )
}

export default ModalLayout;