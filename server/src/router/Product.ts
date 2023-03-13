import express, {Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {userService} from "./User";
import {Product} from "../model/Product";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"

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
    req: requestTypes.productCreationRequest,
    res: Response<Product | string>
) => {
    try {
        let productName = req.body.productName;
        let productDescription = req.body.productDescription;
        let productCategory = req.body.productCategory;
        let price = req.body.price;


        if (typeof(productName) !== "string" || typeof(productDescription) !== "string" || typeof(productCategory) !== "string" || typeof(price) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- productName has type ${typeof (productName)}, productDescription has type ${typeof (productDescription)}, productCategory has type ${typeof (productCategory)}, price has type ${typeof (price)}`);
            return
        }
        if(req.session.user == null){
            res.status(400).send("No user logged in.")
            return
        } else if (!await userService.userExists(req.session.user.id)){
            res.status(400).send(`User with sellerId ${req.session.user.id} does not exist.`);
            return
        }
        const newProduct = await productService.addProduct(productName,productDescription,productCategory,price,req.session.user.id);
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

/*
PUT /update - Updates the fields of a product.
	Body of request:
		{
			“productId” : number
			“productName” : string | undefined
			"productDescription: string | undefined
			“productCategory” : string | undefined
			“price” : number | undefined
			“sellerId” : User.id : number | undefined
		}
	Status codes:
		200: Successful request - Product updated
		210: Successful request - Product does not exist
		211: Successful request - User does not exist
		212: Successful request - No data to update the product
		213: Successful request - No product with id
		500: Error occurred


 */

productRouter.put("/update", async(
    req: requestTypes.productUpdateRequest,
    res: Response<string>
) => {
    try{
        if(isNaN(req.body.key)){
            res.status(401).send("Type error - key need to have type: number")
            return
        } else {
            const response = await productService.updateProduct(req.body.key,req.body.productName,req.body.productDescription,req.body.productCategory,req.body.price,req.session.user?.id)
            if(response) res.status(200).send("Product updated.")
            else res.status(401).send(`Product with key: ${req.body.key} does not exist`)
        }
    } catch(e: any){
        res.status(500).send(e.message);
    }
})

productRouter.get("/sellerListings", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try{
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const products = await productService.getUserListings(req.session.user)
        res.status(200).send(products);
    } catch(e: any) {
        res.status(500).send(e.message)
    }
})

productRouter.get("/boughtProducts", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try{
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const products = await productService.getBoughtProducts(req.session.user)
        res.status(200).send(products);
    } catch(e: any) {
        res.status(500).send(e.message)
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

