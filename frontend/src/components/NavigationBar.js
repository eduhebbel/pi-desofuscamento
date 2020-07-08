import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: brown;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

class NavigationBar extends React.Component {

  render() {
    return (
      <Styles>

        <Navbar expanded="lg">
          <Navbar.Brand href="/"> Desofuscador</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Item><Nav.Link href="/desofuscamento">Desofuscar</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/sobre">Sobre</Nav.Link></Nav.Item>
          </Nav>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;