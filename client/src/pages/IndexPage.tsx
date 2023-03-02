import {Col, Row} from "react-bootstrap";
import React from "react";
import {LoginForm} from '../components/LoginForm';
import {RegisterForm} from '../components/RegisterForm';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

export function IndexPage(props: {
    handleLoginClick : () => void,
    handleRegisterClick : () => void,
    handleAboutClick: () => void,
    handleHomeClick : () => void
})
{
    const wallpaper = require("../img/wallpaperflare.com_wallpaper.jpg");
    return(
        <div>
            <Header handleHomeClick={props.handleHomeClick} handleAboutClick={props.handleAboutClick}/>
            <div data-testid="indexPage">
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
                            <LoginForm handleLoginClick={props.handleLoginClick} handleRegisterClick={props.handleRegisterClick}/>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer/>
        </div>
    )
}
