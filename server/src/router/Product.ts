import express, {query, Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {userService} from "../router/User";
import {Product} from "../model/Product";
import {User} from "../model/User";

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

productRouter.post("/", async (
    req: Request<{}, {},{productId: number, productName: string, productCategory: string, price: number, sellerId : number}>,
    res: Response<Product | string>
) => {
    try {
        let productId = req.body.productId;
        let productName = req.body.productName;
        let productCategory = req.body.productCategory;
        let price = req.body.price;
        let sellerId = req.body.sellerId;

        if (typeof(productId) !== "number" || typeof(productName) !== "string" || typeof(productCategory) !== "string" || typeof(price) !== "number" || typeof(sellerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl}`);
            return;
        }

        if(!await userService.userExists(sellerId)){
            res.status(400).send(`User with sellerId ${sellerId} does not exist.`);
            return;
        }
        const newProduct = await productService.addProduct(productId,productName,productCategory,price,sellerId);
        res.status(201).send(newProduct);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});