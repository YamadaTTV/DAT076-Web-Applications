import App, {Pages} from "../App";
import { CartPage } from "../pages/CartPage";
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createRoot } from "react-dom/client";
import { render, screen, waitFor } from '@testing-library/react';
import axios, {AxiosResponse, AxiosStatic} from "axios";
import { IProduct } from "../components/Product";

let container: HTMLElement | null = null;
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProducts: IProduct[] = [
    {
        key: 1,
        productName: "Product 1",
        productDescription: "Description 1",
        productCategory: "Category 1",
        price: 10,
        sellerId: 1,
    },
    {
        key: 2,
        productName: "Product 1",
        productDescription: "Description 2",
        productCategory: "Category 2",
        price: 20,
        sellerId: 2,
    },
];

test("handles buying success", async () => {
    mockedAxios.get.mockResolvedValue({
      data: mockProducts,
      status: 200,
      statusText: "OK",
    });
  
    const putMock = jest.spyOn(mockedAxios, "put");
  
    putMock.mockImplementation((url, data) => {
      return Promise.resolve({
        data: null,
        status: 200,
        statusText: "OK",
      });
    });
  
    await act(async () => {
      render(<CartPage page={Pages.CART} handlePages={() => {}} />);
    });
  
    const buyButton = screen.getByText("Buy");
    act(() => {
      buyButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
  
    expect(putMock).toHaveBeenCalledTimes(2);
  
    const product1 = mockProducts[0];
    const product2 = mockProducts[1];
  
    expect(putMock).toHaveBeenCalledWith(
      "http://localhost:8080/product/buy",
      expect.objectContaining({
        key: product1.key,
        buyerId: 1,
      })
    );
  
    expect(putMock).toHaveBeenCalledWith(
      "http://localhost:8080/product/buy",
      expect.objectContaining({
        key: product2.key,
        buyerId: 1,
      })
    );
  
    const successLogs = screen.getAllByText("Buying succeeded");
    expect(successLogs.length).toBe(2);
  
    const updatedProducts = [
      { ...product1, buyer: 1 },
      { ...product2, buyer: 1 },
    ];
  
    const addedProducts = screen.getAllByTestId("added-product");
    addedProducts.forEach((addedProduct, index) => {
      const productName = updatedProducts[index].productName;
      const buyerName = "You";
      expect(addedProduct).toHaveTextContent(productName);
      expect(addedProduct).toHaveTextContent(buyerName);
    });
  });
  

/*
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    if(container){
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    }
});

test("Call the getCartItems function", async () => {
    const getCartItems = jest.fn();
    await act(async () => {
        createRoot(container!).render(<CartPage page={Pages.CART} handlePages={() => {}}/>)
    });
    expect(getCartItems).toHaveBeenCalledTimes(1);
});


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
*/