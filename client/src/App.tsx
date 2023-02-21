import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Button, Row, Col, NavbarBrand, Modal} from 'react-bootstrap'
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {IndexPage} from './pages/IndexPage';
import {ProductPage, IProduct, Category} from './pages/ProductPage';
import {LoginForm} from './components/LoginForm';
import {SellForm} from './components/SellForm';
import {Header} from './components/Header';
import {Footer} from './components/Footer';



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
export default App;
