import {Request} from "express";
import {User} from "./model/User";
import {Product} from "./model/Product";

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

export type productUpdateRequest = Request & {
    body: {
        key: number,
        productName?: string,
        productDescription?: string,
        productCategory?: string,
        price?: number
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

export type addToCartRequest = Request & {
    body: {
        product: Product
    }
    session: {
        user ?: User
    }
}

export type emptyCartRequest = get

export type removeFromCartRequest = addToCartRequest