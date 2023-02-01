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