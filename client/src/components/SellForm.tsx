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
export function SellForm(props: {
    handlePages : (page: Pages) => void
    page: Pages
}){
    const[productName, setproductName] = useState("");
    const[productDescription, setproductDescription] = useState("");
    const[productCategory, setproductCategory] = useState("");
    const[price, setprice] = useState("")

    const [show, setShow] = useState(true);

    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [isPriceValid, setIsPriceValid] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.handlePages(Pages.PRODUCT)
    };

    const handleSellClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!productCategory){
            setIsCategorySelected(true);
            return;
        } else {
            setIsCategorySelected(false);
        }

        if(!productName.trim()){
            setproductName("");
            return;
        }

        if(!productDescription.trim()){
            setproductDescription("");
            return;
        }

        if(!price.trim() || isNaN(Number(price))){
            setprice("");
            setIsPriceValid(false);
            return;
        } else {
            setIsPriceValid(true);
        }

        await axios.post("http://localhost:8080/product", {
            productName: productName,
            productDescription: productDescription,
            productCategory: productCategory,
            price: Number(price),
        });

        handleClose();
    }

    return(
        <div>
            <Modal
                show={show}
                onHide={() => props.handlePages(Pages.PRODUCT)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header style={{backgroundColor: "#5d9667"}}>
                    <Modal.Title className={"login-text"}>Sell item</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSellClick}>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="productName" name="productName"
                                   placeholder="Title" value={productName} onChange={(e) =>
                                setproductName(e.target.value)
                            }/>
                            {buttonClicked && productName.trim() === "" && (<div className="text-danger">Please enter a title</div>)}
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="description" name="email"
                                   placeholder="Description" value={productDescription} onChange={(e) =>
                                setproductDescription(e.target.value)
                            }/>
                            {buttonClicked && productDescription.trim() === "" && (<div className="text-danger">Please enter a description</div>)}
                        </div>
                        <div className={"login-div"}>
                            <select className={"sell-form-category-input"} value={productCategory} onChange={e =>
                                setproductCategory(e.target.value)
                            }>
                                <option value="">Category</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Clothes">Clothes</option>

                            </select>
                            {buttonClicked && isCategorySelected && (<div className="text-danger">Please select a category.</div>)}
                        </div>
                        <div className={"login-div"}>
                            <input className={"login-form-input"} type="text" id="price" name="price"
                                   placeholder="Price" value={price} onChange={(e) =>
                                setprice(e.target.value)
                            }/>
                            {buttonClicked && price.trim() === "" && (<div className="text-danger">Please enter valid a price</div>)}
                        </div>
                        <div>
                            <input className={"btn-primary"}
                                   type="submit"
                                   value="Sell"
                                   id="submitBtn"
                                   data-testid="sellFormButton"
                                   onClick={() => setButtonClicked(true)}></input>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}