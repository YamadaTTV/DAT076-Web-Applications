import {Product} from "../model/Product";
import {userService} from "../router/User";
import {User} from "../model/User";

export interface IProductService {
    //Get all products in system
    getProducts() : Promise<Array<Product>>;
    
    //Get all available products in system
    getAvailableProducts() : Promise<Array<Product>>;

    //Add a new product to the system
    addProduct(productName: string, productDescription: string, productCategory: string, price: number, sellerId : number) : Promise<Product>;

    //Updates an existing product with new information
    updateProduct(key: number, productName?: string, productDescription?: string, productCategory?: string, price?: number, sellerId?: number) : Promise<boolean>;

    //Add a buyer to a product and marking is as bought
    buyProduct(key: number, buyerId: number) : Promise<Product|undefined>;

    //Check if a product exists, returns true if product exist
    productExist(key: number) : Promise<Boolean>;

    //Get all products listed by a given user
    getUserListings(user: User) : Promise<Product[] | undefined>;

    getFilteredProducts() : Promise<Array<Product>>;

    addCategoryMarked(category: string): Promise<string[]>;

    removeCategoryMarked(category: string): Promise<string[]>;

    deleteProduct(key: number) : Promise<boolean>
}

class ProductService implements IProductService {
    products : Array<Product> = [];
    productIndex = 0;
    categoryMarked : string[] = [];

    async getProducts() : Promise<Array<Product>>{
        return this.products;
    }

    async getAvailableProducts() : Promise<Array<Product>>{
        //TODO
        // Filtrera så det visas endast products som inte har en buyerID
        return this.products.filter(product => !product.buyerId);
    }

    async addProduct(productName: string, productDescription: string, productCategory: string, price: number, sellerId : number) : Promise<Product>{
        const product = new Product(this.productIndex+1,productName,productDescription,productCategory,price,sellerId);
        this.products.push(product);
        this.productIndex += 1;
        return product;
    }

    async updateProduct(key: number, productName?: string, productDescription?: string, productCategory?: string, price?: number, sellerId?: number) : Promise<boolean>{
        const product = this.products.find(p => p.key === key);
        if(!product){
            return false;
        }
        if(productName){
            product.productName = productName;
        }
        if(productDescription){
            product.productDescription = productDescription;
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

    async deleteProduct(key: number) : Promise<boolean>{
        let product = this.products.find(product => product.key === key);
        let productIndex = this.products.findIndex(product => product.key === key);
        if(product == undefined){
            return false;
        }
        else{
            if(product.key == key){
                this.products.splice(productIndex, 1);
                return true;
            }
        }
        return false;
    }

    async buyProduct(key : number, buyerId : number) : Promise<Product|undefined>{
        let prod = this.products.find(product => product.key===key);
        if(prod!=undefined){
            prod.setBuyer(buyerId);
        }
        return prod;
    }

    async productExist(key : number) : Promise<boolean> {
        let prod = this.products.find(product => product.key===key);
        if(prod==undefined) return false;
        else return true
    }

    async getUserListings(user: User) : Promise<Product[] | undefined> {
        return this.products.filter(product => product.sellerId == user.id)
    }

    async addCategoryMarked(category :string){
        if(!this.categoryMarked.includes(category)){
            this.categoryMarked.push(category);
            return this.categoryMarked;
        }
        else{
            return this.categoryMarked;
        }
    }

    async removeCategoryMarked(category :string){
        let index = this.categoryMarked.indexOf(category);
        if(this.categoryMarked[index] == category ){
            this.categoryMarked.splice(index, 1);
            return this.categoryMarked;
        }
        return this.categoryMarked;
    }

    async getFilteredProducts() : Promise<Array<Product>>{
        let allProducts : Array<Product> = await this.getAvailableProducts();
        let tempArray : Array<Product> = [];
        let filteredProducts : Array<Product> = [];
        if(this.categoryMarked.length == 0){
            return allProducts;
        }
        else{
            for(let i = 0; i < this.categoryMarked.length; i++){
                tempArray = allProducts.filter(product => product.productCategory === this.categoryMarked[i]);
                filteredProducts = filteredProducts.concat(tempArray);
            }
            return filteredProducts;
        }
    }
}

export function makeProductService() : IProductService {
    return new ProductService();
}

