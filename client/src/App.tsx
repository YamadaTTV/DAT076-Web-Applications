import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button,Row,Col, NavbarBrand} from 'react-bootstrap'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function App() {
    const[formOpen, setformOpen] = useState(false);
    const[loggedIn, setloggedIn] = useState(false);

    const handleRegisterClick = () => {
        setformOpen(!formOpen);
    }

    const handleLoginClick = () => {
        setloggedIn(!loggedIn);
    }
    if(loggedIn){
        return <Header loggedIn={loggedIn}/>

    }
    if(!formOpen){
        return <LoginForm handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
    } else {
        return <RegisterForm handleRegisterClick={handleRegisterClick}/>
    }
}

interface IProduct {
  productName: string,
  productCategory: string,
  price: number,
  seller : number,
  buyer ?: number
  //const soffa: IProduct = {productName:"soffa",productCategory:"möbel",price:123,seller:1}
}


function Product ({productName,productCategory,price,seller} : IProduct){
  return (
      <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src="client/src/murrayPog.png" />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Text>
            [Some quick example text to build on the card title and make up the
            bulk of the card's content.]
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
  );
}

function Header(props:{loggedIn:Boolean}){
  const logo = require("./murrayPog.png");
  return(
    <Navbar collapseOnSelect expand="lg" className="top">
        <img src={logo}/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about_us">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="loginText" eventKey={2} href="#loginpage">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

function LoginForm(props: {handleLoginClick : () => void, handleRegisterClick : () => void}) {
    const[username1, setusername1] = useState("");
    const[password1, setpassword1] = useState("");
        return (
            <div>
                <h1>Welcome to Marketplace!</h1>
                <form onSubmit={
                    async e => {
                        e.preventDefault();
                        let response = await axios.post("http://localhost:8080/user/login",{ username:username1,password:password1})
                        if(response.status == 400){

                        } else if (response.status == 202){
                            console.log("Success")
                            props.handleLoginClick()
                        }
                    }
                }>
                    <div>
                        <input type="text" id="username" name="username"
                               placeholder="Username" onChange={e => {
                            setusername1(e.target.value);
                        }}></input>
                    </div>
                    <div>
                        <input type="password" id="password" name="password"
                               placeholder="Password" onChange={e => {
                            setpassword1(e.target.value);
                        }}></input>
                    </div>
                    <div>
                        <input type="submit" value="Login" id="submitBtn"></input>
                    </div>
                    <div>
                        <hr></hr>
                        <span>OR</span>
                        <hr></hr>
                    </div>
                    <div>
                        <button type="button" onClick={props.handleRegisterClick}>Register</button>
                    </div>
                </form>
            </div>
        );
}

function RegisterForm(props: {handleRegisterClick : () => void}){
    const[username, setusername] = useState("");
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    //const[repeatPassword, setrepeatPassword] = useState("");
    return(
        <div>
            <h1>Register!</h1>

            <form
                onSubmit={
                    async e => {
                        e.preventDefault();
                        await axios.post("http://localhost:8080/user",{ username:username,password:password, email:email})
                        props.handleRegisterClick()
                    }
                }>
                <div>
                    <input type="text" id="username" name="username"
                           placeholder="Username" onChange={e => {
                        setusername(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="text" id="email" name="email"
                           placeholder="Email" onChange={e => {
                        setemail(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="password" id="password" name="password"
                           placeholder="Password" onChange={e => {
                        setpassword(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="submit" value="Register" id="submitBtn"></input>
                </div>
            </form>
        </div>
    );
}

export default App;
