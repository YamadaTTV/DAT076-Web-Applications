import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';

import {IndexPage} from './pages/IndexPage';
import {RegisterPage} from "./pages/RegisterPage";
import {AboutUsPage} from "./pages/AboutUsPage";
import {ProductPage} from "./pages/ProductPage";




enum Pages {
    INDEX,
    REGISTER,
    PRODUCT,
    SELL,
    PROFILE,
    ABOUT
}


function App() {
    const [page,setPage] = useState<Pages>(Pages.INDEX)

    switch (page) {
        case Pages.INDEX:
            return <IndexPage
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
                handleHomeClick={handleHomeClick}
                handleAboutClick={handleAboutClick}
            />
        case Pages.REGISTER:
            return <RegisterPage
                handleRegisterClick={handleRegisterClick}
                handleHomeClick={handleHomeClick}
                handleAboutClick={handleAboutClick}
            />
        case Pages.PRODUCT:
            return <ProductPage/>
        case Pages.ABOUT:
            return <AboutUsPage handleHomeClick={handleHomeClick} handleAboutClick={handleAboutClick} handleBrowseClick={handleBrowseClick}/>
    }

    async function handleLoginClick() {
        setPage(Pages.PRODUCT)
    }

    async function handleRegisterClick(){
        if(page == Pages.REGISTER) setPage(Pages.INDEX)
        else setPage(Pages.REGISTER)
    }


    async function handleHomeClick(){
        if(page == Pages.REGISTER || page == Pages.INDEX) setPage(Pages.INDEX)
        else setPage(Pages.PRODUCT)
    }

    async function handleAboutClick(){
        setPage(Pages.ABOUT)
    }

    async function handleBrowseClick(){
        console.log("Browse clicked")
    }

    return <p>Error occurred</p>
}

export default App;


