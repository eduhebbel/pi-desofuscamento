import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UsersHomeNewButton() {
    return (

        <Row align="right">
            <Col colSpan='3' className="pb-2">
                <Button href="/New" size="sm" variant="info">Novo Usuario</Button>
            </Col>
        </Row>
    )
}

export default UsersHomeNewButton;