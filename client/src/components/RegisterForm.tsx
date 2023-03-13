import React, {useState} from "react";
import axios from "axios";
import {Pages} from "../App";
axios.defaults.withCredentials = true;

/**
 * The component for the RegisterForm, shows a register menu
 * @param
 *          handleRegisterClick - handler for when register button is pressed.
 * @return A register menu.
 */
export function RegisterForm(props: {handlePages : (page: Pages) => void, page: Pages}){
    const[username, setusername] = useState("");
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    const [registerError, setRegisterError] = useState("");

    return(
        <div>
            <div className={"login-container"}>
                <h1 className={"login-form"}>Register!</h1>

                <form className={"login-form"}
                      onSubmit={
                          async e => {
                              e.preventDefault();
                              setRegisterError("");

                              // Check email format
                              const emailRegex = /^\S+@\S+\.\S+$/;
                              if(!emailRegex.test(email)){
                                  setRegisterError("Invalid email format");
                                  return;
                              }

                              if(!password){
                                  setRegisterError("Please enter a password");
                                  return;
                              }

                              const response = await axios.post("http://localhost:8080/user", { username: username, password: password, email: email });
                              if(response.status == 210){
                                  setRegisterError("Username or email already exists")
                                  return;
                              } else if(response.status == 201){
                                  props.handlePages(Pages.INDEX)
                                  setRegisterError("")
                              } else {
                                  return;
                              }
                          }
                      }>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="username" name="username"
                               placeholder="Username" value={username} onChange={e => {
                            setusername(e.target.value);
                        }}/>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="text" id="email" name="email"
                               placeholder="Email" value={email} onChange={e => {
                            setemail(e.target.value);
                        }}/>
                    </div>
                    <div className={"login-div"}>
                        <input className={"login-form-input"} type="password" id="password" name="password"
                               placeholder="Password" onChange={e => {
                            setpassword(e.target.value);
                        }}>
                        </input>
                    </div>
                    {registerError && <p style={{color: "red"}}>{registerError}</p>}
                    <div>
                        <input className={"btn-primary"} type="submit" value="Register" id="submitBtn"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}