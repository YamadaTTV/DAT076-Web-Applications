import {Product} from "../model/Product";
import {userService} from "../router/User";

export interface IProductService {
    //Get all products in system
    getProducts() : Promise<Array<Product>>;

    //Add a new product to the system
    addProduct(productName: string, productCategory: string, price: number, sellerId : number) : Promise<Product>;

    //Updates an existing product with new information
    updateProduct(productId: number, productName?: string, productCategory?: string, price?: number) : Promise<boolean>;

    //Add a buyer to a product and marking is as bought
    buyProduct(productId: number, buyerId: number) : Promise<Product|undefined>;

    //Check if a product exists, returns true if product exist
    productExist(productId: number) : Promise<Boolean>;
}

class ProductService implements IProductService {
    products : Array<Product> = [];
    productIndex = 0;

    async getProducts() : Promise<Array<Product>>{
        return this.products;
    }

    async addProduct(productName: string, productCategory: string, price: number, sellerId : number) : Promise<Product>{
        const product = new Product(this.productIndex+1,productName,productCategory,price,sellerId);
        this.products.push(product);
        this.productIndex += 1;
        return product;
    }

    async updateProduct(productId: number, productName?: string, productCategory?: string, price?: number, sellerId?: number) : Promise<boolean>{
        const product = this.products.find(p => p.productId === productId);
        if(!product){
            return false;
        }
        if(productName){
            product.productName = productName;
        }
        if(productCategory){
            product.productCategory = productCategory;
        }
        if(price){
            product.price = price;
        }
        if(sellerId){

            product.sellerId = sellerId;
        }
        return true;
    }

    async buyProduct(productId : number, buyerId : number) : Promise<Product|undefined>{
        let prod = this.products.find(product => product.productId===productId);
        if(prod!=undefined){
            prod.setBuyer(buyerId);
        }
        return prod;
    }


    async productExist(productId : number) : Promise<boolean> {
        let prod = this.products.find(product => product.productId===productId);
        if(prod==undefined) return false;
        else return true
    }
}

export function makeProductService() : IProductService {
    return new ProductService();
}

