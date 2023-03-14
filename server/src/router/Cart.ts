import express, {Request, Response} from "express";
import {makeCartService} from "../service/Cart";
import {userService} from "./User";
import {Product} from "../model/Product";
import * as requestTypes from "../requestTypes"
import * as responseTypes from "../responseTypes"
import {Cart} from "../model/Cart";

const cartService = makeCartService();


export const cartRouter = express.Router();

/**
 * Get call to /cart to get a list of all products.
 * req: requestTypes.get - An interface of requestType [see API configuration for the required arguments].
 * res: Response<Product[] | string> - Returns an array of Products or the error message "User has no items in cart".Status codes:
 *      232: Successful request - Returned array with all cartItems.
 *      280: Error - User not logged in
 *      283: Error - User has no items in the cart
 *      500: Error - Any error caught
 */
cartRouter.get("/", async (
    req: requestTypes.get,
    res: Response<Product[] | string>
) => {
    try {
        if(req.session.user == null){
            res.status(280).send("User not logged in")
            return
        }
        const cartItems = await cartService.getCartItems(req.session.user)
        if(cartItems == undefined) res.status(283).send("User has no items in cart")
        res.status(232).send(cartItems)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

/**
 * Post call to /cart to add an item to the cart.
 * req: requestTypes.addToCartRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<string | Cart> - Returns a Cart object with products or the error message "User not logged in".
 * Status codes:
 *      233: Successful request - Product has been added
 *      280: Error - User not logged in
 *      500: Error - Any error caught
 */
cartRouter.post("/", async (
    req: requestTypes.addToCartRequest,
    res: Response<string | Cart>
) => {
    try{
        if(req.session.user == null){
            res.status(280).send("User not logged in")
            return
        }
        const cart = await cartService.addCartItem(req.session.user,req.body.product)
        res.status(233).send(cart)

    } catch (e: any){
        res.status(500).send(e.message);
    }
})

/**
 * Delete call to /cart to delete an item from the cart.
 * req: requestTypes.removeFromCartRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<string> - Returns a string explaining the result.
 * Status codes:
 *      234: Successful request - Product has been removed
 *      280: Error - User not logged in
 *      283: Error - Could not remove fram cart.
 *      500: Error - Any error caught
 */
cartRouter.delete("/", async (
    req: requestTypes.removeFromCartRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user == null){
            res.status(280).send("User not logged in")
            return
        }
        const success : boolean = await cartService.removeCartItem(req.session.user,req.body.product)
        if(success) res.status(234).send("Removed "+req.body.product.productName+" from cart.")
        else res.status(283).send("Could not remove "+req.body.product.productName+" from cart. Likely the product was not in cart.")
    } catch(e: any){
        res.status(500).send(e.message);
    }
})

/**
 * Delete call to /cart/empty to empty the cart.
 * req: requestTypes.emptyCartRequest - An interface of requestType [see API configuration for the required arguments].
 * res: Response<string> - Returns a string explaining the result.
 * Status codes:
 *      235: Successful request - Cart has been emptied
 *      280: Error - User not logged in
 *      286: Error - Could not find cart to empty.
 *      500: Error - Any error caught
 */
cartRouter.delete("/empty", async (
    req: requestTypes.emptyCartRequest,
    res: Response<string>
) => {
    try{
        if(req.session.user == null){
            res.status(280).send("User not logged in")

            return
        }
        const success : boolean = await cartService.emptyCart(req.session.user)
        if(success) res.status(235).send("Cart emptied.")
        else res.status(286).send("Could not find cart to empty.")
    } catch(e: any){
        res.status(500).send(e.message);
    }
})
