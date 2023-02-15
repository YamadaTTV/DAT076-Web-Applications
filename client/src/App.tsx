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
    const soffa: IProduct = {productName:"soffa",productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",productCategory:"möbel",price:123,seller:1}

    const handleRegisterClick = () => {
        setformOpen(!formOpen);
    }

    const handleLoginClick = () => {
        setloggedIn(!loggedIn);
    }
    /*
    if(loggedIn){
        return <Header loggedIn={loggedIn}/>

    }
    if(!formOpen){
        return <LoginForm handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
    } else {
        return <RegisterForm handleRegisterClick={handleRegisterClick}/>
    }
    */
   return(
    <div>
        <Header loggedIn={loggedIn}/>
        <Row>
            <Col xs={4}>
                <Product prod={soffa}/>
            </Col>
            <Col xs={4}>
                <Product prod={soffa}/>
            </Col>
        </Row>
    </div>
   );
}

/**
* Interface for describing what data a product is expected to have
*/
interface IProduct {
    productName: string,
    productDescription: string,
    productCategory: string,
    price: number,
    seller : number,
    buyer ?: number
    //const soffa: IProduct = {productName:"soffa",productCategory:"möbel",price:123,seller:1}
}


/**Aesthetics of product, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
function Product (props: {prod : IProduct}){
    //const icon = require();
    return (
      <Card style={{ width: '18rem'}}>
          <Card.Img variant="top" src={"https://wakefitdev.gumlet.io/img/sofa-sets/lifestyle/WSFABLZN3FVBL.jpg?w=732"}/>
          <Card.Body>
              <Card.Title>{props.prod.productName}</Card.Title>
              <Card.Text>
                  {props.prod.productDescription}
                  <br/>
                  <b>
                    {props.prod.price} KR
                  </b>
              </Card.Text>
              <Row>
                  <Col xs={4}>
                      <Button variant="primary">Buy</Button>
                  </Col>
                  <Col xs={8}>
                      <Button variant="primary">Contact seller</Button>
                  </Col>
              </Row>
          </Card.Body>
      </Card>
  );
}

function Header(props:{loggedIn:Boolean}){
  const logo = require("./murrayPog.png");
  return(
    <Navbar collapseOnSelect expand="lg" className="top">
        <img src={logo} width="4%"/>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about_us">About Us</Nav.Link>
            <Nav.Link href="#browsw">Browse</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="loginText" eventKey={2} href="#loginpage">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

function LoginForm(props: {handleLoginClick : () => void, handleRegisterClick : () => void}) {
    const[username, setusername] = useState("");
    const[password, setpassword] = useState("");
        return (
            <div>
                <h1>Welcome to Marketplace!</h1>
                <form onSubmit={
                    async e => {
                        e.preventDefault();
                        let response = await axios.post("http://localhost:8080/user/login",{ username:username,password:password})
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
                            setusername(e.target.value);
                        }}></input>
                    </div>
                    <div>
                        <input type="password" id="password" name="password"
                               placeholder="Password" onChange={e => {
                            setpassword(e.target.value);
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
