import React from 'react';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			senha: '',
			errors: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let loginUrl = 'http://localhost:3001/login';

		let options = {
			method: 'post',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state)
		}

		fetch(loginUrl, options)
			.then(res => res.json())
			.then(data => {

				console.log(data)
				// (data.error).forEach(e => {
				// 	let errorList = this.state.errors
				// 	errorList.push(e.msg)
				// 	this.setState({
				// 		errors: errorList
				// 	})
				// })

				console.log(this.state)


			}).catch(err => {
				console.log(err)
				alert("Erro ao cadastrar");
			})
	}

	handleCancel(e) {
		//just reload the window...
		//this will clear the states
		window.location.href = '/login';
	}

	render() {
		const errorList = this.state.errors;

		// const renderErrorList = ((errorList) => {
		// 	const l = []
		// 	errorList.map((e) => {
		// 		l.push(<div>teste</div>)
		// 	})
		// 	return l
		// })

		return (
			<Row>
				<Col>
					{/* {errorList.length > 0 && renderErrorList(errorList)} */}
					<Modal.Dialog>
						<Modal.Header >
							<Modal.Title>Login de usuário</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId='nome'>
									<Form.Label>Email</Form.Label>
									<Form.Control size="sm" placeholder="Email" type="email" name="email" onChange={this.handleChange} value={this.state.email} />
									<Form.Text id="nomeMsg" style={{ color: "red" }}></Form.Text>
								</Form.Group>
								<Form.Group controlId='senha'>
									<Form.Label>Senha</Form.Label>
									<Form.Control size="sm" placeholder="Password" type="password" name="senha" onChange={this.handleChange} value={this.state.senha} />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button size="sm" variant="secondary" onClick={this.handleCancel}>Cancelar</Button>
							<Button size="sm" variant="primary" type="Submit" onClick={this.handleSubmit}>{"Login"}</Button>{' '}
						</Modal.Footer>
					</Modal.Dialog>
				</Col>
			</Row >
		)
	}
}

export default Login;