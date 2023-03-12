import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {IndexPage} from './pages/IndexPage';
import {ProductPage, Category} from './pages/ProductPage';
import {IProduct} from "./components/Product";
import {SellForm} from './components/SellForm';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {CartPage} from "./pages/CartPage";

function App() {
    const [formOpen, setformOpen] = useState(false);
    const [loggedIn, setloggedIn] = useState(false);
    const [sellAction, setsellAction] = useState(false);
    const [cartItems, setCartItems] = useState<IProduct[]>([]);
    const [cartItem, setcartItem] = useState<IProduct>();
    const [cartState, setCartState] = useState(false);
    const soffa: IProduct = {
        key: 1,
        productName: "soffa",
        productDescription: "En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",
        productCategory: "möbel",
        price: 123,
        seller: 1
    }
    const [products, setproducts] = useState<IProduct[]>([]);
    const [category, setcategory] = useState<Category[]>([
        {id: 0, category: "Furniture", marked: false},
        {id: 1, category: "Electronic", marked: false},
        {id: 2, category: "Clothes", marked: false}
    ]);
    const handleRegisterClick = () => {
        setformOpen(!formOpen);
    }
    const handleLoginClick = () => {
        setloggedIn(!loggedIn);
    }
    const handleSellClick = () => {
        setsellAction(!sellAction);
        updateProducts();
    }
    const handleCart = (product: IProduct) => {
        addToCart(product);
    }
    const handleBuy = () => {
        setCartItems([]);
        updateProducts();
        setCartState(false);
    }
    const removeFromCart = (product: IProduct) => {
        removeFromCart(product);
    }
    const toCartPage = () => {
        setCartState(!cartState);
        updateProducts();
    }

    const handleCategory = (categoryId : number) => {
        const nextCategory = category.map((category,i) => {
            if(i === categoryId){
                category.marked = !category.marked;
                return category;
            }
            else{
                return category;
            }
        });
        setcategory(nextCategory);
        updateCategoryProducts(categoryId);
    }

    async function addToCart(product: IProduct) {
        let tempCart = cartItems;
        tempCart.push(product);
        setCartItems(tempCart);
    }

    async function removeCart(product: IProduct) {
        let tempCart = cartItems;
        tempCart.pop();
        setCartItems(tempCart);
    }

    async function updateCategoryProducts(index : number){
        if(category[index].marked){
            await axios.put<IProduct[]>(`http://localhost:8080/product/filterProducts/addCat`, {category: category[index].category});
        }
        else{
            await axios.put<IProduct[]>(`http://localhost:8080/product/filterProducts/removeCat`, {category: category[index].category});
        }
        const response  = await axios.get<IProduct[]>(`http://localhost:8080/product/filterProducts/`);
        setproducts(response.data);
    }

    async function updateProducts() {
        // TODO Make it possible to change URL
        const response = await axios.get<IProduct[]>("http://localhost:8080/product/filterProducts/");
        setproducts(response.data);
    }

    useEffect(() => {
        updateProducts();
    }, []);

    if (sellAction) {
        return (
            <div>
                <SellForm handleSellClick={handleSellClick}></SellForm>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick}
                        handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <ProductPage products={products} categories={category} handleCart={handleCart} handleCategory={handleCategory}/>
            </div>
        );
    }
    if (cartState) {
        return (
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick}
                        handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <CartPage handleBuy={handleBuy} products={cartItems} removeCart={removeCart}></CartPage>
                <Footer></Footer>
            </div>
        );
    }
    if (loggedIn) {
        return (
            //Change to return the marketplace.
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick}
                        handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <ProductPage products={products} categories={category} handleCart={handleCart} handleCategory={handleCategory}/>
                <Footer/>
            </div>
        );
    } else {
        return (
            <div>
                <Header loggedIn={loggedIn} inCartPage={cartState} handleLoginClick={handleLoginClick}
                        handleSellClick={handleSellClick} cartItems={cartItems} toCartPage={toCartPage}/>
                <IndexPage handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick}
                           handleSellClick={handleSellClick} loggedIn={loggedIn} formOpen={formOpen}></IndexPage>
                <Footer></Footer>
            </div>
        )
    }
}

export default App;


