import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import {IProduct} from "./Product";
import axios from "axios";
//import {body} from "msw";

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
export function AddedProduct(props: {
    children: object,
    prod: IProduct,
    updateHandler: () => void
}){
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
                        <button className="btn-delete" style={{marginTop: "5px"}} onClick={async () => {
                            await axios.delete("http://localhost:8080/cart",{data: {product:props.prod}})
                            props.updateHandler()
                        }}>Remove</button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}


