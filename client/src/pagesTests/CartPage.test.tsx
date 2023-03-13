import App, {Pages} from "../App";
import { CartPage } from "../pages/CartPage";
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { createRoot } from "react-dom/client";
import { render, screen, waitFor } from '@testing-library/react';
import axios, {AxiosResponse, AxiosStatic} from "axios";

let container: HTMLElement | null = null;
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>



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
*/

test("Test to see if CartPage exists", async () => {
    await mockedAxios.get.mockResolvedValue({data:[],status: 204,statusText: "Accepted"})
    let cartPage;
    await act(() => {
        /* fire events that update state */
        cartPage = render(<CartPage page={Pages.CART} handlePages={() => {}} ></CartPage>)
    });
    // @ts-ignore
    const titleField = await cartPage.findByText(/Your Cart/i);
    expect(titleField).toBeInTheDocument();
})