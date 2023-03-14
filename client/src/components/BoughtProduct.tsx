import {Button, Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../../server/src/model/User";
import {UpdateForm} from "./UpdateForm";
import {Pages} from "../App";
import {IProduct} from "./Product";
axios.defaults.withCredentials = true

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
export function BoughtProduct (props:  {
    children : object,
    prod : IProduct,
    productHandler: ()=>void,
    handlePage : (page: Pages) => void,
    page: Pages
}){

    return (
        <div>
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
                            <button className="btn-primary" style={{marginTop: "5px"}}>Contact seller</button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}


