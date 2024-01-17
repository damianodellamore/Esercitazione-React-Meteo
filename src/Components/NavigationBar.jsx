import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="info" variant="dark">
            <Navbar.Brand href="#home">Il Meteo secondo Damiano</Navbar.Brand>
            <Nav className="m-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;