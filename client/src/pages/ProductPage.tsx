import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";
import {Pages} from "../App";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
axios.defaults.withCredentials = true;

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
// export function ProductPage(props:{products:IProduct[], categories:Category[], handleCart: (product : IProduct) => void, handleCategory: (categoryId : number) => void,  handleDeleteClick: () => void}){
export function ProductPage(props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    const [products,setProducts] = useState<IProduct[]>([])

    const updateProducts = async () => {
        try{
            const response = await axios.get<IProduct[] | string>("http://localhost:8080/product")
            if (response.status == 400){
                console.log(response.data)
                return
            }
            else if(response.status == 200 && !(typeof response.data == "string")){
                setProducts(response.data)
            }
        } catch (e : any){
            console.log(e)
        }
    }

    useEffect(() =>{
        updateProducts();
    }, [props.page]);


    return(
        <div>
            <Header handlePages={props.handlePages} page={props.page}/>
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
                                    {products.map((product) =>
                                        <Col xs={4}>
                                            {/*<Product prod={product} key={product.key} handleCart={props.handleCart} handleDeleteClick={props.handleDeleteClick}> */}
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
            <Footer/>
        </div>
    );
}