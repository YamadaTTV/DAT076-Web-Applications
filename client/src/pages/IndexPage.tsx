import {Col, Row} from "react-bootstrap";
import React from "react";
import {LoginForm} from '../components/LoginForm';
import {RegisterForm} from '../components/RegisterForm';

export function IndexPage(props: {handleLoginClick : () => void, handleRegisterClick : () => void, handleSellClick : () => void, loggedIn : Boolean, formOpen : Boolean}){
    const wallpaper = require("./wallpaperflare.com_wallpaper.jpg");
    return(
        <div>
            <Row>
                <Col lg={9} xs={0}>
                    <div className={"img-container"}>
                        <figure className="position-relative">
                            <img src={wallpaper} className="img-fluid"/>
                            <figcaption className="citation-div">
                                <div className="citation text-white">
                                    ” <br></br>
                                    &nbsp;&ensp;Shopping
                                    <span className="secondhand"> secondhand</span>
                                    <br></br>
                                    &ensp;&nbsp;isn't a sacrifice. It's <br></br>&nbsp;&ensp;your ticket to a <span
                                    className="secondhand">good life</span>.
                                    <br></br>
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;„
                                    <br></br>
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;<span className="textSpan">- Nicole Lapin</span>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </Col>
                <Col className={"login-container"} lg={3} xs={12}>
                    <div>
                        {!props.formOpen &&
                            <LoginForm handleLoginClick={props.handleLoginClick} handleRegisterClick={props.handleRegisterClick}/>
                        }
                        {props.formOpen &&
                            <div>
                                <RegisterForm handleRegisterClick={props.handleRegisterClick}/>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}
