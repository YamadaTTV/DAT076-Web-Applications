import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';

import {IndexPage} from './pages/IndexPage';
import {RegisterPage} from "./pages/RegisterPage";
import {AboutUsPage} from "./pages/AboutUsPage";
import {ProductPage} from "./pages/ProductPage";
import axios from "axios";
import {SellPage} from "./pages/SellPage";
import {ProfilePage} from "./pages/ProfilePage";




export enum Pages {
    INDEX,
    REGISTER,
    PRODUCT,
    SELL,
    PROFILE,
    ABOUT,
    ERROR
}


function App() {
    const [page,setPage] = useState<Pages>(Pages.INDEX)

    switch (page) {
        case Pages.INDEX:
            return <IndexPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.REGISTER:
            return <RegisterPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.PRODUCT:
            return <ProductPage
                handlePages = {handlePages}
                page = {page}/>
        case Pages.SELL:
            return <SellPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.PROFILE:
            return <ProfilePage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.ABOUT:
            return <AboutUsPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.ERROR:
            return <h1>An error has occurred</h1>
    }


    async function handlePages(page: Pages){
        setPage(page)
    }

    async function userLoggedIn(): Promise<boolean>{
        const response = await axios.get("localhost:8080/")
        if(response.status!=200){
            return false
        }
        return true
    }

    return <p>Error occurred</p>
}

export default App;


