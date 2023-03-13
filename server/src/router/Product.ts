import express, {Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {userRouter, userService} from "./User";
import {Product} from "../model/Product";

const productService = makeProductService();


export const productRouter = express.Router();

productRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Product> | String>
) => {
    try {
        const tasks = await productService.getProducts();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.get("/available/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Product> | String>
) => {
    try {
        const tasks = await productService.getAvailableProducts();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.post("/", async (
    req: Request<{}, {},{productName: string, productDescription: string, productCategory: string, price: number, sellerId : number}>,
    res: Response<Product | string>
) => {
    try {
        let productName = req.body.productName;
        let productDescription = req.body.productDescription;
        let productCategory = req.body.productCategory;
        let price = req.body.price;
        let sellerId = req.body.sellerId;

        if (typeof(productName) !== "string" || typeof(productDescription) !== "string" || typeof(productCategory) !== "string" || typeof(price) !== "number" || typeof(sellerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- productName has type ${typeof(productName)}, productDescription has type ${typeof(productDescription)}, productCategory has type ${typeof(productCategory)}, price has type ${typeof(price)},sellid has type ${typeof(sellerId)},  `);
            return;
        }

        if(!await userService.userExists(sellerId)){
            res.status(210).send(`User with sellerId ${sellerId} does not exist.`);
            return;
        }
        const newProduct = await productService.addProduct(productName,productDescription,productCategory,price,sellerId);
        res.status(201).send(newProduct);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.delete("/", async(
    req: Request<{}, {}, {key : number}>,
    res: Response<String>
) => {
    try{
        let key = req.body.key;

        if (typeof(key) !== "number") {
            res.status(403).send(`Bad PUT call to ${req.originalUrl} ---key has type ${typeof(key)}`);
            return;
        }
        const response = await productService.deleteProduct(key);
        res.status(202).send("Successfully deleted product " + response.valueOf());

    }catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.put("/buy", async (
    req: Request<{}, {},{key: number, buyerId : number}>,
    res: Response<Product | string>
) => {
    try {
        let key = req.body.key;
        let buyerId = req.body.buyerId;

        if (typeof (key) !== "number" || typeof (buyerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- key has type ${typeof(key)}, buyerId has type ${typeof(buyerId)}`);
            return;
        }

        if (!await productService.productExist(key)) {
            res.status(401).send("Product does not exit");
            return
        }
        if (!await userService.userExists(buyerId)) {
            res.status(402).send("User does not exit");
            return;
        }

        let product =await productService.buyProduct(key, buyerId);
        res.status(200).send(product)

    }catch(e: any){
        res.status(500).send(e.message);
    }
});

productRouter.put(":/id", async(req: Request<{id: string},{}, Product>, res: Response<string>) => {
    try{
        if(!req.params.id){
            res.status(210).send(`Bad PUT call to ${req.originalUrl} --- Missing id param`);
            return;
        }
        const id = parseInt(req.params.id, 10);
        if(!id){
            res.status(211).send(`Bad PUT call to ${req.originalUrl} --- id must be a number`);
            return;
        }
        //???
        const product: Product = req.body;
        if(!product){
            res.status(212).send(`Bad PUT call to ${req.originalUrl} --- No data to update the product with`);
            return;
        }
        const completed = await productService.updateProduct(id, product.productName, product.productDescription, product.productCategory, product.price, product.sellerId);
        if(!completed){
            res.status(213).send(`Bad PUT call to ${req.originalUrl} --- No product with id ${id}`);
            return;
        }
        res.status(200).send("Product updated");
    } catch(e: any){
        res.status(500).send(e.message);
    }
})

productRouter.get("/filterProducts/", async (
    req: Request<{categoriesArray:string[]}, {}, {}>,
    res: Response<Array<Product> | String>
) => {
    try {
        const products = await productService.getFilteredProducts();
        res.status(200).send(products);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.put("/filterProducts/addCat", async (
    req: Request<{}, {}, {category:string}>,
    res: Response<Array<Product> | String>
) => {
    try {
        let category = req.body.category;

        if (typeof (category) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- category has type ${typeof(category)}`);
            return;
        }

        const response = await productService.addCategoryMarked(category);
        if(response){
            res.status(200).send(response.toString());
        }
        else{
            res.status(210).send("Could not add category")
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.put("/filterProducts/removeCat", async (
    req: Request<{}, {}, {category:string}>,
    res: Response<Array<Product> | String>
) => {
    try {
        let category = req.body.category;

        if (typeof (category) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- category has type ${typeof(category)}`);
            return;
        }

        const response = await productService.removeCategoryMarked(category);
        if(response){
            res.status(200).send(response.toString());
        }
        else{
            res.status(210).send("Could not remove category")
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

