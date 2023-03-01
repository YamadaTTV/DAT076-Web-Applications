import React, {useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";

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
                    <Col xs={12}>
                        <button className="btn-primary">Contact seller</button>
                    </Col>
                    <Col xs={12}>
                        <button className="btn-primary" style={{marginTop: "5px"}} onClick={() => props.removeCart(props.prod)}>Remove</button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}