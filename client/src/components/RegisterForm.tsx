import React, {useState} from "react";
import axios from "axios";

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
    const [registerError, setRegisterError] = useState("");

    const handleRegisterSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
            props.handleRegisterClick();
            setRegisterError("");
        } else {
            return;
        }
    }
    return(
        <div>
            <div className={"login-container"}>
                <h1 className={"login-form"}>Register!</h1>

                <form className={"login-form"}
                      onSubmit={handleRegisterSubmit}>
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