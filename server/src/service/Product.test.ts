import { makeProductService } from "./Product";
import { Product } from "../model/Product";

test("If a product is added to the list then it should be in the list", async() => {
    const productName = "Test product";
    const productCategory = "Test category";
    const price = 9.99;
    const sellerId = 1;

    const productService = makeProductService();
    await productService.addProduct(productName, productCategory, price, sellerId);
    const products = await productService.getProducts();
    expect(products.some((product) => product.productName === productName)).toBeTruthy();
});

test("If a product is updated, then its values should be updated", async() => {
    const productService = makeProductService();
    const productName = "Product 1";
    const productCategory = "Category 1";
    const price = 100;
    const sellerId = 1;
    const addProduct = await productService.addProduct(productName, productCategory, price, sellerId);
    const updateProductName = "Updated Product 1";
    const updateResult = await productService.updateProduct(addProduct.productId, updateProductName);
    expect(updateResult).toBeTruthy();
    
    const products = await productService.getProducts();
    const updateProduct = products.find((product) => product.productId === addProduct.productId);
    if(updateProduct){
        expect(updateProduct.productName).toEqual(updateProductName);
    }
});