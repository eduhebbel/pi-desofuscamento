import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';

function UsersHomeDellButton(props){
    const userId = props.userId;
    const dellRow = props.dellRow;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleConfirm = () => {
        setShow(false);
        dellRow(userId);
    }  
    const handleShow = () => setShow(true); 
    return(
            <React.Fragment>
                <ButtonGroup className="mr-1" >
                    <Button variant="secondary" variant="danger" onClick={handleShow}>Deletar</Button>
                </ButtonGroup>
                <Modal size="sm" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title >Remover Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Deseja mesmo deletar este Usuario?</Modal.Body>
                    <Modal.Footer>
                        <Button size="sm" variant="secondary" onClick={handleClose}>Não</Button>
                        <Button size="sm" variant="danger" onClick={handleConfirm}>Sim</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
         
    )
}

export default UsersHomeDellButton;