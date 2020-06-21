import React from 'react';


import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import UsersHomeDellButton from './UsersHomeDellButton';

class UsersTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }

        this.dellRow = this.dellRow.bind(this);
    }

    dellRow(id) {
        const uriDell = `http://localhost:3001/users/${id}`;
        const options = {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
            }
        }

        fetch(uriDell, options)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: this.state.users.filter(users => users.id !== id)
                })
            })
            .catch(erros => {
                console.log(erros);
            });
    }//Fim do metodo DellRow

    componentDidMount() {
        fetch('http://localhost:3001/Users')
            .then(res => res.json())
            .then(data => (
                this.setState({
                    users: data.data
                })
            ))
            .catch(err => console.log(err));
    }//Fim do componentDidMount

    render() {
        return (
            <Row>
                <Col>
                    <Table striped bordered hover responsive size="sm"  >
                        <UsersTableHeader />
                        <UsersTableBody users={this.state.users} dellRow={this.dellRow} />
                    </Table>
                </Col>
            </Row>

        );
    }
}

function UsersTableHeader() {
    return (

        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th></th>
            </tr>
        </thead>
    )
}//Fim do UsersTableHeader

function UsersTableBody(props) {
    const usersTBody = props.users;

    let tbody = '';

    if (usersTBody.length > 0) {
        tbody = (
            <tbody>
                {usersTBody.map(users => {
                    return (
                        <UsersTableRow users={users} key={users.id} dellRow={props.dellRow} />
                    );
                })}
            </tbody>
        )
    } else {
        tbody = (
            <tbody>
                <tr>
                    <td colSpan='4'>  Nenhum Usuario foi encontrado!</td>
                </tr>
            </tbody>
        )
    }

    return tbody;
}//Fim do UserTableBody

function UsersTableRow(props) {
    const userRow = props.users;
    const uriEditR = `/edit/${userRow.id}`;

    return (

        <tr align="justify">
            <td>{userRow.id}</td>
            <td>{userRow.nome}</td>
            <td >{userRow.email}</td>
            <td align="right" >
                <ButtonGroup className="mr-1" >
                    <Button href={uriEditR} variant="secondary" variant="warning">Editar</Button>
                    <UsersHomeDellButton userId={userRow.id} dellRow={props.dellRow} />
                </ButtonGroup>
            </td>

        </tr>
    )
}//Fim do UsersTableRow

export default UsersTable;