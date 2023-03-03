import React, {useEffect, useState} from "react";
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
export function ProductPage(props:{}){
    const [listings,setListings] = useState<IProduct[]>([])
    const updateSellerListings = async () => {
        try{
            const listings = await axios.get<IProduct[] | string>("http://localhost:8080/product/sellerListings")
            if (listings.status == 400){
                console.log(listings.data)
                return
            }
            else if(listings.status == 200 && !(typeof listings.data == "string")){
                console.log("updateSellerListings")
                setListings(listings.data)
            }
        } catch (e : any){
            console.log(e)
        }
    }
    updateSellerListings()
    useEffect(() =>{
        updateSellerListings();
    }, []);
    return(
        <div style={{marginTop: "25px", marginLeft: "10px"}} data-testid="productPage">
            <Row xs={12}>
                <Col xs={10}>
                    <div style={{marginRight: "10px"}}>
                        <h3>Browse items</h3>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {listings.map((product) =>
                                    <Col xs={4}>
                                        <Product prod={product} key={product.key} handleCart={() => {}}>
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

