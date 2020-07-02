import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './../../logo.svg';
import { NavLink } from 'react-router-dom';
import './Header.scss';

class Header extends Component {
    render() {

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
                        <Nav className="mr-auto" >
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to="/favorite-list">Favorite List</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;