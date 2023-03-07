import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useState} from "react";
import {Pages} from "../App";
import axios from "axios";
import {response} from "msw";
import {IProduct} from "./Product";

axios.defaults.withCredentials = true;


/**
 * Header component, used to show the header.
 *          handleLoginClick - The handler for the login/logout functionality.
 *          handleSellClick - The handler to show the sell form.
 * @return Header with different possible actions.
 * @param props
 */
export function Header(props:{
    handlePages: (page: Pages)=>void,
    page: Pages
}){
    const logo = require("../img/murrayPog.png");

    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [cart, setCart] = useState<IProduct[]>([])

    const checkLoggedIn = async () => {
        if(props.page != Pages.INDEX && props.page != Pages.REGISTER){
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }

    const checkCart = async () => {
        //TODO Setup cart in server and call server here to see if there are any products in cart.
        setCart([])
    }

    useEffect( () => {
        checkLoggedIn()
        checkCart()
    },[])


    return(
        <Navbar collapseOnSelect expand="lg" className="top">
            <img src={logo} width="4%"/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home" onClick={() => {
                        if(loggedIn) props.handlePages(Pages.PRODUCT)
                        else props.handlePages(Pages.INDEX)
                    }}>Home</Nav.Link>
                    <Nav.Link href="#about_us" onClick={
                        () => props.handlePages(Pages.ABOUT)
                    }>About Us</Nav.Link>
                    <Nav.Link href="#browse">Browse</Nav.Link>
                    <Nav.Link href="#sell" onClick={
                        () => props.handlePages(Pages.SELL)
                    } hidden={!loggedIn || props.page != Pages.PRODUCT}>Sell</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="loginText" href="#loginpage" hidden={loggedIn} onClick={
                        () => props.handlePages(Pages.INDEX)
                    }> Login </Nav.Link>
                    <Nav.Link href="#cart" hidden={true} >Cart</Nav.Link>
                    <Nav.Link href="#profile" hidden={!loggedIn} onClick={
                        () => props.handlePages(Pages.PROFILE)
                    }> Profile </Nav.Link>
                    <Nav.Link className="logoutText" href="#loginpage" hidden={!loggedIn} onClick={
                        async () => {
                            const response = await axios.delete("http://localhost:8080/user/logout")
                            console.log(response.data)
                            props.handlePages(Pages.INDEX)
                        }
                    }> Log out </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}