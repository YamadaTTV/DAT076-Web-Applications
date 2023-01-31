import {Product} from "../model/Product";
import {User} from "../model/User";

export interface IProductService {
    //Get all products in system
    getProducts() : Promise<Array<Product>>;

    //Add a new product to the system
    addProduct(productId: number, productName: string, productCategory: string, price: number, seller : User) : Promise<Product>;

    //buyProduct(productId: number) : Promise<Product>;
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
}

export function makeProductService() : IProductService {
    return new ProductService();
}

