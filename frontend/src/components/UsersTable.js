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
    }

    componentDidMount(){
        fetch('http://localhost:3001/Users')
        .then(res => res.json())
        .then(data =>(
            this.setState({
                users: data.data
            })
        ))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Row>
                <Col>
                    <Table striped bordered hover responsive size="sm"  >
                        <UsersTableHeader   />
                        <UsersTableBody users={this.state.users} />
                    </Table>
                </Col>
            </Row>

        );
    }
}

function UsersTableHeader(){
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
}

function UsersTableBody(props){
    const usersTBody = props.users;

    let tbody = '';

    if(usersTBody.length > 0){
        tbody = (
            <tbody>
                {usersTBody.map(users => {
                    return (
                        <UsersTableRow users={users} key={users.id} />
                    );
                })}
            </tbody>
        )
    } else{
        tbody = (
            <tbody>
                <tr>
                    <td colSpan='4'>Nenhum Usuario foi encontrado!</td>
                </tr>
            </tbody>
        )
    }

    return tbody;
}

function UsersTableRow(props){
    const userRow = props.users;
    const uriEdit = `/edit/${userRow.id}`;
    //const uriDell = `/`;
    return(
        <tr align ="justify">
            <td>{userRow.id}</td>
            <td>{userRow.nome}</td>
            <td >{userRow.email}</td>
            <td  align ="right" >
                <ButtonGroup className="mr-1" >
                    <Button  href={uriEdit} variant="secondary" variant="warning">Modificar</Button>
                    <UsersHomeDellButton />
                </ButtonGroup>
            </td>
            
        </tr>
    )
}

export default UsersTable;