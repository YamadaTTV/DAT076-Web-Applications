import {Pages} from "../App";
import React, {useEffect, useState} from "react";
import {IProduct, Product} from "../components/Product";
import axios from "axios";
import {Header} from "../components/Header";
import {Col, Row} from "react-bootstrap";
import {Footer} from "../components/Footer";

export function ProfilePage(props: {
    handlePages: (page: Pages)=>void,
    page: Pages
}){
    const [sellerListings,setSellerListings] = useState<IProduct[]>([])

    const updateSellerListings = async () => {
        try{
            const response = await axios.get<IProduct[] | string>("http://localhost:8080/product/sellerListings")
            if (response.status == 400){
                console.log(response.data)
                return
            }
            else if(response.status == 200 && !(typeof response.data == "string")){
                setSellerListings(response.data)
            }
        } catch (e : any){
            console.log(e)
        }
    }

    useEffect(() =>{
        updateSellerListings();
    }, []);

    return <div>
        <Header handlePages={props.handlePages} page={props.page}/>
        <div style={{marginTop: "25px", marginLeft: "10px"}} data-testid="ProfilePage">
            <Row xs={12}>
                <Col xs={10}>
                    <div style={{marginRight: "10px"}}>
                        <h3>Profile</h3>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {sellerListings.map((product) =>
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
        <Footer/>
    </div>
}