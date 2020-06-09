import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UsersHeader(props) {
    return (
        <Row>
            <Col className='py-5'><h3>{props.title}</h3></Col>
        </Row>
    )
}

export default UsersHeader;