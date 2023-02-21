import React, {useState} from "react";
import axios from "axios";

/**
 * The component for the LoginForm, shows a login menu
 * @param handleLoginClick - handler for when login button is pressed.
 *          handleRegisterClick - handler for when register button is pressed.
 * @return A login menu.
 */
export function LoginForm(props: {handleLoginClick : () => void, handleRegisterClick : () => void}) {
    const[username, setusername] = useState("");
    const[password, setpassword] = useState("");
    return (
        <div>
            <div className={"login-container"}>
                <h1 className={"login-form"}>Welcome to Marketplace!</h1>
                <form className={"login-form"} onSubmit={
                    async e => {
                        e.preventDefault();
                        let response = await axios.post("http://localhost:8080/user/login",{ username:username,password:password})
                        if(response.status == 400){
                            //Mark something as wrong.
                        } else if (response.status == 202){
                            console.log("Success")
                            props.handleLoginClick()
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
                        <input className={"btn-primary"} type="submit" value="Login" id="submitBtn"></input>
                    </div>
                    <div className={"text-center"}>
                        <hr></hr>
                        <span>OR</span>
                        <hr></hr>
                    </div>
                    <div>
                        <button className={"btn-primary"} type="button" onClick={props.handleRegisterClick}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}