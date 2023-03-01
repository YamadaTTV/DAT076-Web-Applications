import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";

/**
 * Header component, used to show the header.
 * @param   loogedIn - Used to check if user is logged in or not. If true, makes it possible to log out and sell stuff.
 *          handleLoginClick - The handler for the login/logout functionality.
 *          handleSellClick - The handler to show the sell form.
 * @return Header with different possible actions.
 */
export function Header(props:{loggedIn:Boolean, handleLoginClick : () => void, handleSellClick : () => void}){
    const logo = require("../img/murrayPog.png");

    if(props.loggedIn){
        return(
            <Navbar collapseOnSelect expand="lg" className="top">
                <img src={logo} width="4%"/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about_us">About Us</Nav.Link>
                        <Nav.Link href="#browse">Browse</Nav.Link>
                        <Nav.Link href="#sell" onClick={props.handleSellClick}>Sell</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="loginText" eventKey={2} href="#loginpage" onClick={props.handleLoginClick}>Log out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else{
        return(
            <Navbar collapseOnSelect expand="lg" className="top">
                <img src={logo} width="4%"/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about_us">About Us</Nav.Link>
                        <Nav.Link href="#browse">Browse</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="loginText" eventKey={2} href="#loginpage">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}