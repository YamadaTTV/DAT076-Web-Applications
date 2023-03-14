import axios from "axios";
import {act, render} from "@testing-library/react";
import {ProfilePage} from "../pages/ProfilePage";
import {Pages} from "../App";
import {IndexPage} from "../pages/IndexPage";
import React from "react";


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosUser = axios as jest.MockedFunction<typeof axios>;

    beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
        data: [],
        status: 200,
        statusText: "OK",
    });
})

test("Profile-page basics test", async () => {
    let component;
    await act(() => {
        // fire events that update state
        component = render(<ProfilePage page={Pages.PROFILE} handlePages={() => {}}></ProfilePage>)
    });

    // @ts-ignore
    const ProfileHeaderText = component.getAllByText(/Profile/)
    // @ts-ignore
    const SellerListingsText = component.getByText(/Your listings:/)
    // @ts-ignore
    const BoughtItemText = component.getByText(/Bought items:/)
    // @ts-ignore
    const EmailText = component.getByText(/Email:/)
    // @ts-ignore
    const UsernameText = component.getByText(/Username:/)

    expect(ProfileHeaderText).toBeTruthy()
    expect(SellerListingsText).toBeInTheDocument()
    expect(BoughtItemText).toBeInTheDocument()
    expect(EmailText).toBeInTheDocument()
    expect(UsernameText).toBeInTheDocument()
});

test("See that seller listing and bought items is displayed", async () => {
    mockedAxios.get.mockResolvedValue({
        data: [{"key":1,"productName":"Soffa","productDescription":"Finare soffa","productCategory":"Furniture","price":100,"sellerId":1,"buyerId":2}],
        status: 200,
        statusText: "OK",
    });

    let component;
    await act(() => {
        // fire events that update state
        component = render(<ProfilePage page={Pages.PROFILE} handlePages={() => {}}></ProfilePage>)
    });

    // @ts-ignore
    const cardSellerListing = await component.findByTestId("SellerListingCard")
    // @ts-ignore
    const cardBoughtProduct = await component.findByTestId("BoughtProductCard")
    //@ts-ignore
    const prodDesc = await component.findAllByText("Finare soffa")

    expect(prodDesc).toBeTruthy()
    expect(cardSellerListing).toBeInTheDocument()
    expect(cardBoughtProduct).toBeInTheDocument()

})

test("See that username and email is displayed", async () => {
    mockedAxios.get.mockResolvedValue({
        data: {
            id: 2,
            username: "rassta",
            email: "email@chalmers.se",
            password: "2"
        },
        status: 215,
        statusText: "OK",

    });

    let component;
    await act(() => {
        //@ts-ignore
        component = render(<ProfilePage page={Pages.PROFILE} handlePages={() => {}}></ProfilePage>)
    });




    await expect(mockedAxiosUser.get).toHaveBeenCalledWith("http://localhost:8080/user/loggedInUser")



    // @ts-ignore
    const username = await component.findByText(/rassta/i)
    // @ts-ignore
    const email = await component.findByText(/email@chalmers.se/i)

    await expect(username).toBeInTheDocument()
    expect(email).toBeInTheDocument()



})