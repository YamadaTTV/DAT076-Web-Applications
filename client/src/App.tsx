import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button,Row,Col} from 'react-bootstrap'
import axios from "axios";
import {render} from "@testing-library/react";



function App() {
    const[formOpen, setformOpen] = useState(false);
    const handleClick = () => {
        setformOpen(!formOpen);
    }

    if(!formOpen){
        return <LoginForm handleClick={handleClick} />
    } else {
        return <RegisterForm/>
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

function LoginForm (props: {handleClick : () => void}) {
        return (
            <div>
                <h1>Welcome to Marketplace!</h1>
                <form onSubmit={
                    async e => {
                        e.preventDefault();
                    }
                }>
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
                        <button type="button" onClick={props.handleClick}>Register</button>
                    </div>
                </form>
            </div>
        );

}

function RegisterForm(){
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
