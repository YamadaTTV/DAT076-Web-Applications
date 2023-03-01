import React, {useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";
import {AddedProduct} from "../components/AddedProduct";

/** Used to get all the products from the server and display them.
 *
 */
export function CartPage(props:{products: IProduct[],removeCart: (product: IProduct) => void, handleBuy: () => void}){
    const [buying, setBuying] = useState(false);


    const buyProducts = async () => {
        setBuying(true);


        for (const product of props.products) {
            console.log(product);
            let response = await axios.put("http://localhost:8080/product/buy", {key : product.key, buyerId: 1})
            if(response.status == 400){
                console.log("Buying failed");
            } else if(response.status == 200){
                console.log("Buying succeeded");
                props.handleBuy();
            }
        }

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
    );
}
