export class Product{
    key : number
    productName : string
    productDescription : string
    productCategory: string
    price : number
    sellerId : number
    buyerId : number | undefined

    constructor(key: number, productName: string, productDescription: string,  productCategory: string, price: number, seller : number) {
        this.key = key
        this.productName = productName
        this.productDescription = productDescription
        this.productCategory = productCategory
        this.price = price
        this.sellerId = seller
        this.buyerId = undefined
    }

    setBuyer(buyerId : number){
        this.buyerId = buyerId;
    }


}