import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";

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