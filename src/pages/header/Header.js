import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './../../logo.svg';
import './Header.scss';

class Header extends Component {

    render() {
        const pathname = window.location.pathname;

        return (
            <Navbar className="header" collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '} React
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto" activeKey={pathname}>
                            <Nav.Link href="/home" active={pathname === '/home'}>Home</Nav.Link>
                            <Nav.Link href="/favorite-list" active={pathname === '/favorite-list'}>Favorite List</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;