import React from 'react';
import Container from 'react-bootstrap/Container';

function UsersLayout(props) {
    return (<Container>{props.children}</Container>)
}

export default UsersLayout;