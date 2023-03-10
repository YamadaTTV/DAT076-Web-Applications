import express, {Request, Response} from "express";
import {makeCartService} from "../service/Cart";
import {userService} from "./User";
import {Product} from "../model/Product";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"
import {Cart} from "../model/Cart";

const cartService = makeCartService();


export const cartRouter = express.Router();

cartRouter.get("/", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try {
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const cartItems = await cartService.getCartItems(req.session.user)
        if(cartItems == undefined) res.status(204).send("User has no items in cart")
        res.status(200).send(cartItems)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

cartRouter.post("/", async (
    req: requestTypes.addToCartRequest,
    res: Response<string | Cart>
) => {
    try{
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const cart = await cartService.addCartItem(req.session.user,req.body.product)
        res.status(200).send(cart)

    } catch (e: any){
        res.status(500).send(e.message);
    }
})

cartRouter.delete("/", async (
    req: requestTypes.removeFromCartRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const success : boolean = await cartService.removeCartItem(req.session.user,req.body.product)
        if(success) res.status(200).send("Removed "+req.body.product.productName+" from cart.")
        else res.status(210).send("Could not remove "+req.body.product.productName+" from cart. Likely the product was not in cart.")
    } catch(e: any){
        res.status(500).send(e.message);
    }
})

cartRouter.delete("/empty", async (
    req: requestTypes.emptyCartRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user == null){
            res.status(400).send("User not logged in")
            return
        }
        const success : boolean = await cartService.emptyCart(req.session.user)
        if(success) res.status(200).send("Cart emptied.")
        else res.status(210).send("Could not find cart to empty.")
    } catch(e: any){
        res.status(500).send(e.message);
    }
})
