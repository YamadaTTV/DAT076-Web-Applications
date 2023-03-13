import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import axios from "axios";

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
export function Product (props:  {children : object, prod : IProduct, handleCart: (product : IProduct) => void, handleDeleteClick: () => void}){
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
                    <Col xs={12}>
                        <button className="btn-primary" onClick={() => props.handleCart(props.prod)}>Add to Cart</button>
                    </Col>
                    {/* TODO: FIX SO WE CHECK IF THE PROD.SELLERID == THE LOGGED IN USERID */}
                    {props.prod.sellerId == 1 && <Col xs={12}>
                        <button className="btn-sell" style={{marginTop: "5px"}} onClick={
                            async e => {
                                e.preventDefault();
                                await axios.delete("http://localhost:8080/product/", {data: {key : props.prod.key}})
                                props.handleDeleteClick();
                            }
                        }

                        >Delete listing</button>
                    </Col>}
                    {/* TODO: FIX SO WE CHECK IF THE PROD.SELLERID != THE LOGGED IN USERID */}
                    {props.prod.sellerId != 1 &&
                        <Col xs={12}>
                        <button className="btn-primary" style={{marginTop: "5px"}}>Contact seller</button>
                    </Col>
                    }

                </Row>
            </Card.Body>
        </Card>
    );
}

/**
 * Interface for describing what data a product is expected to have
 */
export interface IProduct {
    key: number,
    productName: string,
    productDescription: string,
    productCategory: string,
    price: number,
    sellerId : number,
    buyer ?: number
    children? : React.ReactNode
    //const soffa: IProduct = {productName:"soffa",productCategory:"möbel",price:123,seller:1}
}

