import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";
import {IProduct} from "../components/Product";
import {AddedProduct} from "../components/AddedProduct";
import {Pages} from "../App";
import {Header} from "../components/Header";
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
        let success = false;

        for (const product of cartItems) {
            console.log(product);
            let response = await axios.put("http://localhost:8080/product/buy", {key : product.key})
            if(response.status == 400){
                console.log(`Buying of product ${product.productName} failed.`);
            } else if(response.status == 200){
                console.log(`Successfully bought: ${product.productName}`);
                success = true;
            }
        }
        if(success) {
            await axios.delete("http://localhost:8080/cart/empty")
            props.handlePages(Pages.PROFILE)
        }

    };

    const getCartItems = async () => {
        let response = await axios.get("http://localhost:8080/cart")
        if(response.status == 200){
            setCartItems(response.data)
        } else if (response.status == 204 || response.status == 210){
            setCartItems([])
            console.log(response.data)
            props.handlePages(Pages.PRODUCT)
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
                    <Col l={2} m={4}>
                        <AddedProduct prod={product} key={product.key} updateHandler={getCartItems}>{}</AddedProduct>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col xs={1}>
                    <Button onClick={buyProducts} disabled={buying}>Buy</Button>
                </Col>
            </Row>
        </div>
    );
}
