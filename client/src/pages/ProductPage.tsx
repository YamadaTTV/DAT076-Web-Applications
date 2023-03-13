import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
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
                       await onMarked();
                       marked = true;
                   }}
            />
            {children}
        </ul>
    )
}

/** Used to get all the products from the server and display them.
 *
 */
export function ProductPage(props:{products:IProduct[], categories:Category[], handleCart: (product : IProduct) => void, handleCategory: (categoryId : number) => void,  handleDeleteClick: () => void}){
    return(
        <div style={{marginTop: "25px", marginLeft: "10px"}} data-testid="productPage">
            <Row xs={12}>
                <Col xs={2}>
                    <div className={"category-div"}>
                        <h3 className={"login-text"}>Filter</h3>
                        {props.categories.map((category) =>
                            <CategoryItem
                                key={category.id}
                                marked={category.marked}
                                onMarked={async () => {
                                    props.handleCategory(category.id);
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
                                        <Product prod={product} key={product.key} handleCart={props.handleCart} handleDeleteClick={props.handleDeleteClick}>
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