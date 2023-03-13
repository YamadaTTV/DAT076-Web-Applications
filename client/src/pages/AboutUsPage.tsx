import {Header} from "../components/Header";
import {F} from "msw/lib/glossary-de6278a9";
import {Footer} from "../components/Footer";
import React from "react";
import {Pages} from "../App";

export function AboutUsPage(props: {
    page : Pages,
    handlePages : (page : Pages) => void
})
{
    return(
        <div>
            <Header handlePages={props.handlePages} page={props.page}/>
            <h1>This project is done in the course Web Applications DAT076</h1>
            <h2>Authors: Liam Mattsson, Marcus Phu & Rasmus Standar</h2>
            <Footer/>
        </div>)
}