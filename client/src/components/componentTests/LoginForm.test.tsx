import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import axios, {AxiosStatic} from "axios";
import {IndexPage} from "../../pages/IndexPage";
import App, {Pages} from "../../App";
import {RegisterPage} from "../../pages/RegisterPage";


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
        status: "202",
        statusText: "Accepted"

    });

    let response = await axios.post("http://localhost:8080/user",{ username:"asd",password:"asd", email:"asd"})
    //let response2= await axios.post("http://localhost:8080/user",{ username:"mphu",password:"mphu", email:"mphu"})

    //console.log(response);
    expect(response.status).toMatch("202");
})

test('Check if there is a login form', async () => {
    let component;

    await act(() => {
        // fire events that update state
        component = render(<IndexPage page={Pages.INDEX} handlePages={() => {}}></IndexPage>)
    });


    // @ts-ignore
    const titleField = await component.findByText(/Welcome to Marketplace!/i);
    // @ts-ignore
    const usernameField = await component.findByPlaceholderText(/Username/i);
    // @ts-ignore
    const passwordField = await component.findByPlaceholderText(/Password/i);
    // @ts-ignore
    const submitBtn = await component.findByTestId("loginButton")// @ts-ignore

    expect(titleField && usernameField && passwordField && submitBtn).toBeInTheDocument();
});

test('Test if login function works', async () => {
    let component = render(<App/>)
    const usernameField = component.getByPlaceholderText("Username");
    const passwordField = component.getByPlaceholderText("Password");
    const indexPage = component.getByTestId("indexPage");

    expect(indexPage).toBeInTheDocument();
    let usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    let passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("");
    const submitBtn = component.getByTestId("loginButton");
    await fireEvent.change(usernameField, {target: {value: "asd"}});
    await fireEvent.change(passwordField, {target: {value: "asd"}});
    usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("asd");
    expect(passwordValue).toMatch("asd");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    const productPage = await component.findByTestId("productPage");
    expect(productPage).toBeInTheDocument();
});

test('Test for "Wrong username or password" shows up when entering wrong credentials', async () => {
    mockedAxios.post.mockResolvedValue({
        data: [{
            key: 1,
        }],
        status: "203",
        statusText: "Accepted"

    });

    let component;

    await act(() => {
        // fire events that update state
        component = render(<IndexPage page={Pages.INDEX} handlePages={() => {}}></IndexPage>)
    });

    // @ts-ignore
    const usernameField = component.getByPlaceholderText("Username");
    // @ts-ignore
    const passwordField = component.getByPlaceholderText("Password");
    // @ts-ignore
    const indexPage2 = component.getByTestId("indexPage");

    expect(indexPage2).toBeInTheDocument();
    let usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    let passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("");
    expect(passwordValue).toMatch("");


    // @ts-ignore
    const submitBtn = component.getByTestId("loginButton");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/user/login",{username:usernameValue, password:passwordValue});

    // @ts-ignore
    const indexPage = await component.findByTestId("indexPage");
    expect(indexPage).toBeInTheDocument();

    // @ts-ignore
    const errorField = await component.findByText("Wrong username or password");
    expect(errorField).toBeInTheDocument();
});