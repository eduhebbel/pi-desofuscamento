import React from 'react';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class UsersTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Users: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/Users');
    }
}

export default UsersTable;