import {Product} from "../model/Product";
import {User} from "../model/User";
import {Cart} from "../model/Cart";

export interface ICartService {
    /**Get items from a users cart.
     * @param user - takes a user as a parameter.
     * @return Promise<Product[]|undefined> - if the user has a cart this method will return its items as an array, if the user don't have a cart undefined will be returned.
     * */
    getCartItems(user: User) : Promise<Product[] | undefined>

    /** Add item to cart
     * @param user,cartItem -  A user and a cartItem of type Product. The cartItem is the item the user wants to add to its cart.
     * @return cart - This method returns the users cart. If the user had no cart before, then this method will create a cart for the user and return the new cart.
     *                If user already had a cart the existing cart should be updated.
     * */
    addCartItem(user: User, cartItem: Product) : Promise<Cart>

    /** Remove item to cart
     * @param user,cartItem -  A user and a cartItem of type Product. The cartItem is the item the user wants to remove from its cart.
     * @return boolean - If the cartItem was successfully removed from the cart this method returns false, if the cartItem is removed from cart true will be retured.
     * */
    removeCartItem(user: User, cartItem: Product) : Promise<boolean>

    /** Remove item to cart
     * @param user -  The user which cart is to be emptied
     * @return boolean - If the users cart is emptied this method will return true, if the cart can't be emptied this method will return false.
     * */
    emptyCart(user: User) : Promise<boolean>

}

class CartService implements ICartService {
    carts : Array<Cart> = [];

    async addCartItem(user: User, cartItem: Product): Promise<Cart> {
        let cart = this.carts.find(cart => cart.user.id == user.id)
        if (cart == null) {
            const newCart = new Cart(user,cartItem)
            this.carts.push(newCart)
            console.log(this.carts)
            return newCart
        }
        else {
            if(cart.cartItems.find(item => item.key == cartItem.key) == undefined) await cart.addCartItem(cartItem)
            return cart
        }
    }

    async emptyCart(user: User): Promise<boolean> {
        const cart : Cart | undefined = this.carts.find(cart => cart.user.id == user.id)
        if (cart == null) return false
        else {
            const index = this.carts.indexOf(cart)
            this.carts.splice(index,1)
            return true
        }
    }


    async getCartItems (user: User): Promise<Product[] | undefined> {
        const cart = this.carts.find(cart => cart.user.id == user.id)
        if(cart == undefined) return undefined
        return cart.cartItems
    }

    async removeCartItem(user: User, cartItem: Product): Promise<boolean> {
        const cart = this.carts.find(cart => cart.user.id == user.id)
        if(cart == null) return false
        else {
            const success = cart.removeCartItem(cartItem)
            if(cart.cartItems.length == 0) {
                const index = this.carts.indexOf(cart)
                this.carts.splice(index,1)
            }
            return success
        }
    }


}

export function makeCartService() : ICartService {
    return new CartService()
}