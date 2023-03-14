import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import axios from "axios";
import {Pages} from "../App";
axios.defaults.withCredentials = true;

/**
 * The component for the SellForm, shows a sell menu
 * @param handleSellClick - handler for when sell button is pressed.
 * @return A sell menu.
 */
export function AddedToCartForm(props: {
    handlePage : (page: Pages) => void
    page: Pages
}){
    const [show, setShow] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.handlePage(Pages.PRODUCT)
    };

    const handleSellClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleClose();
    }

    return(
        <div>
            <Modal
                show={show}
                onHide={() => props.handlePage(Pages.PRODUCT)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{backgroundColor: "#5d9667"}}>
                    <Modal.Title className={"login-text"}>Added to cart</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSellClick}>
                        <h4> Product has been added to cart!</h4>
                        <div>
                            <input className={"btn-primary"} type="submit" value="Okay" id="submitBtn" onClick={() => setButtonClicked(true)}></input>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}