import express, {Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {userService} from "./User";
import {Product} from "../model/Product";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"

const productService = makeProductService();


export const productRouter = express.Router();

/**
 * GET call to /product to get a list of all products available. Mostly used for debugging reasons.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Array<Product>> - Returns an array containing all products.
 * Status codes:
 *      200: Successful request - Returned array with all products.
 *      500: Error - An error occurred
 */
productRouter.get("/", async (
    req: requestTypes.get,
    res: Response<Array<Product>>
) => {
    try {
        const tasks = await productService.getProducts();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * POST call to /product to add a product.
 * req: requestTypes.productCreationRequest - An interface of requestType [see API configuration for the required arguments].
 * res:  Response<Product | string>- Returns the product added or an error message explaining what went wrong.
 * Status codes:
 *      222: Successful request - Returned array with all products.
 *      280: Error - No user logged in
 *      281: Error - User with sellerId does not exist
 *      400: Error - Bad POST Call - Type error
 *      500: Error - An error occurred
 */
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
            res.status(400).send(`Bad POST call to ${req.originalUrl} -- productName has type ${typeof (productName)}, productDescription has type ${typeof (productDescription)}, productCategory has type ${typeof (productCategory)}, price has type ${typeof (price)}`);
            return
        }
        if(req.session.user == null){
            res.status(280).send("No user logged in.")
            return
        } else if (!await userService.userExists(req.session.user.id)){
            res.status(281).send(`User with sellerId ${req.session.user.id} does not exist.`);
            return
        }
        const newProduct = await productService.addProduct(productName,productDescription,productCategory,price,req.session.user.id);
        res.status(222).send(newProduct);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * DELETE call to /product to delete a product.
 * req: key - The key (productID) of the product to be deleted.
 * res: Response<String> - Returns a successful message or an error message explaining what went wrong.
 * Status codes:
 *      223: Successful request - Returned array with all products.
 *      400: Error - Bad POST Call - Type error
 *      500: Error - An error occurred
 */
productRouter.delete("/", async(
    req: Request<{}, {}, {key : number}>,
    res: Response<String>
) => {
    try{
        let key = req.body.key;

        if (typeof(key) !== "number") {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} ---key has type ${typeof(key)}`);
            return;
        }
        const response = await productService.deleteProduct(key);
        res.status(223).send("Successfully deleted product " + response.valueOf());

    }catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * GET call to /product/available to get all available product.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Array<Product> | String> - Returns an array containing all available products or an error message explaining what went wrong.
 * Status codes:
 *      224: Successful request - Returned array with all products.
 *      500: Error - An error occurred
 */
productRouter.get("/available/", async (
    req: requestTypes.get,
    res: Response<Array<Product> | String>
) => {
    try {
        const tasks = await productService.getAvailableProducts();
        res.status(224).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * PUT call to /product/buy to buy a product.
 * req: requestTypes.buyProductRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Product | string> - Returns the product that was bought or an error message explaining what went wrong.
 * Status codes:
 *      225: Successful request - Returned the bought product object.
 *      282: Error - User does not exist
 *      283: Error - Product does not exist
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
productRouter.put("/buy", async (
    req: requestTypes.buyProductRequest,
    res: Response<Product | string>
) => {
    try {
        let key = req.body.key;
        let buyerId = req.session.user?.id;

        if (typeof (key) !== "number" || typeof (buyerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- key has type ${typeof(key)}, buyerId has type ${typeof(buyerId)}`);
            return;
        }

        if (!await productService.productExist(key)) {
            res.status(283).send("Product does not exist");
            return
        }
        if (!await userService.userExists(buyerId)) {
            //Set to 400
            res.status(282).send("User does not exist");
            return;
        }

        let product =await productService.buyProduct(key, buyerId);
        res.status(225).send(product)

    }catch(e: any){
        res.status(500).send(e.message);
    }
});

/**
 * PUT call to /product/update to buy a product.
 * req: requestTypes.productUpdateRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<string> - Returns a successful message or an error message explaining what went wrong.
 * Status codes:
 *      226: Successful request - Product updated
 *      283: Error - Product does not exist
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
productRouter.put("/update", async(
    req: requestTypes.productUpdateRequest,
    res: Response<string>
) => {
    try{
        if(isNaN(req.body.key)){
            res.status(400).send("Type error - key need to have type: number")
            return
        } else {
            const response = await productService.updateProduct(req.body.key,req.body.productName,req.body.productDescription,req.body.productCategory,req.body.price,req.session.user?.id)
            if(response) res.status(226).send("Product updated.")
            else res.status(283).send(`Product with key: ${req.body.key} does not exist`)
        }
    } catch(e: any){
        res.status(500).send(e.message);
    }
})

/**
 * GET call to /product/sellerListings to get all the users sold products.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Product[] | string> - Returns an array with all of the users sold products or an error message explaining what went wrong.
 * Status codes:
 *      227: Successful request - Returned an array with all of the users sold products
 *      280: Error - User not logged in
 *      500: Error - An error occurred
 */
productRouter.get("/sellerListings", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try{
        if(req.session.user == null){
            res.status(280).send("User not logged in")
            return
        }
        const products = await productService.getUserListings(req.session.user)
        res.status(227).send(products);
    } catch(e: any) {
        res.status(500).send(e.message)
    }
})

/**
 * GET call to /product/boughtProduct to get all the users bought products.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Product[] | string> - Returns an array with all of the users bought products or an error message explaining what went wrong.
 * Status codes:
 *      228: Successful request - Returned an array with all of the users bought products
 *      280: Error - User not logged in
 *      500: Error - An error occurred
 */
productRouter.get("/boughtProducts", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try{
        if(req.session.user == null){
            res.status(280).send("User not logged in")
            return
        }
        const products = await productService.getBoughtProducts(req.session.user)
        res.status(228).send(products);
    } catch(e: any) {
        res.status(500).send(e.message)
    }
})

/**
 * GET call to /product/filterProducts to get a list with all the filtered products
 * req: None
 * res: Response<Array<Product> | String> - Returns an array with all of the filtered products
 * Status codes:
 *      229: Successful request - Returned an array with all of the filtered products
 *      500: Error - An error occurred
 */
productRouter.get("/filterProducts/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Product>>
) => {
    try {
        const products = await productService.getFilteredProducts();
        res.status(229).send(products);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * GET call to /product/filterProducts/addCat to add a category to the filter
 * req: category - A string of the category name you want to add to the filter.
 * res: Response<Array<Product> | String> - Returns an array with all categories that is currently filtered on
 *                                          or an error message explaining the error
 * Status codes:
 *      230: Successful request - Returned an array with all categories that is currently filtered
 *      284: Error - Could not add category
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
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
            res.status(230).send(response.toString());
        }
        else{
            res.status(284).send("Could not add category")
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/**
 * GET call to /product/filterProducts/removeCat to remove a category from the filter
 * req: category - A string of the category name you want to add to the filter.
 * res: Response<Array<Product> | String> - Returns an array with all categories that is currently filtered on
 *                                          or an error message explaining the error
 * Status codes:
 *      231: Successful request - Returned an array with all categories that is currently filtered
 *      285: Error - Could not add category
 *      400: Error - Type error
 *      500: Error - An error occurred
 */
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
            res.status(231).send(response.toString());
        }
        else{
            res.status(285).send("Could not remove category")
        }
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

