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
export function LoginModal(props: {
    handlePages : (page: Pages) => void
    page: Pages
}){
    const [show, setShow] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const[username, setusername] = useState("");
    const[password, setpassword] = useState("");
    const[errorMessage, setErrorMessage] = useState("");

    const handleClose = () => {
        setShow(false);
        props.handlePages(Pages.INDEX)
    };

    const handleGoToLoginClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                    <Modal.Title className={"login-text"}>Login required</Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                        <form className={"login-form"} onSubmit={
                            async e => {
                                e.preventDefault();
                                try {
                                    const response = await axios.post("http://localhost:8080/user/login",{ username:username,password:password});
                                    if(response.status == 220){
                                        props.handlePages(Pages.PRODUCT);
                                    } else if(response.status == 401){
                                        setErrorMessage("Wrong username or password");
                                    }
                                    else if(response.status == 400){
                                        setErrorMessage("Type error - Bad put call")
                                    }
                                } catch (error){
                                    console.log(error);
                                }
                            }
                        }>
                            <div className={"login-div"}>
                                <input className={"login-form-input"} type="text" id="username" name="username"
                                       placeholder="Username" onChange={e => {
                                    setusername(e.target.value);
                                }}></input>
                            </div>
                            <div className={"login-div"}>
                                <input className={"login-form-input"} type="password" id="password" name="password"
                                       placeholder="Password" onChange={e => {
                                    setpassword(e.target.value);
                                }}></input>
                            </div>
                            <div>
                                {errorMessage && <p style={{ color: "red"}}>{errorMessage}</p>}
                            </div>
                            <div>
                                <input className={"btn-primary"} type="submit" value="Login" id="submitBtn" data-testid="loginButton"></input>
                            </div>
                            <div className={"text-center"}>
                                <hr></hr>
                                <span>OR</span>
                                <hr></hr>
                            </div>
                            <div>
                                <button className={"btn-primary"} type="button" onClick={() => props.handlePages(Pages.REGISTER)}>Register</button>
                            </div>
                        </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}