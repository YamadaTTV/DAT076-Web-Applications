import App, {Pages} from "../App";
import { CartPage } from "../pages/CartPage";
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createRoot } from "react-dom/client";
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios, {AxiosResponse, AxiosStatic} from "axios";
import { IProduct } from "../components/Product";

let container: HTMLElement | null = null;
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("Test to see if cart items are displayed", async () => {
  const mockCartItems = [
    { "key": 1, "productName": "Product 1", "productDescription" : "Description 1", "productCategory" : "Category 1", "price" : 10, "sellerId": 1},
    { "key": 2, "productName": "Product 2", "productDescription" : "Description 2", "productCategory" : "Category 2", "price" : 20, "sellerId": 2},
    { "key": 3, "productName": "Product 3", "productDescription" : "Description 3", "productCategory" : "Category 3", "price" : 30, "sellerId": 3},
  ];

  await mockedAxios.get.mockResolvedValue({data: mockCartItems, status: 200});

  let cartPage;
  await act(() => {
    cartPage = render(<CartPage page={Pages.CART} handlePages={() => {}}/>);
  });
  // @ts-ignore
  const product = await cartPage.findByText(/Product 1/i);
  expect(product).toBeInTheDocument();
});

test("Can't click buy button when already buying", async () => {
  const mockCartItems = [
    { "key": 1, "productName": "Product 1", "productDescription" : "Description 1", "productCategory" : "Category 1", "price" : 10, "sellerId": 1},
    { "key": 2, "productName": "Product 2", "productDescription" : "Description 2", "productCategory" : "Category 2", "price" : 20, "sellerId": 2},
    { "key": 3, "productName": "Product 3", "productDescription" : "Description 3", "productCategory" : "Category 3", "price" : 30, "sellerId": 3},
  ];

  await mockedAxios.get.mockResolvedValue({data: mockCartItems, status: 200});
  await mockedAxios.put.mockResolvedValue({data: mockCartItems, status: 200});
  // @ts-ignore
  let cartPage;
  await act(() => {
    cartPage = render(<CartPage page={Pages.CART} handlePages={() => {}}/>);
  });
  // @ts-ignore
  const button = cartPage.getByText("Buy");
  expect(button.disabled).toBeFalsy();
  
  await act(async() => {
    // @ts-ignore
    cartPage.getByText("Buy").click();
  });

  expect(button.disabled).toBeTruthy();
});

test("Test if buyProducts get called when clicking the buy button", async() => {
  const mockCartItems = [
    { "key": 1, "productName": "Product 1", "productDescription" : "Description 1", "productCategory" : "Category 1", "price" : 10, "sellerId": 1},
    { "key": 2, "productName": "Product 2", "productDescription" : "Description 2", "productCategory" : "Category 2", "price" : 20, "sellerId": 2},
    { "key": 3, "productName": "Product 3", "productDescription" : "Description 3", "productCategory" : "Category 3", "price" : 30, "sellerId": 3},
  ];

  await mockedAxios.get.mockResolvedValue({ data: mockCartItems, status: 200});
  await mockedAxios.put.mockResolvedValue({ status: 200});

  // @ts-ignore
  let cartPage;
  await act(() => {
    cartPage = render(<CartPage page={Pages.CART} handlePages={() => {}}/>)
  });

  await act(async () => {
    // @ts-ignore
    cartPage.getByText("Buy").click();
  });

  expect(mockedAxios.put).toHaveBeenCalledTimes(3);
})

test("Test to see if CartPage exists", async () => {
    await mockedAxios.get.mockResolvedValue({data:[],status: 204,statusText: "Accepted"})
    let cartPage;
    await act(() => {
        // fire events that update state
        cartPage = render(<CartPage page={Pages.CART} handlePages={() => {}} ></CartPage>)
    });
    // @ts-ignore
    const titleField = await cartPage.findByText(/Your Cart/i);
    expect(titleField).toBeInTheDocument();
});


/*
const mockProducts: IProduct[] = [
    {
        key: 1,
        productName: "Product 1",
        productDescription: "Description",
        productCategory: "Category 1",
        price: 10,
        sellerId: 1,
    },
    {
        key: 2,
        productName: "Product 1",
        productDescription: "Description",
        productCategory: "Category 2",
        price: 20,
        sellerId: 2,
    },
];

test("handles buying success", async () => {
    mockedAxios.get.mockResolvedValue({
      data: mockProducts,
      status: 232,
      statusText: "OK",
    });

    mockedAxios.put.mockResolvedValue({
        data: null,
        status: 225,
        statusText: "OK",
    });

    let currentPage : Pages = Pages.CART;

    let component;
    await act(async () => {
        component = render(<CartPage page={Pages.CART} handlePages={(page: Pages) => {
            currentPage = page
        }} />);
    });

    //@ts-ignore
    const products = component.findAllByText(/Description/i)

    expect((await products).length).toEqual(2)
    //@ts-ignore
    const buyButton = await  component.findByText(/buy/i)


    await act(async () => {
        // fire events that update state
        fireEvent.click(buyButton);
    });

    expect(currentPage).toEqual(Pages.PROFILE)

    //expect(mockedAxios.put).toHaveBeenCalledTimes(2)

 */