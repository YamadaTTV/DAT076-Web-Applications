import {Product} from "../model/Product";
import {userService} from "../router/User";

export interface IProductService {
    //Get all products in system
    getProducts() : Promise<Array<Product>>;

    //Add a new product to the system
    addProduct(productId: number, productName: string, productCategory: string, price: number, sellerId : number) : Promise<Product>;

    updateProduct(productId: number, productName?: string, productCategory?: string, price?: number) : Promise<boolean>;

    //Add a buyer to a product and marking is as bought
    buyProduct(productId: number, buyerId: number) : Promise<Product|undefined>;
}

class ProductService implements IProductService {
    products : Array<Product> = [];

    async getProducts() : Promise<Array<Product>>{
        return this.products;
    }

    async addProduct(productId: number, productName: string, productCategory: string, price: number, sellerId : number) : Promise<Product>{
        const product = new Product(productId,productName,productCategory,price,sellerId);
        this.products.push(product);
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
            if(await userService.userExists(buyerId)){
                prod.setBuyer(buyerId);
            }
        }
        return prod;
    }
}

export function makeProductService() : IProductService {
    return new ProductService();
}

