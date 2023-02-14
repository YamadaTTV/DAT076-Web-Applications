import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button,Row,Col, NavbarBrand} from 'react-bootstrap'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function App() {
    const soffa: IProduct = {productId:1,productName:"soffa",productCategory:"möbel",price:123,seller:1}
    const[formOpen, setformOpen] = useState(false);
    const handleClick = () => {
        setformOpen(!formOpen);
    }
    return (
        //RegisterForm()
        //LoginForm(handleClick, formOpen),
        header()
    );
}
interface IProduct {
  productId: number,
  productName: string,
  productCategory: string,
  price: number,
  seller : number,
  buyer ?: number
}


function Product ({productId,productName,productCategory,price,seller} : IProduct){
  return (
      <Card style={{ width: '18rem' }}>
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

function header(){
  const logo = require("./murrayPog.png");
  return(
    <Navbar collapseOnSelect expand="lg" bg="success" variant="light">
        <img src={logo}/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about_us">About Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#loginpage">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

function LoginForm (handleClick : () => void, formOpen : boolean) {
    if (!formOpen) {
        return (
            <div>
                <h1>Welcome to Marketplace!</h1>
                <form>
                    <div>
                        <input type="text" id="username" name="username"
                               placeholder="Username">
                        </input>
                    </div>
                    <div>
                        <input type="password" id="password" name="password"
                               placeholder="Password">
                        </input>
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
                        <button type="button" onClick={handleClick}>Register</button>
                        {formOpen && <div>{RegisterForm()}</div>}
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            RegisterForm()
        );
    }
}

function RegisterForm(){
    const[username, setusername] = useState("");
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    return(
        <div>
            <h1>Register!</h1>
            <form
                onSubmit={
                    async e => {
                        e.preventDefault();
                        await axios.post("http://localhost:8080/user",{ username:username,password:password, email:email})
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
                    <input type="submit" value="Login" id="submitBtn"></input>
                </div>

            </form>
        </div>
    );
}

export default App;
