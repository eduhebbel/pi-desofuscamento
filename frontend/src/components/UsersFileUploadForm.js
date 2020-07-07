import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';



class UsersFileUploadForm extends React.Component{
    constructor(props) {
        super(props)

        this.state = {

            text: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }//Fim do construtor

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }//Fim do HandleChange

    handleSubmit(e) {
        e.preventDefault();

        let uri = 'http://localhost:3001/upload/text';
        let options = {};

        
        options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
            },
            body: JSON.stringify(this.state)
        }

        fetch(uri, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            var textoDes = document.getElementById('desofuscado');

            //Exibe texto Desofuscado
            if("decodedString" in data){
                textoDes.innerHTML = data.decodedString;
                textoDes.style.color = 'black';
            }else{
                
                textoDes.innerHTML = data.errors[0].msg;
                textoDes.style.color = 'red';
            }
            //Fim do Exibe texto Desofuscado

          
        })
        .catch(erros => {
            console.log(erros);
        })

    }//Fim do handleSubmit

   



    render(){
        return (
            <Row>
                <Col>
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title>Upload de Arquivo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form action="http://localhost:3001/upload/file" method="POST" encType="multipart/form-data">
                                <Form.Group>
                                    <Form.File id="attachment" name="attachment" label="Anexo" />
                                </Form.Group>
                                <Modal.Footer>
                                    <Button size="sm" variant="primary" type="submit" >Enviar</Button>
                                </Modal.Footer>
                            </Form>
                            
                            <Modal.Title>Upload de Texto</Modal.Title>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId='text'>
                                    <Form.Label>Texto Ofuscado:</Form.Label>
                                    <textarea class="form-control" name='text' onChange={this.handleChange} value={this.state.text} ></textarea>
                                    
                                        <Form.Label>Texto Desofuscado:</Form.Label>
                                         <div id='desofuscado' nome='textoDesofuscado'></div>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button size="sm" variant="primary" type="submit" >Enviar</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>

                    </Modal.Dialog>
                </Col>
            </Row>
        )
    }
}
export default UsersFileUploadForm;