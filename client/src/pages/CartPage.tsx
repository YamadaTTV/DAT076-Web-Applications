import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";
import {AddedProduct} from "../components/AddedProduct";
import {Pages} from "../App";
import {Header} from "../components/Header";
import {F} from "msw/lib/glossary-de6278a9";
import {Footer} from "../components/Footer";
//import {set} from "msw";

/** Used to get all the products from the server and display them.
 *
 */
export function CartPage(props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    const [cartItems,setCartItems] = useState<IProduct[]>([])
    const [buying, setBuying] = useState(false);


    const buyProducts = async () => {
        setBuying(true);


        for (const product of cartItems) {
            console.log(product);
            let response = await axios.put("http://localhost:8080/product/buy", {key : product.key, buyerId: 1})
            if(response.status == 400){
                console.log("Buying failed");
            } else if(response.status == 200){
                console.log("Buying succeeded");
                //props.handleBuy();
            }
        }

    };

    const getCartItems = async () => {
        let response = await axios.get("http://localhost:8080/cart")
        if(response.status == 200){
            setCartItems(response.data)
        } else if (response.status == 204 || response.status == 210){
            setCartItems([])
            console.log(response.data)
        } //else props.handlePages(Pages.ERROR)
    }

    useEffect(() => {
        getCartItems()
    },[])

    return(
        <div>
            <Header handlePages={props.handlePages} page={props.page}/>
            <h1>Your Cart</h1>
            <Row>
                {cartItems.map((product) => (
                    <Col xs={4}>
                        <AddedProduct prod={product} key={product.key}>{}</AddedProduct>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs={1}>
                    <Button onClick={buyProducts} disabled={buying}>Buy</Button>
                </Col>
            </Row>
            <Footer/>
        </div>
    );
}
