import { makeProductService } from "./Product";
import { Product } from "../model/Product";

test("Adding a product",async () => {
   const productName = "Test product";
   const productCategory = "Test category";
   const price = 100;
   const sellerId = 1;
   const productService = makeProductService();
   await productService.addProduct(productName, productCategory, price, sellerId);
   const products = await productService.getProducts();
   expect(products.find((product) => product.productId)?.productName).toEqual(productName);
});

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

test("Buying a product", async() => {
    const productId = 1;
    const buyerId = 2;
    const productService = makeProductService();
    await productService.buyProduct(productId, buyerId);
    const products = await productService.getProducts();
    const product = products.find((product) => product.productId === productId);
    if(product){
        expect(product.buyerId).toEqual(buyerId);
    }
});

test("if a product is bought, then its buyer should be set", async() => {
    const productName = "Test product";
    const productCategory = "Test category";
    const price = 9.99;
    const sellerId = 1;
    const buyerId = 2;

    const productService = makeProductService();
    await productService.addProduct(productName, productCategory, price, sellerId);
    const boughtProduct = await productService.buyProduct(1, buyerId);
    expect(boughtProduct?.buyerId).toEqual(buyerId);
});

test("If a product doesn't exist, then it shouldn't be updated", async() => {
    const productService = makeProductService();
    const updated = await productService.updateProduct(1);
    expect(updated).toBeFalsy();
});

test("If a product exists, then it should return true", async() => {
    const productName = "Test product";
    const productCategory = "Test category";
    const price = 9.99;
    const sellerId = 1;

    const productService = makeProductService();
    await productService.addProduct(productName, productCategory, price, sellerId);
    const exists = await productService.productExist(1);
    expect(exists).toBeTruthy();
});

test("If a product doesn't exist, then it should return false", async() => {
    const productService = makeProductService();
    const exists = await productService.productExist(1);
    expect(exists).toBeFalsy();
});

test("Getting all products", async() => {
    const productService = makeProductService();
    const products = await productService.getProducts();
    expect(products).toBeInstanceOf(Array);
});
