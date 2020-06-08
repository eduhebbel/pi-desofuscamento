import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UsersForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        const uriEdit = 'http://localhost:3001/users'
        const options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
            },
            body: JSON.stringify(this.state)
        }
        fetch(uriEdit, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.href ='/';
        })
        .catch(erros => {
            console.log(erros);
        })
        
    }

    handleCancel(e){
        window.location.href = '/';
    }

    render(){
        return(
            <Row>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='nome'>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control placeholder="Nome" type="text" name="nome" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId='senha'>
                        <Form.Label>Senha</Form.Label>
                        <Form.Control  placeholder="Password" type="password" name="senha" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control placeholder="user@email.com" type="text" name="email" onChange={this.handleChange} />
                    </Form.Group>
                    <Button  variant="primary" type="Submit">Criar</Button>{' '}
                    <Button  variant="secondary" onClick={this.handleCancel}>Cancelar</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}//End Class

export default UsersForm;