import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

class UsersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            senha: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }//Fim do Construtor

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }//Fim do HandleChange

    handleSubmit(e) {
        e.preventDefault();

        let uri = 'http://localhost:3001/users';
        let options = {};

        if ("usersId" in this.props) {
            const userId = this.props.usersId;
            uri = uri + `/${userId}`;
            options = {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
                },
                body: JSON.stringify(this.state)

            }

        } else {

            options = {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
                },
                body: JSON.stringify(this.state)
            }

        }//Fim do Else

        fetch(uri, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.href = '/';
            })
            .catch(erros => {
                console.log(erros);
            })

    }//Fim do HandleSubmit

    handleCancel(e) {
        window.location.href = '/';
    }//Fim do HandleCancel

    componentDidMount() {
        if ("usersId" in this.props) {
            const userId = this.props.usersId;
            const uriEdit = `http://localhost:3001/users/${userId}`;
            fetch(uriEdit)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        nome: data.data[0].nome,
                        senha: data.data[0].senha,
                        email: data.data[0].email
                    });
                })
                .catch(erros => {

                    console.log(erros);
                });
        }
    }

    render() {
        console.log(this.props)
        return (
            <Row>
                <Col>
                    <Modal.Dialog>
                        <Modal.Header >
                            <Modal.Title>Cadastro de Usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId='nome'>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control size="sm" placeholder="Nome" type="text" name="nome" onChange={this.handleChange} value={this.state.nome} />
                                </Form.Group>
                                <Form.Group controlId='senha'>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control size="sm" placeholder="Password" type="password" name="senha" onChange={this.handleChange} value={this.state.senha} />
                                    <Form.Text className="text-muted">
                                        Sua senha deve ter entre 8 e 20 caracteres, conter letras e números e não deve conter espaços, caracteres especiais ou emoji
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control size="sm" placeholder="user@email.com" type="email" name="email" onChange={this.handleChange} value={this.state.email} />
                                    <Form.Text className="text-muted">
                                        Por favor, digite um e-mail valido.
                                    </Form.Text>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button size="sm" variant="secondary" onClick={this.handleCancel}>Cancelar</Button>
                                    <Button size="sm" variant="primary" type="Submit">{"usersId" in this.props ? "Editar" : "Criar"}</Button>{' '}
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Col>
            </Row>
        )
    }
}//End Class

export default UsersForm;