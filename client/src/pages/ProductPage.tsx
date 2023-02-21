import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";

export interface Category{
    id: number;
    category: string;
    marked: boolean;
}

interface CategoryProps{
    key: number;
    marked: boolean;
    children? : React.ReactNode;
    onMarked : () => Promise<void>;
}

function CategoryItem({marked, children, onMarked} : CategoryProps){
    return (
        <ul className={"category-item"}>
            <input type={"checkbox"} checked={marked}
                   onChange = {async e => {
                       onMarked();
                   }}
            />
            {children}
        </ul>
    )
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


/**Product component, used to visualize data of a product
 * Take data of IProd as parameter and returns a component card.
 * @param props A props containing product information with all data of IProduct
 * @return Card With layout of a product.
 */
function Product (props:  {children : object, prod : IProduct}){
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




/** Used to get all the products from the server and display them.
 *
 */
export function ProductPage(props:{products:IProduct[], categories:Category[]}){
    return(
        <div style={{marginTop: "25px", marginLeft: "10px"}}>
            <Row xs={12}>
                <Col xs={2}>
                    <div className={"category-div"}>
                        <h3 className={"login-text"}>Filter</h3>
                        {props.categories.map((category) =>
                            <CategoryItem
                                key={category.id}
                                marked={category.marked}
                                onMarked={async () => {
                                    await axios.post(`http://localhost:8080/task/${category.id}`,
                                        {marked : true}
                                    );
                                }}>
                                &emsp;{category.category}
                            </CategoryItem>)}
                    </div>

                </Col>
                <Col xs={10}>
                    <div style={{marginRight: "10px"}}>
                        <h3>Browse items</h3>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {props.products.map((product) =>
                                    <Col xs={4}>
                                        <Product prod={product} key={product.key}>
                                        </Product>
                                    </Col>)
                                }
                            </Row>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>

    );
}