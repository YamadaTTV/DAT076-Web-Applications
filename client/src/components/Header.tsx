import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import {Pages} from "../App";

/**
 * Header component, used to show the header.
 *          handleLoginClick - The handler for the login/logout functionality.
 *          handleSellClick - The handler to show the sell form.
 * @return Header with different possible actions.
 * @param props
 */
export function Header(props:{handlePages: (page: Pages)=>void, page: Pages}){
    const logo = require("../img/murrayPog.png");

    return(
        <Navbar collapseOnSelect expand="lg" className="top">
            <img src={logo} width="4%"/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home" onClick={() => props.handlePages(Pages.INDEX)}>Home</Nav.Link>
                    <Nav.Link href="#about_us" onClick={() => props.handlePages(Pages.ABOUT)}>About Us</Nav.Link>
                    <Nav.Link href="#browse">Browse</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="loginText" eventKey={2} href="#loginpage">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );


    /*
    if(loggedIn){
        if(inCartPage){
            return(
                <Navbar collapseOnSelect expand="lg" className="top">
                    <img src={logo} width="4%"/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" onClick={props.toCartPage}>Home</Nav.Link>
                            <Nav.Link href="#about_us">About Us</Nav.Link>
                            <Nav.Link href="#browse">Browse</Nav.Link>
                            <Nav.Link href="#sell" onClick={props.handleSellClick}>Sell</Nav.Link>
                            <Nav.Link href="#cart">Cart</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="loginText" eventKey={2} href="#loginpage" onClick={props.handleLoginClick}>Log out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        // If added to cart
        else if(props.cartItems.length > 0){
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
                            <Nav.Link href="#cart" onClick={props.toCartPage}>Cart</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="loginText" eventKey={2} href="#loginpage" onClick={props.handleLoginClick}>Log out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else {
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
    }
    else {
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

     */
}