import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Card, Button,Row,Col, NavbarBrand} from 'react-bootstrap'
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
    const[formOpen, setformOpen] = useState(false);
    const[loggedIn, setloggedIn] = useState(false);
    const[sellAction, setsellAction] = useState(false);
    const[cartItems, setCartItems] = useState<IProduct[]>([]);
    const[cartItem, setcartItem] = useState<IProduct>();
    const[cartState, setCartState] = useState(false);
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",productCategory:"möbel",price:123,seller:1}
    const [products, setproducts]= useState<IProduct[]>([])
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
    const handleCart = (product :  IProduct) => {
        addToCart(product);
        console.log("handleCart iahsdiashdjksas");
    }
    const handleBuy = () => {
        setCartItems([]);
        updateProducts();
        setCartState(false);
    }
    const removeFromCart = (product: IProduct) => {
        removeFromCart(product);
    }
    const toCartPage = () => {
        setCartState(!cartState);
        updateProducts();
    }
    
    async function addToCart(product : IProduct){
        let tempCart = cartItems;
        tempCart.push(product);
        setCartItems(tempCart);
    }

    async function removeCart(product: IProduct){
        let tempCart = cartItems;
        tempCart.pop();
        setCartItems(tempCart);
    }



    async function updateProducts() {
        // TODO Make it possible to change URL
        const response = await axios.get<IProduct[]>("http://localhost:8080/product/available"); //change http to http://localhost:8080/product/available
        setproducts(response.data);
    }

    useEffect(() =>{
        updateProducts();
    }, [products]);

    if(sellAction){
        return(
            <SellForm handleSellClick={handleSellClick}></SellForm>
        );
    }
    if(cartState){
        return (
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <CartPage handleBuy={handleBuy} products={cartItems} removeCart={removeCart}></CartPage>
                <Footer></Footer>
            </div>
        );
    }
    if(loggedIn){
        return (
            //Change to return the marketplace.
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <ProductPage products={products} handleCart={handleCart}/>
                <Footer/>
            </div>
        );
    }
    else{
        return(
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick} handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
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
/** Used to get all the products from the server and display them.
 *
 */
function ProductPage(props:{products:IProduct[], handleCart: (product : IProduct) => void}){
    return(
        <div>
            <h1>To Do</h1>
            <Row>
                {props.products.map((product) =>
                    <Col xs={4}>
                    <Product prod={product} key={product.key} handleCart={props.handleCart}>
                    </Product>
                    </Col>)
                }
            </Row>
        </div>

    );
}

function CartPage(props:{products: IProduct[],removeCart: (product: IProduct) => void, handleBuy: () => void}){
   const [buying, setBuying] = useState(false);
   

    const buyProducts = async () => {
        setBuying(true);
    

        props.products.forEach(async product => {
            console.log("HEJHEJHEJ PRODUCT:");
            console.log(product);
            let response = await axios.put("http://localhost:8080/product/buy", {key : product.key, buyerId: 1})
            if(response.status == 400){
                console.log("Buying failed");
            } else if(response.status == 200){
                console.log("Buying succeeded");
                props.handleBuy();
            }
        });
        
    };

   return(
    <div>
        <h1>Your Cart</h1>
        <Row>
            {props.products.map((product) => (
                <Col xs={4}>
                    <AddedProduct prod={product} key={product.key} removeCart={props.removeCart}>{}</AddedProduct>
                </Col>
            ))}
        </Row>
        <Row>
            <Col xs={1}>
                <Button onClick={buyProducts} disabled={buying}>Buy</Button>
            </Col>
        </Row>
    </div>
   )
}

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
function Product (props:  {children : object, prod : IProduct, handleCart: (product : IProduct) => void}){
    //const icon = require();
    return (
      <Card style={{ width: '18rem'}} key={props.prod.key}>
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
                      <Button variant="btn-primary" onClick={() => props.handleCart(props.prod)}>Add to Cart</Button>
                  </Col>
                  <Col xs={8}>
                      <Button variant="btn-primary">Contact seller</Button>
                  </Col>
              </Row>
          </Card.Body>
      </Card>
  );
}

function AddedProduct(props: {children: object, prod: IProduct, removeCart: (product: IProduct) => void}){
    return(
        <Card style={{width: "18rem"}} key={props.prod.key}>
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
                        <Button variant="btn-primary">Contact seller</Button>
                    </Col>
                    <Col xs={8}>
                        <Button variant="btn-primary" onClick={() => props.removeCart(props.prod)}>Remove</Button>
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
function Header(props:{loggedIn:Boolean, inCartPage : Boolean, handleLoginClick : () => void, handleSellClick : () => void, cartItems: IProduct[], toCartPage: () => void}){
    const logo = require("./murrayPog.png");

    if(props.loggedIn){
        if(props.inCartPage){
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
    return(
        <div>
            <h1>Register!</h1>

            <form
                onSubmit={
                    async e => {
                        e.preventDefault();
                        await axios.post("http://localhost:8080/product",{ productName:productName, productDescription:productDescription, productCategory:productCategory, price:Number(price), sellerId:sellerId})
                        props.handleSellClick()
                    }
                }>
                <div>
                    <input type="text" id="productName" name="productName"
                           placeholder="Title" onChange={e => {
                        setproductName(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="text" id="description" name="email"
                           placeholder="Description" onChange={e => {
                        setproductDescription(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="text" id="category" name="category"
                           placeholder="Category" onChange={e => {
                        setproductCategory(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="text" id="price" name="price"
                           placeholder="Price" onChange={e => {
                        setprice(e.target.value);
                    }}>
                    </input>
                </div>
                <div>
                    <input type="submit" value="Sell" id="submitBtn"></input>
                </div>
            </form>
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