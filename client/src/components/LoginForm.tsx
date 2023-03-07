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
    const[errorMessage, setErrorMessage] = useState("");

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/user/login",{ username:username,password:password});
            console.log(response);
            if(response.status == 202){
                console.log("Success");
                props.handleLoginClick();
            } else if(response.status == 203){
                console.log("FAIL");
                setErrorMessage("Wrong username or password");
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <div data-testid="loginForm">
            <div className={"login-container"}>
                <h1 className={"login-form"}>Welcome to Marketplace!</h1>
                <form className={"login-form"} onSubmit={handleLogin}>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="username" name="username" placeholder="Username" onChange={e => {
                            setusername(e.target.value);
                        }}></input>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="password" id="password" name="password" placeholder="Password" onChange={e => {
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
                        <button className={"btn-primary"} type="button" onClick={props.handleRegisterClick}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}