import {Pages} from "../App";

import React, {useEffect, useState} from "react";
import {IProduct, Product} from "../components/Product";
import axios from "axios";
import {Header} from "../components/Header";
import {Col, Row} from "react-bootstrap";
import {Footer} from "../components/Footer";
import {BoughtProduct} from "../components/BoughtProduct";
axios.defaults.withCredentials = true;

export function ProfilePage(props: {
    handlePages: (page: Pages)=>void,
    page: Pages
}){
    const [sellerListings,setSellerListings] = useState<IProduct[]>([])
    const [boughtItems,setBoughtItems] = useState<IProduct[]>([])
    const [loggedInUser, setLoggedInUser] = useState<IUser | undefined>(undefined)

    const getLoggedInUser = async () => {
        try{
            const response = await axios.get<IUser>("http://localhost:8080/user/loggedInUser")
            console.log("loggedin"+response.data.username +"status: " +response.status)
            if(response.status == 200) {
                setLoggedInUser(response.data)
            }
            else {
                setLoggedInUser(undefined)
            }
        } catch (e: any){
            props.handlePages(Pages.ERROR)
        }
    }

    const updateSellerListings = async () => {
        try{
            const response = await axios.get<IProduct[] | string>("http://localhost:8080/product/sellerListings")
            console.log("US" +response.data)
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

    const updateBoughtItems = async () => {
        try{
            const response = await axios.get<IProduct[] | string>("http://localhost:8080/product/boughtProducts")
            console.log("UB" +response.data)
            if (response.status == 400){
                console.log(response.data)
                return
            }
            else if(response.status == 200 && !(typeof response.data == "string")){
                setBoughtItems(response.data)
            }
        } catch (e : any){
            console.log(e)
        }
    }

    useEffect(() =>{
        updateSellerListings();
        updateBoughtItems();
        getLoggedInUser();
    }, []);

    return <div>
        {/*<Header handlePages={props.handlePages} page={props.page}/> */}
        <h3>Profile <br></br>Username: {loggedInUser?.username} <br></br>Email: {loggedInUser?.email}</h3>
        <div style={{marginTop: "25px", marginLeft: "10px"}} data-testid="ProfilePage">
            <Row xs={12}>
                <Col xs={12}>
                    <div style={{marginRight: "10px"}}>
                        <h4>Your listings:</h4>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {sellerListings.map((product) =>
                                    <Col l={2} m={4}>
                                        <div data-testid="SellerListingCard">
                                            <Product prod={product} key={"sl"+product.key} productHandler={updateSellerListings} page={props.page} handlePage={props.handlePages}>
                                            </Product>
                                        </div>
                                    </Col>)
                                }
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row xs={12}>
                <Col xs={12}>
                    <div style={{marginRight: "10px"}}>
                        <h4>Bought items:</h4>
                        <div style={{marginRight:"25px"}}>
                            <Row>
                                {boughtItems.map((product) =>
                                    <Col l={2} m={4} >
                                        <div data-testid="BoughtProductCard">
                                            <BoughtProduct prod={product} key={"bi"+product.key} productHandler={updateBoughtItems} page={props.page} handlePage={props.handlePages}>
                                            </BoughtProduct>
                                        </div>
                                    </Col>)
                                }
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>


    }

/**
* Interface for describing what data a product is expected to have
*/
export interface IUser {
    id: number
    username: string
    email: string
    password: string
}

