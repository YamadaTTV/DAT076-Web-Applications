import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button, Row, Col, NavbarBrand, Modal} from 'react-bootstrap'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function App() {
    const[formOpen, setformOpen] = useState(false);
    const[loggedIn, setloggedIn] = useState(false);
    const[sellAction, setsellAction] = useState(false);
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",productCategory:"möbel",price:123,seller:1}
    const [products, setproducts]= useState<IProduct[]>([]);
    const [category, setcategory] = useState<Category[]>([
        {id: 1, category: "Furniture", marked: false},
        {id: 2, category: "Electronic", marked: false},
        {id: 3, category: "Clothes", marked: false}
    ]);

    const handleRegisterClick = () => {
        setformOpen(!formOpen);
    }

    const handleLoginClick = () => {
        setloggedIn(!loggedIn);
    }

    const handleSellClick = () => {
        setsellAction(!sellAction);
        updateProducts();
    }

    async function updateProducts() {
        // TODO Make it possible to change URL
        const response = await axios.get<IProduct[]>("http://localhost:8080/product");
        setproducts(response.data);
    }

    useEffect(() =>{
        updateProducts();
    }, [products]);

    if(sellAction){
        return(
            <div>
                <SellForm handleSellClick={handleSellClick}></SellForm>
                <Header loggedIn={loggedIn} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick}/>
                <ProductPage products={products} categories={category}/>
            </div>

        );
    }

    if(loggedIn){
        return (
            //Change to return the marketplace.
            <div>
                <Header loggedIn={loggedIn} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick}/>
                <ProductPage products={products} categories={category}/>
            </div>
        );
    }
    else{
        return(
            <div>
                <Header loggedIn={loggedIn} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick}/>
                <IndexPage handleLoginClick = {handleLoginClick} handleRegisterClick={handleRegisterClick} handleSellClick={handleSellClick} loggedIn={loggedIn} formOpen={formOpen}></IndexPage>
                <Footer></Footer>
            </div>
        )
    }



}

/**
* Interface for describing what data a product is expected to have
*/
interface IProduct {
    key: number,
    productName: string,
    productDescription: string,
    productCategory: string,
    price: number,
    seller : number,
    buyer ?: number
    children? : React.ReactNode
    //const soffa: IProduct = {productName:"soffa",productCategory:"möbel",price:123,seller:1}
}

interface Category{
    id: number;
    category: string;
    marked: boolean;
}

interface CategoryProps{
    key: number;
    marked: boolean;
    children? : React.ReactNode;
    onMarked : () => Promise<void>;
}

function CategoryItem({marked, children, onMarked} : CategoryProps){
    return (
        <ul className={"category-item"}>
            <input type={"checkbox"} checked={marked}
                onChange = {async e => {
                    onMarked();
                }}
            />
            {children}
        </ul>
    )
}

/** Used to get all the products from the server and display them.
 *
 */
function ProductPage(props:{products:IProduct[], categories:Category[]}){
    return(
        <div style={{marginTop: "25px", marginLeft: "10px"}}>
            <Row xs={12}>
                <Col xs={2}>
                    <div className={"category-div"}>
                        <h3 className={"login-text"}>Filter</h3>
                        {props.categories.map((category) =>
                        <CategoryItem
                            key={category.id}
                            marked={category.marked}
                            onMarked={async () => {
                                await axios.post(`http://localhost:8080/task/${category.id}`,
                                   {marked : true}
                                );
                            }}>
                            &emsp;{category.category}
                        </CategoryItem>)}
                    </div>

                </Col>
                <Col xs={10}>
                    <div style={{marginRight: "10px"}}>
                        <h3>Browse items</h3>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {props.products.map((product) =>
                                    <Col xs={4}>
                                        <Product prod={product} key={product.key}>
                                        </Product>
                                    </Col>)
                                }
                            </Row>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>

    );
}



/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
function Product (props:  {children : object, prod : IProduct}){
    //const icon = require();
    return (
      <Card style={{ width: '100%', margin: "10px"}} key={props.prod.key}>
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
                      <Button className="btn-primary">Buy</Button>
                  </Col>
                  <Col xs={8}>
                      <Button className={"btn-primary"}>Contact seller</Button>
                  </Col>
              </Row>
          </Card.Body>
      </Card>
  );
}

/**
 * Header component, used to show the header.
 * @param   loogedIn - Used to check if user is logged in or not. If true, makes it possible to log out and sell stuff.
 *          handleLoginClick - The handler for the login/logout functionality.
 *          handleSellClick - The handler to show the sell form.
 * @return Header with different possible actions.
 */
function Header(props:{loggedIn:Boolean, handleLoginClick : () => void, handleSellClick : () => void}){
    const logo = require("./murrayPog.png");

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

function Footer(){
    return(
        <nav className="navbar navbar-expand-xl footer fixed-bottom">
            <div className="text-center footerText">
                All Rights Reserved © 2023 Liam, Rasmus & Marcus
            </div>
        </nav>
        )
}

/**
 * The component for the LoginForm, shows a login menu
 * @param handleLoginClick - handler for when login button is pressed.
 *          handleRegisterClick - handler for when register button is pressed.
 * @return A login menu.
 */
function LoginForm(props: {handleLoginClick : () => void, handleRegisterClick : () => void}) {
    const[username, setusername] = useState("");
    const[password, setpassword] = useState("");
        return (
            <div>
                <div className={"login-container"}>
                    <h1 className={"login-form"}>Welcome to Marketplace!</h1>
                    <form className={"login-form"} onSubmit={
                        async e => {
                            e.preventDefault();
                            let response = await axios.post("http://localhost:8080/user/login",{ username:username,password:password})
                            if(response.status == 400){
                                //Mark something as wrong.
                            } else if (response.status == 202){
                                console.log("Success")
                                props.handleLoginClick()
                            }
                        }
                    }>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="username" name="username"
                                   placeholder="Username" onChange={e => {
                                setusername(e.target.value);
                            }}></input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="password" id="password" name="password"
                                   placeholder="Password" onChange={e => {
                                setpassword(e.target.value);
                            }}></input>
                        </div>
                        <div>
                            <input className={"btn-primary"} type="submit" value="Login" id="submitBtn"></input>
                        </div>
                        <div className={"text-center"}>
                            <hr></hr>
                            <span>OR</span>
                            <hr></hr>
                        </div>
                        <div>
                            <button className={"btn-primary"} type="button" onClick={props.handleRegisterClick}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
}

/**
 * The component for the RegisterForm, shows a register menu
 * @param
 *          handleRegisterClick - handler for when register button is pressed.
 * @return A register menu.
 */
function RegisterForm(props: {handleRegisterClick : () => void}){
    const[username, setusername] = useState("");
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    //const[repeatPassword, setrepeatPassword] = useState("");
    return(
        <div>
            <div className={"login-container"}>
                <h1 className={"login-form"}>Register!</h1>

                <form className={"login-form"}
                    onSubmit={
                        async e => {
                            e.preventDefault();
                            await axios.post("http://localhost:8080/user",{ username:username,password:password, email:email})
                            props.handleRegisterClick()
                        }
                    }>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="username" name="username"
                               placeholder="Username" onChange={e => {
                            setusername(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="email" name="email"
                               placeholder="Email" onChange={e => {
                            setemail(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="password" id="password" name="password"
                               placeholder="Password" onChange={e => {
                            setpassword(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div>
                        <input className={"btn-primary"} type="submit" value="Register" id="submitBtn"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}
/**
 * The component for the SellForm, shows a sell menu
 * @param handleSellClick - handler for when sell button is pressed.
 * @return A sell menu.
 */
function SellForm(props: {handleSellClick : () => void}){
    const[productName, setproductName] = useState("");
    const[productDescription, setproductDescription] = useState("");
    const[productCategory, setproductCategory] = useState("");
    const[price, setprice] = useState("")
    const[sellerId, setsellerId] = useState(1); //Change to automatically take the logged in users id.

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.handleSellClick()
    };

    return(
        <div>
            <Modal
                show={show}
                onHide={props.handleSellClick}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{backgroundColor: "#5d9667"}}>
                    <Modal.Title className={"login-text"}>Sell item</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={
                            async e => {
                                e.preventDefault();
                                await axios.post("http://localhost:8080/product",{ productName:productName, productDescription:productDescription, productCategory:productCategory, price:Number(price), sellerId:sellerId})
                                props.handleSellClick()
                            }
                        }>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="productName" name="productName"
                                   placeholder="Title" onChange={e => {
                                setproductName(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="description" name="email"
                                   placeholder="Description" onChange={e => {
                                setproductDescription(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="category" name="category"
                                   placeholder="Category" onChange={e => {
                                setproductCategory(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="price" name="price"
                                   placeholder="Price" onChange={e => {
                                setprice(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div>
                            <input className={"btn-primary"} type="submit" value="Sell" id="submitBtn"></input>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

function IndexPage(props: {handleLoginClick : () => void, handleRegisterClick : () => void, handleSellClick : () => void, loggedIn : Boolean, formOpen : Boolean}){
    const wallpaper = require("./wallpaperflare.com_wallpaper.jpg");
    return(
        <div>
            <Row>
                <Col lg={9} xs={0}>
                    <div className={"img-container"}>
                        <figure className="position-relative">
                            <img src={wallpaper} className="img-fluid"/>
                            <figcaption className="citation-div">
                                    <div className="citation text-white">
                                        ” <br></br>
                                        &nbsp;&ensp;Shopping
                                        <span className="secondhand"> secondhand</span>
                                        <br></br>
                                        &ensp;&nbsp;isn't a sacrifice. It's <br></br>&nbsp;&ensp;your ticket to a <span
                                        className="secondhand">good life</span>.
                                        <br></br>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;„
                                        <br></br>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;<span className="textSpan">- Nicole Lapin</span>
                                    </div>
                            </figcaption>
                        </figure>
                    </div>
                </Col>
                <Col className={"login-container"} lg={3} xs={12}>
                    <div>
                        {!props.formOpen &&
                            <LoginForm handleLoginClick={props.handleLoginClick} handleRegisterClick={props.handleRegisterClick}/>
                        }
                        {props.formOpen &&
                            <div>
                                <RegisterForm handleRegisterClick={props.handleRegisterClick}/>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default App;
