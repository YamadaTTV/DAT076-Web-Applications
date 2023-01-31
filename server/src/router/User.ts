import express, {query, Request, Response} from "express";
import {makeUserService} from "../service/User";
import {User} from "../model/User";

export const userService = makeUserService();
export const userRouter = express.Router();

userRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<User> | String>
) => {
    try {
        const tasks = await userService.getUsers();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req: Request<{}, {},{username: string, email: string, password: string}>,
    res: Response<User | string>
) => {
    try {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        if (typeof(username) !== "string" || typeof(email) !== "string" || typeof(password) !== "string" ) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} ---username has type ${typeof(username)}, email has type ${typeof(email)} and password has type ${typeof(password)}`);
            return;
        }
        const newUser = await userService.addUser(username,email,password);
        res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});