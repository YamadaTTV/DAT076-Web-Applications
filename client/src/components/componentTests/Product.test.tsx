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

test('Test creation of a product.', async() => {
    let component;
    const soffa: IProduct = {key: 1, productName:"soffa",productDescription:"En fin soffa",productCategory:"Furniture",price:123,sellerId:1}

    await act(() => {
        // fire events that update state
        component = render(<Product prod={soffa} productHandler={() => {}} handlePage={() => {}} page={Pages.PRODUCT}>{}</Product>)
    });

    const bed: IProduct = {key: 2, productName:"Bed",productDescription:"Perfect bed. Made for sleeping in.",productCategory:"möbel",price:321,sellerId:1}

    // @ts-ignore
    expect(component.getByText(/En fin soffa./i)).toBeInTheDocument()
    // @ts-ignore
    expect(component.getByText(/123 KR/i)).toBeInTheDocument()


    // @ts-ignore
    let buttons = await component.findAllByRole('button')
    expect(buttons).toHaveLength(2)
});



