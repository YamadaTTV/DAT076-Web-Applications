import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';

import {IndexPage} from './pages/IndexPage';
import {RegisterPage} from "./pages/RegisterPage";
import {AboutUsPage} from "./pages/AboutUsPage";
import {ProductPage} from "./pages/ProductPage";




export enum Pages {
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
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.REGISTER:
            return <RegisterPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.PRODUCT:
            return <ProductPage/>
        case Pages.ABOUT:
            return <AboutUsPage
                handlePages = {handlePages}
                page = {page}
            />
    }


    async function handlePages(page: Pages){
        setPage(page)
    }

    return <p>Error occurred</p>
}

export default App;


