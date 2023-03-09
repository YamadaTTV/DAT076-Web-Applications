import {Product} from "./Product";
import {User} from "./User";


export class Cart {
    user: User
    cartItems: Array<Product>

    constructor(user: User, cartItem?: Product) {
        this.user = user
        if(cartItem) this.cartItems = [cartItem]
        else this.cartItems = []
    }

    async addCartItem(product: Product){
        this.cartItems.push(product)
    }

    removeCartItem(product: Product) : boolean{
        const cartItem = this.cartItems.find(prod => prod.key == product.key)
        if(cartItem == undefined) return false
        const index = this.cartItems.indexOf(cartItem)
        this.cartItems.splice(index,1)
        return true
    }

}