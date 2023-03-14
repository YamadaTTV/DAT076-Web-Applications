import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import axios, {AxiosStatic} from "axios";
import App, {Pages} from "../../App";
import {SellPage} from "../../pages/SellPage";
import {SellForm} from "../SellForm";


/** Create the mocked version of Axios */
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>


beforeEach( async() => {
    mockedAxios.get.mockResolvedValue({
        data: [{
            key: 1,
            productName:"soffa",
            productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",
            productCategory:"möbel",
            price:123,
            seller:1
        }],
        status: "200",
        statusText: "OK"

    });

    mockedAxios.post.mockResolvedValue({
        data: [{
            key: 1,
            productName:"soffa",
            productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",
            productCategory:"möbel",
            price:123,
            seller:1
        }],
        status: "201",
        statusText: "Registered"

    });
})

test('Check if there is a sell form', async () => {
    let component;

    await act(() => {
        // fire events that update state
        component = render(<SellForm page={Pages.SELL} handlePages={() => {}}></SellForm>)
    });


    // @ts-ignore
    const headerField = await component.findByText(/Sell item/i);
    // @ts-ignore
    const titleField = await component.findByPlaceholderText(/Title/i);
    // @ts-ignore
    const descriptionField = await component.findByPlaceholderText(/Description/i);
    // @ts-ignore
    const categoryField = await component.findByText(/Category/i);
    // @ts-ignore
    const priceField = await component.findByPlaceholderText(/Price/i);
    // @ts-ignore
    const submitBtn = await component.findByTestId("sellFormButton")

    expect(headerField && titleField && priceField && categoryField && descriptionField && submitBtn).toBeInTheDocument();
});

/* not working
test('Test when selling an item that it sends a proper axios call. And if success it goes back to login form', async () => {
    let component = render(<SellPage handlePages={() => {}} page={Pages.SELL}/>);
    // @ts-ignore
    const registerBtn = component.getByTestId("registerIndexButton");

    await act(async () => {
        // fire events that update state
        fireEvent.click(registerBtn);
    });

    // @ts-ignore
    const usernameField = await component.findByPlaceholderText("Username");
    // @ts-ignore
    const emailField = await component.findByPlaceholderText("Email");
    // @ts-ignore
    const passwordField = await component.findByPlaceholderText("Password");
    // @ts-ignore
    const registerPage = await component.findByTestId("registerPage");
    // @ts-ignore

    expect(registerPage).toBeInTheDocument();
    let usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    let emailValue = (document.getElementById(emailField.id) as HTMLInputElement).value
    let passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("");
    expect(emailValue).toMatch("");
    expect(passwordValue).toMatch("");


    // @ts-ignore
    const submitBtn = component.getByTestId("registerButton");
    await fireEvent.change(usernameField, {target: {value: "asd"}});
    await fireEvent.change(emailField, {target: {value: "asd@email.com"}});
    await fireEvent.change(passwordField, {target: {value: "asd"}});
    usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    emailValue = (document.getElementById(emailField.id) as HTMLInputElement).value
    passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("asd");
    expect(emailValue).toMatch("asd@email.com");
    expect(passwordValue).toMatch("asd");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/user", { username: usernameValue, password: passwordValue, email: emailValue });

    // @ts-ignore
    const indexPage = await component.findByTestId("indexPage");
    expect(indexPage).toBeInTheDocument();

});

*/
