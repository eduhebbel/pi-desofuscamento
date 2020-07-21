import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bsCustomFileInput from 'bs-custom-file-input';

import { getToken } from '../utils/auth';




class UsersFileUploadForm extends React.Component{
    constructor(props) {
        super(props)

        this.state = {

            text: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }//Fim do construtor

    limpaErro(){

        let copymsg = document.getElementById("copmsg");

        copymsg.innerHTML = "";
        
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }//Fim do HandleChange

    handleSubmit(e) {
        e.preventDefault();

        let textoDes = document.getElementById('desofuscado');
        let copymsg = document.getElementById("copmsg");
        const token = getToken();
        
        let uri = 'http://localhost:3001/upload/text';
        let options = {};

       
        
        options = {
            method: 'post',
            headers: {
                "authorization": `Bearer ${token}`,
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
                textoDes.innerHTML = "";
                copymsg.innerHTML = data.errors[0].msg;
                copymsg.style.color = 'red';
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
        
        
        if(textarea.value === "" ){

           
            
        }else{
            
            textarea.select();
            document.execCommand('copy');
            copymsg.innerHTML = "O texto desofuscado foi copiado para área de transferência.";
            copymsg.style.color = "#38a811";
            

        }
        
      }//Fim do copy
       
      componentDidMount() {
        bsCustomFileInput.init()
      }
   



    render(){
        return (
            <Row>
                <Col>
                    
                                           
                    <Form onSubmit={this.handleSubmit}>
                        
                         <Form.Group controlId='text'>
                             <Form.Label>Texto Ofuscado:</Form.Label>
                                <textarea class="form-control" name='text' onInput={this.limpaErro} onChange={this.handleChange} value={this.state.text} ></textarea>
                                            
                            <Form.Label>Texto Desofuscado:</Form.Label>
                                <textarea  class="form-control" id='desofuscado' nome='textoDesofuscado' onClick= {this.copy} readOnly></textarea>
                                    <div id="copmsg"></div>
                                    
                        </Form.Group>
                        <Form.Group>
                        <Button style= {{float: 'right'}} size="sm" variant="primary" type="submit" >Enviar</Button>
                        </Form.Group>
                          
                    </Form>
                    
                    <Form  action="http://localhost:3001/upload/file" method="POST" encType="multipart/form-data">
                        

                        <div class="input-group mb-3"></div>
                        <hr class="my-4" />

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Upload</span>
                            </div>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="attachment" name="attachment" />
                                <label class="custom-file-label" for="inputGroupFile01">Escolha um Arquivo</label>
                            </div>
                        </div>                                              
                                    
                        <div  nome='textoDesofuscadoa'></div>
                            
                        <Form.Group>
                            <Button style= {{float: 'right'}} size="sm" variant="primary" type="submit" >Enviar</Button>
                        </Form.Group>

                    </Form>                          
                                                                        
                </Col>
            </Row>
        )
    }
}

export default UsersFileUploadForm;