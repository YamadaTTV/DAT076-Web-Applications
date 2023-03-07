import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import axios from "axios";
import {Pages} from "../App";

/**
 * The component for the SellForm, shows a sell menu
 * @param handleSellClick - handler for when sell button is pressed.
 * @return A sell menu.
 */
export function SellForm(props: {
    handlePage : (page: Pages) => void
    page: Pages
}){
    const[productName, setproductName] = useState("");
    const[productDescription, setproductDescription] = useState("");
    const[productCategory, setproductCategory] = useState("");
    const[price, setprice] = useState("")
    //const[sellerId, setsellerId] = useState(1); //Change to automatically take the logged in users id.

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.handlePage(Pages.PRODUCT)
    };

    return(
        <div>
            <Modal
                show={show}
                onHide={() => props.handlePage(Pages.PRODUCT)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{backgroundColor: "#5d9667"}}>
                    <Modal.Title className={"login-text"}>Sell item</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={
                            async e => {
                                e.preventDefault();
                                await axios.post("http://localhost:8080/product",{ productName:productName, productDescription:productDescription, productCategory:productCategory, price:Number(price)})
                                props.handlePage(Pages.PRODUCT)
                            }
                        }>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="productName" name="productName"
                                   placeholder="Title" onChange={e => {
                                setproductName(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="description" name="email"
                                   placeholder="Description" onChange={e => {
                                setproductDescription(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="category" name="category"
                                   placeholder="Category" onChange={e => {
                                setproductCategory(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="price" name="price"
                                   placeholder="Price" onChange={e => {
                                setprice(e.target.value);
                            }}>
                            </input>
                        </div>
                        <div>
                            <input className={"btn-primary"} type="submit" value="Sell" id="submitBtn"></input>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}