import React, {useState} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import axios, {AxiosResponse, AxiosStatic} from "axios";
import {IndexPage} from "../pages/IndexPage";
import App from "../App";

/** Create the mocked version of Axios */
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>


beforeEach( async() => {
    mockedAxios.post.mockResolvedValue({
        status: "202",
        data: [
            {test}
        ]
    });

    let response = await axios.post("http://localhost:8080/user",{ username:"asd",password:"asd", email:"asd"})
    //let response2= await axios.post("http://localhost:8080/user",{ username:"mphu",password:"mphu", email:"mphu"})

    expect(response.status).toMatch("202");
})

test('Check if there is a login form', async () => {


    const component = render(<IndexPage handleLoginClick={() => {}}
                                        handleSellClick={() => {}}
                                        handleRegisterClick={() => {}}
                                        formOpen={false}
                                        loggedIn={false}></IndexPage>)
    const titleField = await component.findByText(/Welcome to Marketplace!/i);
    const usernameField = await component.findByPlaceholderText(/Username/i);
    const passwordField = await component.findByPlaceholderText(/Password/i);
    const submitBtn = await component.findByText(/Login/i)


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

    fireEvent.click(submitBtn);



    console.log("TEST");
    const productPage = component.getByTestId("productPage");
    expect(productPage).toBeInTheDocument();
    const titleField = await component.findByText(/Welcome to Marketplace!/i);
    const usernameField2 = component.getByPlaceholderText("Username");
    const passwordField2 = component.getByPlaceholderText("Password");
    console.log(component);
    expect(usernameField2 && passwordField2 && titleField).toBeInTheDocument();
});

