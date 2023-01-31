import express, {Request, Response} from "express";
import {makeProductService} from "../service/Product";
import {userService} from "./User";
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

productRouter.post("/", async (
    req: Request<{}, {},{productName: string, productCategory: string, price: number, sellerId : number}>,
    res: Response<Product | string>
) => {
    try {
        let productName = req.body.productName;
        let productCategory = req.body.productCategory;
        let price = req.body.price;
        let sellerId = req.body.sellerId;

        if (typeof(productName) !== "string" || typeof(productCategory) !== "string" || typeof(price) !== "number" || typeof(sellerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} -- productname has type ${typeof(productName)}, category has type ${typeof(productCategory)}, price has type ${typeof(price)},sellid has type ${typeof(sellerId)},  `);
            return;
        }

        if(!await userService.userExists(sellerId)){
            res.status(400).send(`User with sellerId ${sellerId} does not exist.`);
            return;
        }
        const newProduct = await productService.addProduct(productName,productCategory,price,sellerId);
        res.status(201).send(newProduct);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

productRouter.put("/buy", async (
    req: Request<{}, {},{productId: number, buyerId : number}>,
    res: Response<Product | string>
) => {
    try {
        let productId = req.body.productId;
        let buyerId = req.body.buyerId;

        if (typeof (productId) !== "number" || typeof (buyerId) !== "number") {
            res.status(400).send(`Bad PUT call.`);
            return;
        }

        if (!await productService.productExist(productId)) {
            res.status(400).send("Product does not exit");
            return
        }
        if (!await userService.userExists(buyerId)) {
            res.status(400).send("User does not exit");
            return;
        }

        let product =await productService.buyProduct(productId, buyerId);
        res.status(200).send(product)

    }catch(e: any){
        res.status(500).send(e.message);
    }
});