import {Header} from "../components/Header";
import {F} from "msw/lib/glossary-de6278a9";
import {Footer} from "../components/Footer";

export function AboutUsPage(props: {
    handleHomeClick: () => void,
    handleAboutClick: () => void,
    handleBrowseClick: () => void,
})
{
    return(
        <div>
            <Header handleHomeClick={props.handleHomeClick} handleAboutClick={props.handleAboutClick}/>
            <h1>This project is done in the course Web Applications DAT076</h1>
            <h2>Authors: Liam Mattsson, Marcus Phu & Rasmus Standar</h2>
            <Footer/>
        </div>)
}