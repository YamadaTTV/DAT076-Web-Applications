import React, {useState} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

/**
 * The component for the RegisterForm, shows a register menu
 * @param
 *          handleRegisterClick - handler for when register button is pressed.
 * @return A register menu.
 */
export function RegisterForm(props: {handleRegisterClick : () => void}){
    const[username, setusername] = useState("");
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    //const[repeatPassword, setrepeatPassword] = useState("");
    return(
        <div>
            <div className={"login-container"}>
                <h1 className={"login-form"}>Register!</h1>

                <form className={"login-form"}
                      onSubmit={
                          async e => {
                              e.preventDefault();
                              await axios.post("http://localhost:8080/user",{ username:username,password:password, email:email})
                              props.handleRegisterClick()
                          }
                      }>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="username" name="username"
                               placeholder="Username" onChange={e => {
                            setusername(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="email" name="email"
                               placeholder="Email" onChange={e => {
                            setemail(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="password" id="password" name="password"
                               placeholder="Password" onChange={e => {
                            setpassword(e.target.value);
                        }}>
                        </input>
                    </div>
                    <div>
                        <input className={"btn-primary"} type="submit" value="Register" id="submitBtn"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}