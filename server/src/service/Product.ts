import {Product} from "../model/Product";
import {User} from "../model/User";

export interface IProductService {
    //Get all products in system
    getProducts() : Promise<Array<Product>>;

    //Add a new product to the system
    addProduct(productId: number, productName: string, productCategory: string, price: number, seller : User) : Promise<Product>;

    //buyProduct(productId: number) : Promise<Product>;

    updateProduct(productId: number, productName?: string, productCategory?: string, price?: number, seller?: User) : Promise<boolean>;
}

class ProductService implements IProductService {
    products : Array<Product> = [];

    async getProducts() : Promise<Array<Product>>{
        return this.products;
    }

    async addProduct(productId: number, productName: string, productCategory: string, price: number, seller : User) : Promise<Product>{
        const product = new Product(productId,productName,productCategory,price,seller);
        this.products.push(product);
        return product;
    }

    /*
    async buyProduct(productId : number){

    }*/

    async updateProduct(productId: number, productName?: string, productCategory?: string, price?: number, seller?: User) : Promise<boolean>{
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
        if(seller){
            product.seller = seller;
        }
        return true;
    }

}

export function makeProductService() : IProductService {
    return new ProductService();
}

