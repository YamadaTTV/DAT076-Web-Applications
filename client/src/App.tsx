import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';

import {IndexPage} from "./pages/IndexPage";
import {RegisterPage} from "./pages/RegisterPage";
import {AboutUsPage} from "./pages/AboutUsPage";
import {ProductPage} from "./pages/ProductPage";
import {SellPage} from "./pages/SellPage";
import {ProfilePage} from "./pages/ProfilePage";
import {CartPage} from "./pages/CartPage";
import {AddedToCartPage} from "./pages/AddedToCartPage";


export enum Pages {
    INDEX,
    REGISTER,
    PRODUCT,
    SELL,
    PROFILE,
    ABOUT,
    ERROR,
    CART,
    ADDED
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
        case Pages.CART:
            return <CartPage
                handlePages = {handlePages}
                page = {page}
            />
        case Pages.ADDED:
            return <AddedToCartPage
                handlePages = {handlePages}
                page = {page}
            />
    }

    async function handlePages(page: Pages){
        setPage(page)
    }
}

export default App;


