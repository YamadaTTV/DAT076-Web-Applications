import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useState} from "react";
import {Pages} from "../App";
import axios from "axios";
import {IProduct} from "./Product";
import logo from '../img/logo.svg';
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

    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [cart, setCart] = useState<IProduct[]>([])

    const checkLoggedIn = async () => {
        const response = await axios.get("http://localhost:8080/user/loggedInUser")
        if(response.status == 210) setLoggedIn(false)
        else if (response.status == 200) setLoggedIn(true)
        else setLoggedIn(false)
    }

    const checkCart = async () => {
        let response = await axios.get("http://localhost:8080/cart")
        if(response.status == 210 || response.status == 204){
            setCart([])
            console.log(response.data)
        } else if(response.status == 200){
            setCart(response.data)
        } else {
            props.handlePages(Pages.ERROR)
        }
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
                    <Nav.Link href="#browse" onClick={
                        () => props.handlePages(Pages.PRODUCT)
                    }>Browse</Nav.Link>
                    <Nav.Link href="#sell" onClick={
                        () => props.handlePages(Pages.SELL)
                    } hidden={!loggedIn || props.page != Pages.PRODUCT}>Sell</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="loginText" href="#loginpage" hidden={loggedIn} onClick={
                        () => props.handlePages(Pages.INDEX)
                    }> Login </Nav.Link>
                    <Nav.Link href="#cart" hidden={cart.length==0} onClick={
                        () => props.handlePages(Pages.CART)
                    }>Cart</Nav.Link>
                    <Nav.Link href="#profile" hidden={!loggedIn} onClick={
                        () => props.handlePages(Pages.PROFILE)
                    }> Profile </Nav.Link>
                    <Nav.Link className="logoutText" href="#loginpage" hidden={!loggedIn} onClick={
                        async () => {
                            const response = await axios.post("http://localhost:8080/user/logout")
                            console.log(response.data)
                            props.handlePages(Pages.INDEX)
                        }
                    }> Log out </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}