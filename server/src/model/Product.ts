export class Product{
    productId : number
    productName : string
    productCategory: string
    price : number
    sellerId : number
    buyerId : number | undefined

    constructor(productId: number, productName: string, productCategory: string, price: number, seller : number) {
        this.productId = productId
        this.productName = productName
        this.productCategory = productCategory
        this.price = price
        this.sellerId = seller
        this.buyerId = undefined
    }

    setBuyer(buyerId : number){
        this.buyerId = buyerId;
    }


}