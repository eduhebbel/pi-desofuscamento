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

        let textoDes = document.getElementById('desofuscado');

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

    copy() {
        let textarea = document.getElementById("desofuscado");
        let copymsg = document.getElementById("copmsg");
        
        
        if(textarea.value === "" || textarea.value == "Um Texto ofuscado é necessária no campo Texto Ofuscado!" ){

            copymsg.innerHTML = "";
            
        }else{
            
            textarea.select();
            document.execCommand('copy');
            copymsg.innerHTML = "O texto desofuscado foi copiado para área de transferência.";
            copymsg.style.color = "#38a811";
            

        }
        
      }//Fim do copy
       
           
   



    render(){
        return (
            <Row>
                <Col>
                    
                            <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='text'>
                                        <Form.Label>Texto Ofuscado:</Form.Label>
                                        <textarea class="form-control" name='text' onChange={this.handleChange} value={this.state.text} ></textarea>
                                        
                                            <Form.Label>Texto Desofuscado:</Form.Label>
                                            <textarea  class="form-control" id='desofuscado' nome='textoDesofuscado' onClick= {this.copy} readOnly></textarea>
                                            <div id="copmsg"></div>
                                    </Form.Group>
                                    
                                        <Button size="sm" variant="primary" type="submit" >Enviar</Button>
                                    
                            </Form>                                          
                        
                            <Form action="http://localhost:3001/upload/file" method="POST" encType="multipart/form-data">
                                <Form.Group>
                                    <Form.File id="attachment" name="attachment" label="Anexo" />
                                    <div  nome='textoDesofuscadoa'></div>
                                </Form.Group>
                                
                                    <Button size="sm" variant="primary" type="submit" >Enviar</Button>
                               
                            </Form>                            
                           

                        

                    
                </Col>
            </Row>
        )
    }
}
export default UsersFileUploadForm;