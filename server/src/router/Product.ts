import express, {query, Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {Product} from "../model/Product";
import {User} from "../model/User";

const taskService = makeProductService();

export const productRouter = express.Router();

productRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Product> | String>
) => {
    try {
        const tasks = await taskService.getProducts();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.post("/", async (
    req: Request<{}, {},{productId: number, productName: string, productCategory: string, price: number, seller : User}>,
    res: Response<Product | string>
) => {
    try {
        let productId = req.body.productId;
        let productName = req.body.productName;
        let productCategory = req.body.productCategory;
        let price = req.body.price;
        let seller = req.body.seller;

        if (typeof(productId) !== "number" || typeof(productName) !== "string" || typeof(productCategory) !== "string" || typeof(price) !== "number" || typeof(seller) !== "object") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl}`);
            return;
        }
        const newProduct = await taskService.addProduct(productId,productName,productCategory,price,seller);
        res.status(201).send(newProduct);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});