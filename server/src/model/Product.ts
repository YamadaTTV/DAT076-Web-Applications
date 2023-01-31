import {User} from "./User"

export class Product{
    productId : number
    productName : string
    productCategory: string
    price : number
    seller : User
    buyer : User | undefined

    constructor(productId: number, productName: string, productCategory: string, price: number, seller : User) {
        this.productId = productId
        this.productName = productName
        this.productCategory = productCategory
        this.price = price
        this.seller = seller
        this.buyer = undefined
    }

    changePrice(price : number){
        this.price = price;
    }

    setBuyer(buyer : User){
        this.buyer = buyer
    }


}