import {Request} from "express";
import {User} from "./model/User";

export type userLoginRequest = Request & {
    body: {
        username : string,
        password : string
    }
    session: {
        user ?: User
    }
}

export type userDeleteRequest = userLoginRequest

export type userRegisterRequest = Request & {
    body: {
        username : string,
        email: string,
        password : string
    }
    session: {
        user?: User
    }
}

export type productCreationRequest = Request & {
    body: {
        productName: string,
        productDescription: string,
        productCategory: string,
        price: number
    }
    session: {
        user ?: User
    }
}

export type get = Request & {
    session: {
        user ?: User
    }
}

export type defaultRequest = get