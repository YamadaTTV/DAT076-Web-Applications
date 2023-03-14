import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {Product, IProduct} from "../components/Product";
import {Pages} from "../App";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {UpdateForm} from "../components/UpdateForm";
axios.defaults.withCredentials = true;

export interface Category{
    id: number;
    category: string;
    marked: boolean;
}

interface CategoryProps{
    key: number;
    marked: boolean;
    children? : React.ReactNode;
    onMarked : () => Promise<void>;
}

function CategoryItem({marked, children, onMarked} : CategoryProps){
    return (
        <ul className={"category-item"}>
            <input type={"checkbox"} checked={marked}
                   onChange = {async e => {
                       await onMarked();
                       marked = true;
                   }}
            />
            {children}
        </ul>
    )
}



/** Used to get all the products from the server and display them.
 *
 */
// export function ProductPage(props:{products:IProduct[], categories:Category[], handleCart: (product : IProduct) => void, handleCategory: (categoryId : number) => void,  handleDeleteClick: () => void}){
export function ProductPage(props:{
    page : Pages,
    handlePages : (page : Pages) => void
}){
    const [products,setProducts] = useState<IProduct[]>([])
    const [category, setCategory] = useState<Category[]>([
        {id: 0, category: "Furniture", marked: false},
        {id: 1, category: "Electronic", marked: false},
        {id: 2, category: "Clothes", marked: false}
    ]);

    async function updateCategoryProducts(index : number){
        if(category[index].marked){
            await axios.put<IProduct[]>(`http://localhost:8080/product/filterProducts/addCat`, {category: category[index].category});
        }
        else{
            await axios.put<IProduct[]>(`http://localhost:8080/product/filterProducts/removeCat`, {category: category[index].category});
        }
        const response  = await axios.get<IProduct[]>(`http://localhost:8080/product/filterProducts/`);
        setProducts(response.data);
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
        setCategory(nextCategory);
        updateCategoryProducts(categoryId);
    }

    const productHandler = () => {
        updateProducts()
    }

    const updateProducts = async () => {
        try{
            const response = await axios.get<IProduct[] | string>("http://localhost:8080/product/filterProducts")
            if(response.status == 229 && !(typeof response.data == "string")){
                setProducts(response.data)
            }
        } catch (e : any){
            console.log(e)
        }
    }

    useEffect(() =>{
        updateProducts();
    }, [props.page]);



    return(
        <div>
            <Header handlePages={props.handlePages} page={props.page}/>
            <div style={{marginTop: "25px", marginLeft: "10px"}} data-testid="productPage">
                <Row xs={12}>
                    <Col xs={2}>
                        <div className={"category-div"}>
                            <h3 className={"login-text"}>Filter</h3>
                            {category.map((category) =>
                                <CategoryItem
                                    key={category.id}
                                    marked={category.marked}
                                    onMarked={async () => {
                                        handleCategory(category.id);
                                    }}>
                                    &emsp;{category.category}
                                </CategoryItem>)}
                        </div>
                    </Col>
                    <Col xs={10}>
                        <div style={{marginRight: "10px"}}>
                            <h3>Browse items</h3>
                            <div style={{marginRight:"25px"}}>
                                <Row>
                                    {products.map((product) =>
                                        <Col l={2} m={4}>
                                                <Product prod={product} key={"p"+product.key} productHandler={productHandler} page={props.page} handlePages={props.handlePages}>
                                                </Product>
                                        </Col>)
                                    }
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}