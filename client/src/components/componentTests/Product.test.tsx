import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import {IProduct, Product} from '../Product';
import {Pages} from "../../App";
import {IndexPage} from "../../pages/IndexPage";
import {ProductPage} from "../../pages/ProductPage";
import axios, {AxiosStatic} from "axios";

const handleTest = (product: IProduct) => {
    console.log("handleCart iahsdiashdjksas");
}
const handleTest2 = () => {
    console.log("handleCart iahsdiashdjksas");
}

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>

beforeEach( async() => {
    mockedAxios.get.mockResolvedValue({
        data: [{"id":1,"username":"1","email":"1@123.com","password":"1"}],
        status: "200",
        statusText: "OK"

    });

    mockedAxios.post.mockResolvedValue({
        data: [{
            key: 1,
            productName:"soffa",
            productDescription:"En fin soffa",
            productCategory:"Furniture",
            price:123,
            sellerId:1
        }],
        status: "202",
        statusText: "Accepted"

    });
})

test('Test product when being the seller. Expect Update product and Delete button to exist.', async() => {
    mockedAxios.get.mockResolvedValue({
        data: {
            id: 1,
            username: "rassta",
            email: "2@2.com",
            password: "2"
        },
        status: 215,
        statusText: "OK",

    });

    let component;
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa",productCategory:"Furniture",price:123,sellerId:1}

    await act(() => {
        // fire events that update state
        component = render(<Product prod={soffa} productHandler={() => {}} handlePages={() => {}} page={Pages.PRODUCT}>{}</Product>)
    });

    const bed: IProduct = {key: 2, productName:"Bed",productDescription:"Perfect bed. Made for sleeping in.",productCategory:"möbel",price:321,sellerId:1}

    // @ts-ignore
    expect(component.getByText(/En fin soffa/i)).toBeInTheDocument()
    // @ts-ignore
    expect(component.getByText(/123 KR/i)).toBeInTheDocument()

    // @ts-ignore
    const updateBtn = component.getByText(/Update product/i);
    // @ts-ignore
    const deleteBtn = component.getByText(/Delete listing/i);

    expect(updateBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();


    // @ts-ignore
    let buttons = await component.findAllByRole('button')
    expect(buttons).toHaveLength(2)
});

test('Test product when not the seller. Expect add to cart button and contact seller to exist.', async() => {
    mockedAxios.get.mockResolvedValue({
        data: {
            id: 2,
            username: "rassta",
            email: "2@2.com",
            password: "2"
        },
        status: 215,
        statusText: "OK",

    });

    let component;
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa",productCategory:"Furniture",price:123,sellerId:1}

    await act(() => {
        // fire events that update state
        component = render(<Product prod={soffa} productHandler={() => {}} handlePages={() => {}} page={Pages.PRODUCT}>{}</Product>)
    });

    const bed: IProduct = {key: 2, productName:"Bed",productDescription:"Perfect bed. Made for sleeping in.",productCategory:"möbel",price:321,sellerId:1}

    // @ts-ignore
    expect(component.getByText(/En fin soffa/i)).toBeInTheDocument()
    // @ts-ignore
    expect(component.getByText(/123 KR/i)).toBeInTheDocument()
    // @ts-ignore
    const addBtn = component.getByText(/Add to Cart/i);
    // @ts-ignore
    const contactBtn = component.getByText(/Contact seller/i);

    expect(addBtn).toBeInTheDocument();
    expect(contactBtn).toBeInTheDocument();


    // @ts-ignore
    let buttons = await component.findAllByRole('button')
    expect(buttons).toHaveLength(2)
});

test('Test for "Pressing add to cart button" sends correct axios call', async () => {
    mockedAxios.get.mockResolvedValue({
        data: {
            id: 2,
            username: "rassta",
            email: "2@2.com",
            password: "2"
        },
        status: 215,
        statusText: "OK",

    });

    let component;
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa",productCategory:"Furniture",price:123,sellerId:1}

    await act(() => {
        // fire events that update state
        component = render(<Product prod={soffa} productHandler={() => {}} handlePages={() => {}} page={Pages.PRODUCT}>{}</Product>)
    });

    //@ts-ignore
    const productObject = component.getByTestId("productObject");

    expect(productObject).toBeInTheDocument();


    // @ts-ignore
    const submitBtn = component.getByText(/Add to Cart/i);

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/cart",{product:soffa});
});
