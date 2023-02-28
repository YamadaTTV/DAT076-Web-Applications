import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
export function Product (props:  {children : object, prod : IProduct}){
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
 * Interface for describing what data a product is expected to have
 */
export interface IProduct {
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

