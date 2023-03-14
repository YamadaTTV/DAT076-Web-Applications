import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import axios, {AxiosStatic} from "axios";
import App, {Pages} from "../../App";
import {RegisterPage} from "../../pages/RegisterPage";
import {IndexPage} from "../../pages/IndexPage";


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

test('Check if there is a register form', async () => {
    let component;

    await act(() => {
        // fire events that update state
        component = render(<RegisterPage page={Pages.REGISTER} handlePages={() => {}}></RegisterPage>)
    });


    // @ts-ignore
    const titleField = await component.findByText(/Register!/i);
    // @ts-ignore
    const usernameField = await component.findByPlaceholderText(/Username/i);
    // @ts-ignore
    const emailField = await component.findByPlaceholderText(/Email/i);
    // @ts-ignore
    const passwordField = await component.findByPlaceholderText(/Password/i);
    // @ts-ignore
    const submitBtn = await component.findByTestId("registerButton")

    expect(titleField && usernameField && emailField && passwordField && submitBtn).toBeInTheDocument();
});

test('Test when registering that it sends a proper axios call. And if success it goes back to login form', async () => {
    let component = render(<App/>);
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

test('Test when registering that it sends an axios call. But it fails and stays on register form', async () => {

    mockedAxios.post.mockResolvedValue({
        data: [{
            key: 1,
            productName:"soffa",
            productDescription:"En fin soffa av hög kvalitet. Köpt på IKEA. Lite sliten men inte nersutten.",
            productCategory:"möbel",
            price:123,
            seller:1
        }],
        status: "210",
        statusText: "User already exists"

    });

    let component = render(<App/>);
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
    const indexPage = await component.findByTestId("registerPage");
    expect(indexPage).toBeInTheDocument();

    // @ts-ignore
    const errorField = await component.findByText("Username or email already exists");
    expect(errorField).toBeInTheDocument();
});

test('Test for "Please enter an username" shows up when not entering an username', async () => {

    let component = render(<App/>);
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
    await fireEvent.change(usernameField, {target: {value: ""}});
    await fireEvent.change(emailField, {target: {value: "asd@email.com"}});
    await fireEvent.change(passwordField, {target: {value: "asd"}});
    usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    emailValue = (document.getElementById(emailField.id) as HTMLInputElement).value
    passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("");
    expect(emailValue).toMatch("asd@email.com");
    expect(passwordValue).toMatch("asd");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).not.toHaveBeenCalledWith("http://localhost:8080/user", { username: usernameValue, password: passwordValue, email: emailValue });

    // @ts-ignore
    const indexPage = await component.findByTestId("registerPage");
    expect(indexPage).toBeInTheDocument();

    // @ts-ignore
    const errorField = await component.findByText("Please enter an username");
    expect(errorField).toBeInTheDocument();
});

test('Test for "Please enter a password" shows up when not entering a password', async () => {

    let component = render(<App/>);
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
    await fireEvent.change(passwordField, {target: {value: ""}});
    usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    emailValue = (document.getElementById(emailField.id) as HTMLInputElement).value
    passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("asd");
    expect(emailValue).toMatch("asd@email.com");
    expect(passwordValue).toMatch("");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).not.toHaveBeenCalledWith("http://localhost:8080/user", { username: usernameValue, password: passwordValue, email: emailValue });

    // @ts-ignore
    const indexPage = await component.findByTestId("registerPage");
    expect(indexPage).toBeInTheDocument();

    // @ts-ignore
    const errorField = await component.findByText("Please enter a password");
    expect(errorField).toBeInTheDocument();
});

test('Test for "Invalid email format" shows up when entering a invalid email', async () => {

    let component = render(<App/>);
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
    await fireEvent.change(emailField, {target: {value: "asd@email"}});
    await fireEvent.change(passwordField, {target: {value: "asd"}});
    usernameValue = (document.getElementById(usernameField.id) as HTMLInputElement).value
    emailValue = (document.getElementById(emailField.id) as HTMLInputElement).value
    passwordValue = (document.getElementById(passwordField.id) as HTMLInputElement).value
    expect(usernameValue).toMatch("asd");
    expect(emailValue).toMatch("asd@email");
    expect(passwordValue).toMatch("");

    await act(async () => {
        // fire events that update state
        fireEvent.click(submitBtn);
    });

    expect(mockedAxios.post).not.toHaveBeenCalledWith("http://localhost:8080/user", { username: usernameValue, password: passwordValue, email: emailValue });

    // @ts-ignore
    const indexPage = await component.findByTestId("registerPage");
    expect(indexPage).toBeInTheDocument();

    // @ts-ignore
    const errorField = await component.findByText("Invalid email format");
    expect(errorField).toBeInTheDocument();
});

