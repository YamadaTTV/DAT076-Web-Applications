import express, {Request, Response} from "express";
import {makeCartService} from "../service/Cart";
import {userService} from "./User";
import {Product} from "../model/Product";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"

const cartService = makeCartService();


export const cartRouter = express.Router();

cartRouter.get("/", async (
    req: requestTypes.get,
    res: Response<Array<Product> | String>
) => {
    try {

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

