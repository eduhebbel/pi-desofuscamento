import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

function UsersFileUploadForm () {
    return (
        <Row>
            <Col>
                <Modal.Dialog>
                    <Modal.Header >
                        <Modal.Title>Upload de Arquivo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form action ="httop;//localhost:3001/upload" method = "POST" encType = "multipart/form-data">
                            <Form.Group>
                                <Form.File id = "attachment" name = "attachment" label = "Anexo" />
                            </Form.Group>
                            <Modal.Footer>
                                <Button size="sm" variant="primary" type ="submit" >Enviar</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                    
                </Modal.Dialog>
            </Col>
        </Row>
    )
}
export default UsersFileUploadForm;