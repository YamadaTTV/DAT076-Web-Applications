import {Product} from "../model/Product";
import {User} from "../model/User";
import {Cart} from "../model/Cart";

export interface ICartService {
    //Get all items in users cart.
    getCartItems(user: User) : Promise<Product[] | undefined>

    //Add item to cart.
    addCartItem(user: User, cartItem: Product) : Promise<Cart | undefined>

    //remove item from cart
    removeCartItem(user: User, cartItem: Product) : Promise<boolean>

    //empty cart
    emptyCart(user: User) : Promise<boolean>
}

class CartService implements ICartService {
    carts : Array<Cart> = [];

    async addCartItem(user: User, cartItem: Product): Promise<Cart> {
        const cart = this.carts.find(cart => cart.user == user)
        if (cart == null) {
            const cart = new Cart(user,cartItem)
            this.carts.push(cart)
            return cart
        }
        else {
            await cart.addCartItem(cartItem)
            return cart
        }
    }

    async emptyCart(user: User): Promise<boolean> {
        const cart = this.carts.find(cart => cart.user == user)
        if (cart == null) return false
        else {
            const index = this.carts.indexOf(cart)
            this.carts.splice(index,1)
            return true
        }
    }


    async getCartItems (user: User): Promise<Product[] | undefined> {
        const cart = this.carts.find(cart => cart.user == user)
        if(cart == undefined) return undefined
        return cart.cartItems
    }

    async removeCartItem(user: User, cartItem: Product): Promise<boolean> {
        const cart = this.carts.find(cart => cart.user == user)
        if(cart == null) return false
        else {
            const success = cart.removeCartItem(cartItem)
            return success
        }
    }


}

export function makeCartService() : ICartService {
    return new CartService()
}