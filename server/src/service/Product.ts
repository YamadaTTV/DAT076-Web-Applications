import {Product} from "../model/Product";
import {userService} from "../router/User";
import {User} from "../model/User";

export interface IProductService {
    /** Get all the products from the server, not used to be used in production
     * @param n/a
     * @return Product[] -  returns all the products stored in the server
     * */
    getProducts() : Promise<Array<Product>>;

    /** Get all the products from the server, not used to be used in production
     * @param n/a
     * @return Product[] -  returns all the products that has no buyers.
     * */
    getAvailableProducts() : Promise<Array<Product>>;

    /** Adds a new product to the server and returns the created product
     * @param productName,productDescription,productCategory,price,sellerId - All the parameters are used to set data-fields for creating a new product.
     * @return Product -  returns the product that was created.
     * */
    addProduct(productName: string, productDescription: string, productCategory: string, price: number, sellerId : number) : Promise<Product>;

    /** Updates a product and sends confirmation of update
     * @param productKey,?productName,?productDescription,?productCategory,?price,?sellerId - The productKey is the only mandatory parameter used to identify the product. The other optional parameter describes attributes in the product that the user wants to update.
     * @return boolean -  returns true if the product was updated and false the product was not found and therefor could not be updated .
     * */
    updateProduct(key: number, productName?: string, productDescription?: string, productCategory?: string, price?: number, sellerId?: number) : Promise<boolean>;

    /** Marks a product as bought by setting the buyer to a user id.
     * @param productKey,buyerId - The productKey is used to find the product which is to be bought. The buyerId is used to set the correct buyer for the product.
     * @return Product -  returns the product that was bought.
     * */
    buyProduct(key: number, buyerId: number) : Promise<Product|undefined>;

    /** Checks if a product with given id exists.
     * @param key - The key is used to find the product.
     * @return boolean -  returns true if a product with the key exists, false otherwise.
     * */
    productExist(key: number) : Promise<Boolean>;

    /** Get all products that are listed by a single user.
     * @param user - The user that all posted listings should be returned for.
     * @return product[] -  returns all the products that the user has listed as a product array. If the user has no listed products an empty array will be returned.
     * */
    getUserListings(user: User) : Promise<Product[]>;

    /** Get all products that are bought by a single user.
     * @param user - The user that all bought products should be returned for.
     * @return product[] -  returns all the products that the user has bought as a product array. If the user has not bought any products an empty array will be returned.
     * */
    getBoughtProducts(user: User) : Promise<Product[]>

    /** Get all products that match current product filter.
     * @param n/a
     * @return product[] -  returns all the products that are available and match the category currently selected. (Correlate to addCategoryMarked and removeCategoryMarked)
     * */
    getFilteredProducts() : Promise<Array<Product>>;

    /** Add additional category to the filter.
     * @param category - a category that should be added into the current filter
     * @return string[] -  returns all the categories that are currently filtered as a array of strings.
     * */
    addCategoryMarked(category: string): Promise<string[]>;

    /** Remove one category of the filter.
     * @param category - a category that should be removed from the current filter
     * @return string[] -  returns all the categories that are currently filtered as a array of strings.
     * */
    removeCategoryMarked(category: string): Promise<string[]>;

    /** Remove a product.
     * @param key - the key of the product to be removed
     * @return boolean -  returns true if the product was successfully removed and false if the product could not be removed
     * */
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

    async getUserListings(user: User) : Promise<Product[]> {
        return this.products.filter(product => product.sellerId == user.id)
    }

    async getBoughtProducts(user: User) : Promise<Product[]> {
        return this.products.filter(product => product.buyerId == user.id)
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

