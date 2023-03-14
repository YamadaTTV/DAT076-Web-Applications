import axios, {AxiosStatic} from "axios";
import {act, fireEvent, render} from "@testing-library/react";
import {IndexPage} from "../../pages/IndexPage";
import {Pages} from "../../App";
import React from "react";
import {Header} from "../Header";
import {Simulate} from "react-dom/test-utils";
import abort = Simulate.abort;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>

beforeEach( async() => {
    mockedAxios.get.mockResolvedValue({
        data: [],
        status: "215",
        statusText: "OK"
    });
})

test("Logged out features", async () => {
    mockedAxios.get.mockResolvedValue({
        data: [],
        status: "282",
        statusText: "OK"
    });

    let component;
    let currentPage : Pages = Pages.INDEX
    const handlePages = (page: Pages) => {currentPage = page }
    await act(() => {
        // fire events that update state
        component = render(<Header handlePages={handlePages} page={currentPage}/>)
    });

    //@ts-ignore
    const home = await component.findByText(/Home/i)
    //@ts-ignore
    const aboutUs = await component.findByText(/About us/i)
    //@ts-ignore
    const browse = await component.findByText(/Browse/i)
    //@ts-ignore
    const login = await component.findByText(/Login/i)

    expect(home).toBeInTheDocument()
    expect(aboutUs).toBeInTheDocument()
    expect(browse).toBeInTheDocument()
    expect(login).toBeInTheDocument()
})

test("Logged in features", async () => {
    let component;
    let currentPage : Pages = Pages.INDEX
    const handlePages = (page: Pages) => {currentPage = page }
    await act(() => {
        // fire events that update state
        component = render(<Header handlePages={handlePages} page={currentPage}/>)
    });

    //@ts-ignore
    const home = await component.findByText(/Home/i)
    //@ts-ignore
    const aboutUs = await component.findByText(/About us/i)
    //@ts-ignore
    const browse = await component.findByText(/Browse/i)
    //@ts-ignore
    const sell = await component.findByText(/Sell/i)
    //@ts-ignore
    const profile = await component.findByText(/Profile/i)
    //@ts-ignore
    const logout = await component.findByText(/Log out/i)

    expect(home).toBeInTheDocument()
    expect(aboutUs).toBeInTheDocument()
    expect(browse).toBeInTheDocument()
    expect(sell).toBeInTheDocument()
    expect(profile).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
})

test("Navigation", async () => {
    let component;
    let currentPage : Pages = Pages.INDEX
    const handlePages = (page: Pages) => {currentPage = page }
    await act(() => {
        // fire events that update state
        component = render(<Header handlePages={handlePages} page={currentPage}/>)
    });

    //@ts-ignore
    const home = await component.findByText(/Home/i)
    await act(async () => {
        // fire events that update state
        fireEvent.click(home);
    });
    expect(currentPage).toEqual(Pages.PRODUCT)

    //@ts-ignore
    const aboutUs = await component.findByText(/About us/i)
    await act(async () => {
        // fire events that update state
        fireEvent.click(aboutUs);
    });
    expect(currentPage).toEqual(Pages.ABOUT)

    //@ts-ignore
    const browse = await component.findByText(/Browse/i)
    await act(async () => {
        // fire events that update state
        fireEvent.click(browse);
    });
    expect(currentPage).toEqual(Pages.PRODUCT)

    //@ts-ignore
    const sell = await component.findByText(/Sell/i)
    await act(async () => {
        // fire events that update state
        fireEvent.click(sell);
    });
    expect(currentPage).toEqual(Pages.SELL)

    //@ts-ignore
    const profile = await component.findByText(/Profile/i)
    await act(async () => {
        // fire events that update state
        fireEvent.click(profile);
    });
    expect(currentPage).toEqual(Pages.PROFILE)

})