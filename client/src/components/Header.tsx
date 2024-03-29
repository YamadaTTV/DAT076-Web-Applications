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
        if(response.status == 282) setLoggedIn(false)
        else if (response.status == 215) setLoggedIn(true)
        else setLoggedIn(false)
    }

    const checkCart = async () => {
        let response = await axios.get("http://localhost:8080/cart")
        if(response.status == 280 || response.status == 283){
            setCart([])
        } else if(response.status == 232){
            setCart(response.data)
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
                    } hidden={!loggedIn}>Sell</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="loginText" href="#loginpage" hidden={loggedIn} onClick={
                        () => {
                            if(props.page == Pages.PRODUCT){
                                props.handlePages(Pages.LOGINMODAL);
                            }
                            else{
                                props.handlePages(Pages.INDEX);
                            }
                        }
                    }> Login </Nav.Link>
                    <Nav.Link href="#cart" hidden={cart.length==0} onClick={
                        () => props.handlePages(Pages.CART)
                    }>Cart</Nav.Link>
                    <Nav.Link href="#profile" hidden={!loggedIn} onClick={
                        () => props.handlePages(Pages.PROFILE)
                    }> Profile </Nav.Link>
                    <Nav.Link className="logoutText" href="#loginpage" hidden={!loggedIn} onClick={
                            async () => {
                                try {
                                await axios.post("http://localhost:8080/user/logout")
                                props.handlePages(Pages.INDEX)
                                } catch (e: any){
                                    console.log(e.message)
                                    props.handlePages(Pages.ERROR)
                                }
                            }
                    }> Log out </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}