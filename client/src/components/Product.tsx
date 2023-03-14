import {Button, Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../../server/src/model/User";
import {UpdateForm} from "./UpdateForm";
import {Pages} from "../App";
axios.defaults.withCredentials = true

/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
export function Product (props:  {
    children : object,
    prod : IProduct,
    productHandler: ()=>void,
    handlePage : (page: Pages) => void,
    page: Pages
}){
    const [loggedInUserId, setLoggedInUserId] = useState<number | undefined>(undefined)
    const [displayModal,setDisplayModal] = useState<boolean>(false)

    const getLoggedInUser = async () => {
        const response = await axios.get("http://localhost:8080/user/loggedInUser")
        if(response.status == 200) setLoggedInUserId(response.data.id)
        else setLoggedInUserId(undefined)
    }

    useEffect(() => {
        getLoggedInUser()
        props.productHandler()
    },[displayModal])

    return (
        <div>
            {displayModal && <UpdateForm handlePage={props.handlePage} page={props.page} product={props.prod} updateHandler={() => {
                props.productHandler();
                setDisplayModal(false);
            }}/>}
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

                    </Col>
                    {props.prod.sellerId == loggedInUserId &&
                    <Col xs={12}>
                        <button className="btn-primary" style={{marginTop: "5px"}} onClick={
                            async e => {
                                e.preventDefault();
                                console.log("Updating product")
                                setDisplayModal(true)
                            }
                        }
                        >Update product</button>
                    </Col>}
                    {props.prod.sellerId != loggedInUserId &&
                    <Col xs={12}>
                        <button className="btn-primary" onClick={async () => {
                            if(loggedInUserId != null) {
                                await axios.post("http://localhost:8080/cart",{product:props.prod})
                                props.handlePage(Pages.ADDED)
                            } else {
                                props.handlePage(Pages.LOGINMODAL)
                            }
                        }}>Add to Cart</button>
                    </Col>
                    }

                    {props.prod.sellerId == loggedInUserId && <Col xs={12}>
                        <button className="btn-delete" style={{marginTop: "5px"}} onClick={
                            async e => {
                                e.preventDefault();
                                await axios.delete("http://localhost:8080/product/", {data: {key : props.prod.key}})
                                props.productHandler()
                            }
                        }

                        >Delete listing</button>
                    </Col>}
                    {props.prod.sellerId != loggedInUserId &&
                        <Col xs={12}>
                            <button className="btn-primary" style={{marginTop: "5px"}}>Contact seller</button>
                        </Col>
                    }
                </Row>
            </Card.Body>
        </Card>
        </div>
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
}

